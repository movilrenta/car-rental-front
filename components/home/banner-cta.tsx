import HomeItinerario from "./home-itinerario";
import { SlideImages } from "./slide-images";

export const BannerCta = async ({branches} : {branches: any}) => {

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
    <div className="h-full grid grid-cols-12  dark:bg-gray-800">
       <SlideImages
        images={images}
        className="relative col-span-12 lg:col-span-7"
      />
      <HomeItinerario branches={branches}/>
    </div>
  );
};
