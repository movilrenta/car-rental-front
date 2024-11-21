import Image from "next/image";

export default function BannerPage({title, image} : {title: string, image: string}) {
    return (
      <div className="relative grid grid-cols-2 w-screen h-[150px] max-h-[150px] bg-zinc-700 overflow-clip z-0 max-w-full">
      <div className="text-4xl col-span-2 sm:col-span-1 text-white text-center w-full flex items-center justify-center sm:justify-start px-0 sm:px-16 font-bold bg-black/10 sm:bg-transparent h-[150px] z-10">
        {title}
      </div>
      <Image
        src={image}
        alt="bannerCars"
        fill
        sizes="auto"
        quality={100}
        className="sm:col-start-2 absolute w-auto max-w-[100%] sm:col-span-1 h-[150px] object-cover overflow-clip"
      />
    </div>
    )
}