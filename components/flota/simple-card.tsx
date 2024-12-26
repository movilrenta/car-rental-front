import { CarResponse } from '@/types/car.interface'
import Image from 'next/image'
import React from 'react'
import { BsLuggageFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { GiCarDoor, GiGasPump } from 'react-icons/gi'
import { TbManualGearbox } from 'react-icons/tb'

interface Props {
  car:CarResponse
}
export const SimpleCard = ({car}:Props) => {
  return (
    <div className='max-w-[350px] h-[360px] rounded-md shadow-md dark:shadow-slate-500 overflow-hidden hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer'>
      <div className='w-full h-[180px]'>
        <Image
        src={car.image}
        alt={car.name}
        width={350}
        height={350}
        className='h-auto object-contain'
        />
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <h3 className='text-xl text-gray-800 dark:text-white font-semibold'>{car.name}</h3>
        <p className='text-sm font-medium text-gray-600 dark:text-white'>Grupo <span className='font-semibold'>{car.group.name}</span></p>
        <div className='grid grid-cols-2 gap-2 text-gray-600 dark:text-white'>
          <span className='flex items-center gap-x-2 text-sm'><GiGasPump className="w-4 h-4 min-h-4 min-w-4"/> {car.fuel_type}</span>
          <span className='flex items-center gap-x-2 text-sm'><FaUser className="w-4 h-4 min-h-4 min-w-4"/> {car.seats} Plazas</span>
          <span className='flex items-center gap-x-2 text-sm'><TbManualGearbox className="w-4 h-4 min-h-4 min-w-4"/> {car.transmission}</span>
          <span className='flex items-center gap-x-2 text-sm'><GiCarDoor className="w-4 h-4 min-h-4 min-w-4"/> {car.doors} Puertas</span>
          <span className='flex items-center gap-x-2 text-sm'><BsLuggageFill className="w-4 h-4 min-h-4 min-w-4"/> {car.luggage} Maleta(s)</span>
        </div>
      </div>
    </div>
  )
}
