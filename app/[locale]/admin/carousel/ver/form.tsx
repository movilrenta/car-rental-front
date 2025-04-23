"use client";
import { UpdateImage, uploadImage } from "@/actions/upload-image";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImageFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function CRUD_Carousel_Form({ item }: { item?: any }) {
  const { toast } = useToast();
  //const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    item ? item.images[0].path : null
  );
  const formRef = useRef<HTMLFormElement>(null);
  //console.log(item);
  const form = useForm<z.infer<typeof ImageFormSchema>>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: {
      name: item ? item?.name : "",
      location: item ? item?.location : "",
      title: item ? item?.images[0]?.title : "",
      description: item ? item?.images[0]?.description : "",
      link: "",
      // link: item ? item?.images[0]?.link : "",
      order: item ? item?.images[0]?.order : 0,
      //image: item ? item?.images[0].path : "",
    },
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      form.setValue("image", [file]);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", [file]);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: z.infer<typeof ImageFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("location", data.location);
    formData.append("title", data.title || "");
    formData.append("description", data.description || "");
    // formData.append("link", data.link || "");
    formData.append("link", "");
    formData.append("order", data.order.toString() || "0");

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      if(!item) {
        const result = await uploadImage(formData);
        if (result.success) {
          toast({ 
            variant: "default",
            title: result.message
          });
          //setImagePreview(null); // Limpiar la imagen después de subirla
          form.reset();
          document.getElementById("close-sheet")?.click();
          return 
        } else {
          toast({ 
            variant: "default",
            title: result.message
          });
          console.log(result.message);
        }
      } else {
        formData.append("path", item.images[0].path);
        formData.append("id", item.id.toString());
        //console.log(formData);
        const result = await UpdateImage(formData);
        
        if (result.success) {
          toast({ 
            variant: "default",
            title: result.message
          });
          //setImagePreview(null); // Limpiar la imagen después de subirla
          form.reset();
          document.getElementById("close-sheet")?.click();
        } else {
          toast({ 
            variant: "default",
            title: result.message
          });
          //Toast.fire({ icon: "warning", title: result.message });
          console.log(result.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SheetContent className="w-full !max-w-3xl min-h-screen overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{item ? "Editar item" : "Agregar item"}</SheetTitle>
        <SheetDescription className="flex flex-col">
          <span>Recomendaciones:</span>
          <span>Utilizar imagenes en formato WEBP, es un formato web que mantiene calidad y disminuye el peso de la imagen, lo que favorece una mejor experiencia al usuario.</span>
          <Link href="https://squoosh.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline hover:animate-pulse">{"->"} Conversor online de imagenes a formato WEBP {"<-"}</Link>
          </SheetDescription>
        <SheetClose id="close-sheet" className="hidden border border-transparent py-1 hover:border-red-500 duration-200 px-4 rounded-md"/>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className="w-full col-span-6 grid grid-cols-6 mt-4 mb-12 pt-4 gap-x-2 gap-1"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-52 flex justify-center items-center text-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById("file-input")?.click()
                    }
                  >
                    {imagePreview ? (
                      <div className="flex flex-col items-center">
                        <Image
                          src={imagePreview}
                          alt="Vista previa"
                          width={100}
                          height={100}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <p className="mt-2 text-sm text-gray-700">
                          {field.value?.[0]?.name}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        Arrastra y suelta una imagen aquí o haz clic para
                        seleccionarla
                      </p>
                    )}
                  </div>
                  <FormControl>
                    <Input
                      id="file-input"
                      type="file"
                      className="hidden"
                      accept="image/webp, image/png, image/jpeg"
                      onChange={handleImageChange}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="!m-0"
                      placeholder="Nombre de la imagen"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Ubicación</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ""}>
                      <SelectTrigger className="!m-0 col-span-3 border-zinc-500 dark:border-zinc-600 focus:ring-blue-700">
                        <SelectValue placeholder="Elija un lugar" />
                      </SelectTrigger>
                      <SelectContent 
                      className="bg-neutral-100 dark:bg-neutral-900"
                      onCloseAutoFocus={(e) => {
                        // Previene que el foco vuelva a un elemento oculto (por ejemplo, un modal cerrado)
                        e.preventDefault();
                      }}>
                        <SelectGroup>
                          <SelectItem
                            value="none"
                            className="hover:bg-blue-700 hover:text-white"
                          >
                            No mostrar
                          </SelectItem>
                          <SelectItem
                            value="home"
                            className="hover:bg-blue-700 hover:text-white"
                          >
                            Principal
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-300 dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="!m-0"
                      placeholder="Titulo a mostrar"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="!m-0"
                      {...field}
                      placeholder="Subtitulo a mostrar"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Enlace</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="!m-0"
                      placeholder="Link a mostrar"
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Orden de aparición</FormLabel>
                  <FormControl>
                    <Input
                      
                      pattern="[0-9]*"
                      inputMode="numeric"
                      {...field}
                      className="!m-0"
                      placeholder="Orden de la imagen en Carousel"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            
            <Button
              className="my-4 col-span-6 bg-red-700 text-white hover:bg-red-800 duration-200"
              variant="default"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader className="animate-spin" />
              ) : item ? (
                "Editar imagen"
              ) : (
                "Subir imagen"
              )}
            </Button>

            <SheetClose className="col-span-6 min-w-24 border border-transparent py-1 hover:border-red-500 duration-200 px-4 rounded-md">
              Cerrar
            </SheetClose>
          </form>
        </Form>
      </SheetHeader>
      <SheetFooter className="flex items-center justify-center gap-4 mt-12">
      </SheetFooter>
    </SheetContent>
  );
}
