import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function ButtonWhatsapp() {
  return (
    <Link href={`https://api.whatsapp.com/send?phone=5493815873049`} target="_blank" rel="noopener noreferrer" className="group fixed bottom-5 right-5 flex items-center justify-center w-14 h-14 rounded-full bg-green-600 z-20">
      <FaWhatsapp className="text-4xl text-white group-hover:animate-ring" />
      <span className="sr-only">Whatsapp de la empresa</span>
      <span className="absolute inset-0 rounded-full bg-green-600 animate-growth-button -z-10 pointer-events-none"></span>
    </Link>
  )
}