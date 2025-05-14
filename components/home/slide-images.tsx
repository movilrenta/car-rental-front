"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css/free-mode";
import "swiper/css";
import "./slide-images.css";
import { Carousel_Type } from "@/types/carousel.schema";

interface Props {
  images: Carousel_Type[];
  description?: string;
  className?: string;
}
export const SlideImages = ({ images, className }: Props) => {
  return (
      <Swiper
        loop={true}
        autoplay={{
          delay: 3500,
        }}
        modules={[FreeMode, Autoplay]}
        className="mySwiper2 col-span-12 lg:col-span-7 h-full m-auto"
      >
        {images.map((image) => (
          <SwiperSlide key={image?.images[0]?.path}>
            <Image
              src={image?.images[0]?.path}
              alt={image.name}
              width={920}
              height={550}
              priority={true}
              className="h-auto w-full object-fill"
            />
            <div className="absolute inset-0 text-3xl sm:text-5xl px-6 pb-6 h-full flex flex-col justify-end bg-gradient-to-tr from-black/60 to-transparent text-gray-100 dark:text-gray-100">
              <div className="font-extralight">{image?.images[0]?.title}</div>
              <div className="font-semibold">{image?.images[0]?.description}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    
  );
};
