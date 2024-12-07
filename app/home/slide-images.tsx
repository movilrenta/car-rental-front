"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css/free-mode";
import "swiper/css";
import "./slide-images.css";

interface Props {
  images: { url: string, h3: string, h4: string}[];
  description?: string;
  className?: string;
}
export const SlideImages = ({ images, className }: Props) => {
  return (
    <div className={`${className} h-full flex items-center justify-center p-0 m-0`}>
      <Swiper
        loop={true}
        autoplay={{
          delay: 3500,
        }}
        modules={[FreeMode, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image.url}>
            <Image
              src={image.url}
              alt="imagen-swip"
              width={812}
              height={500}
              className="!h-full w-full object-cover"
            />
            <div className="absolute inset-0 text-3xl sm:text-5xl px-6 pb-6 h-full flex flex-col justify-end bg-gradient-to-tr from-black/60 to-transparent text-gray-100 dark:text-gray-100">
              <h3 className="font-extralight">{image.h3}</h3>
              <h4 className="font-semibold">{image.h4}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
