import axios from "axios";



// const axiosInstance = axios.create({
//   baseURL: "http://maxbernasconi.com/", // Cambia a tu URL base
//   withCredentials: true, // Importante para incluir las cookies en las solicitudes
// });

// const setupCsrf = async () => {
//   await axiosInstance.get("/sanctum/csrf-cookie");
// };

export async function PostCarAction(car: any) {
  try {
    //await setupCsrf();
    const res = await axios.post(`/api/cars`, car)
    console.log(res);
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}


export async function PutCarAction(car: any) {
  try {
    //await setupCsrf();
    const res = await axios.put(`/api/cars/${car.id}`, car)
    console.log(res);
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}

export async function DeleteCarAction(id: number) {
  try {
    const res = await axios.delete(`/api/cars/${id}`)
    console.log(res);
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}
