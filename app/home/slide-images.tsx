"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css/free-mode";
import "swiper/css";
import "./slide-images.css";

interface Props {
  images: string[];
  description?: string;
  className?: string;
}
export const SlideImages = ({ images, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        loop={true}
        autoplay={{
          delay: 3500,
        }}
        modules={[FreeMode, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt="imagen-swip"
              width={812}
              height={500}
              className="h-auto object-cover"
            />
            <div className="absolute inset-0 text-3xl sm:text-5xl px-6 pb-6 h-full flex flex-col justify-end bg-gradient-to-tr from-black/60 to-transparent text-gray-100 dark:text-gray-100">
              <h3 className="font-extralight">Fácil, rápido y seguro</h3>
              <h4 className="capitalize font-semibold">Precios Accesibles</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
