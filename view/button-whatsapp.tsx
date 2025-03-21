import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function ButtonWhatsapp() {
  return (
    <Link href={`https://api.whatsapp.com/send?phone=5493815873049`} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 flex items-center justify-center w-14 h-14 rounded-full bg-green-600">
      <FaWhatsapp className="text-3xl text-white" />
    </Link>
  )
}