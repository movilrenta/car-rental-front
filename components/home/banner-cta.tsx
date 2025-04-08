import { getCarouselAction } from "@/actions/get-carousel";
import HomeItinerario from "./home-itinerario";
import { SlideImages } from "./slide-images";
import { Carousel_Type } from "@/types/carousel.schema";

export const BannerCta = async ({ branches }: { branches: any }) => {
  const {data: Images_Carousel} = await getCarouselAction();
  //console.log(Images_Carousel?.filter((item) => item.location === "home")).sort(({a, b}: {a: Carousel_Type,b: Carousel_Type}) => a.images[0].order - b.images[0].order)
  const filtered = Images_Carousel?.filter((item) => item.location === "home");

  if (!filtered) {
    return <div className="h-full col-span-12 lg:col-span-7">No hay imágenes</div>;
  }
  const sorted: Carousel_Type[] = filtered?.sort((a: Carousel_Type, b: Carousel_Type) => {
  return a.images[0].order - b.images[0].order;
  });


  // const images = [
  //   {
  //     url: "/images2/rentacar.webp",
  //     h3: "Fácil, rápido y seguro",
  //     h4: "Precios Accesibles",
  //   },
  //   {
  //     url: "/images2/images-banner2.jpg",
  //     h3: "Disfrutá, conocé, compartí",
  //     h4: "Movete con libertad",
  //   },
  // ];
  return (
    <div className="h-full grid grid-cols-12 z-0 dark:bg-gray-800">
      <SlideImages
        images={sorted}
        className="relative col-span-12 lg:col-span-7"
      />
      <HomeItinerario branches={branches} />
    </div>
  );
};
