"use server"

import { Brand, CarResponse } from "@/types/car.interface"
import { FormMiReserva } from "@/types/mi-reserva.schema"
import { Branches, UserReservation } from "@/types/user-reservation.inteface"
import axios from "axios"

const URL = process.env.NEXT_PUBLIC_URL_BACK as string

export const getUserReservation = async ({code}:FormMiReserva) => {
  try {
    
    const resp = await axios.get(`${URL}branches`)
    const branches:Branches[] = resp.data

    const {data} = await axios.get(`${URL}reservations/bytransaction/${code.toUpperCase()}`)
    if(!Object.entries(data).length){
      return {
        ok:false,
        message:`No se encontró ninguna reserva con el codigo ${code}`,
        data: null
      }
    }
    
    const reserva:UserReservation = data
    const cars = await axios.get(`${URL}cars/${reserva.car_id}`)
    
    
    const carData:CarResponse = cars.data
    const brand = await axios.get(`${URL}brands/${carData.brand_id}`)

    const brandData:Brand = brand.data
    const start_branch = branches.find((item) => item.id === reserva.start_branch_id)?.name
    const end_branch = branches.find((item) => item.id === reserva.end_branch_id)?.name

    console.log(start_branch, end_branch, "ramas")

    return {
      ok:true,
      message:"Petición exitosa",
      data: {
        car: carData.name,
        image: carData.image,
        fuel_type: carData.fuel_type,
        brand_name: brandData.name,
        start_branch: start_branch ?? "",
        end_branch: end_branch ?? "",
        start_date: reserva.start_date,
        end_date: reserva.end_date,
        status: reserva.status,
        code: reserva.code
      }
    }
  } catch (error) {
    console.log(error)
    return {
      ok:false,
      message: "Internal server error - 500",
      data:null
    }
  }
}