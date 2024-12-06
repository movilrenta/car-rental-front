import HomeItinerario from "./home-itinerario";
import { SlideImages } from "./slide-images";

export const BannerCta = () => {
  const images = ["/images2/rentacar.webp", "/images2/images-banner2.jpg"];
  return (
    <div className="h-full grid grid-cols-12 bg-white dark:bg-gray-800 shadow-sm">
       <SlideImages
        images={images}
        className="relative col-span-12 lg:col-span-7"
      />
      <HomeItinerario />
    </div>
  );
};
