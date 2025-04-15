import HomeItinerario from "./home-itinerario";
import { getCarouselAction } from "@/actions/get-carousel";
import { SlideImages } from "./slide-images";
import { Carousel_Type } from "@/types/carousel.schema";

export const BannerCta = async ({ branches, locale }: { branches: any, locale: string }) => {
  const {data: Images_Carousel} = await getCarouselAction();
  const filtered = Images_Carousel?.filter((item) => item.location === "home" && item?.name?.startsWith(locale));

  if (!filtered) return <div className="h-full col-span-12 lg:col-span-7">No hay imágenes</div>

  const sorted: Carousel_Type[] = filtered?.sort((a: Carousel_Type, b: Carousel_Type) => {
    return a.images[0].order - b.images[0].order;
  });

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
