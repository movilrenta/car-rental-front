"use server";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};


export async function uploadImage(formData: FormData) {
  const file = formData.get("image") as File;
  if (!file) return { success: false, message: "No se ha seleccionado ninguna imagen" }
  //Subir imagen
  const imagenSubida = await UploadImageCloudinary(file)
  //Error en la subida
  if(!imagenSubida.success) return {success: false, message: "Problemas para subir la imagen"}

  const dataForDB = {
    name: formData.get("name"),
    location: formData.get("location"),
    images: [
      {
        path: imagenSubida.data?.secure_url,
        title: formData.get("title"),
        description: formData.get("description"),
        link: formData.get("link"),
        public_id: imagenSubida.data?.public_id,
        order: formData.get("order") || 1
      }
      ]
  }

  //Guardado en la base de datos
  try {
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}carousels`, dataForDB)

    //En caso de que no haya sido exitoso, se borra la imagen de cloudinary
    // if( (data?.message?.affectedRows && data?.message?.affectedRows !== 1) || (data?.message?.rowsAffected && data?.message?.rowsAffected !== 1)) {
    //   if(imagenSubida?.data?.public_id) {
    //     console.log("Destruyendo la imagen");
    //     await destroyImage(imagenSubida.data.public_id)}
    //   return { success: false, message: "Error al subir la imagen" }
    // }

    //Para el caso de exito, se devuelve todo al front
    revalidatePath('/')
    revalidatePath('/admin/carousel/ver')
    return { success: true, message: "Imagen subida correctamente", payload: data };
  }
  catch(error) {
    console.log(error);
    return {success: false, message: "Error al subir la imagen"}
  }
}

export async function UpdateImage(formData: FormData) {
  const file = formData.get("image") as File;
  const id_carousel = formData.get("id");
  if (!file) { 
    const dataForDB = {
      name: formData.get("name"),
      location: formData.get("location"),
      images: [
        {
          path: formData.get("path"),
          title: formData.get("title"),
          description: formData.get("description"),
          link: formData.get("link"),
          order: Number(formData.get("order")) || 1
        }
        ]
    }
    //logica de pegada a la DB
    try {
      const {data} = await axios.patch(`${process.env.NEXT_PUBLIC_URL_BACK}carousels/${id_carousel}`, dataForDB)
      revalidatePath('/')
      revalidatePath('/admin/carousel/ver')
      return {success: true, message: "Imagen actualizada correctamente", payload: data}
    } catch (error) {
      console.log(error);
      return {success: false, message: "Error al actualizar la imagen1"};
    }
  }

  const imagenSubida = await UploadImageCloudinary(file)
  if(!imagenSubida.success) return {success: false, message: "Problemas para subir la imagen"}
  const dataForDB = {
    name: formData.get("name"),
    location: formData.get("location"),
    images: [
      {
        path: imagenSubida.data?.secure_url,
        title: formData.get("title"),
        description: formData.get("description"),
        link: formData.get("link"),
        order: formData.get("order") || 1
      }
      ]
    }
    await destroyImage(formData.get("path") as string)
    //Logica de subida de imagen
    try {
      const {data} = await axios.patch(`${process.env.NEXT_PUBLIC_URL_BACK}carousels/${id_carousel}`, dataForDB)
      revalidatePath('/')
      revalidatePath('/admin/carousel/ver')
      return {success: true, message: "Imagen actualizada correctamente", payload: data}
    } catch (error) {
      console.log(error);
      return {success: false, message: "Error al actualizar la imagen2"};
    }
}


export async function deleteImageAction(id: number) {
  try {
    const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_URL_BACK}carousels/${id}`)
    revalidatePath('/')
    revalidatePath('/admin/carousel/ver')
    return {success: true, message: "Imagen eliminada correctamente", payload: data, status: 200}
  
  } catch (error){
    console.log(error);
    return {success: false, message: "Error al eliminar la imagen"};
  }
}


export async function destroyImage(path: string) {
  const public_id = getImagePublicId(path)
  try {
    const result = await cloudinary.uploader.destroy(public_id!);
    return { success: true, data: result, status: 200 };
  } catch (error) {
    console.error("Error al destruir la imagen:", error);
    return { success: false, error: (error as Error).message, status: 402 };
  }
}


async function UploadImageCloudinary(image: File) {
  try {
    // Convertir el archivo a un array buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: CloudinaryUploadResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) {
              reject(new Error(`Cloudinary Upload Error: ${error.message} ----`));
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          })
          .end(buffer);
      }
    );

    return { success: true, data: uploadResult };
  } catch (error) {
    console.error("Error subiendo imagen a Cloudinary:", error);
    return { success: false, error: (error as Error).message };
  }
}

function getImagePublicId(url: string) {
  const result = url?.split('/').pop()?.split('.')[0]
  return result;
}