import HomeItinerario from "./home-itinerario";
import { SlideImages } from "./slide-images";

export const BannerCta = () => {
  const images = [
    {
      url: "/images2/rentacar.webp",
      h3: "Fácil, rápido y seguro",
      h4: "Precios Accesibles"
    },{
      url: "/images2/images-banner2.jpg",
      h3: "Disfrutá, conocé, compartí",
      h4: "movete con libertad"
    }]
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
