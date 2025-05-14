import { cookies } from "next/headers";
import Link from "next/link";

import { BsTools } from "react-icons/bs";

export default function AdminButton() {

  const coockieStore = cookies()
  const admin = coockieStore.get("authUser")?.name



  return (

        admin && <Link
          href={`/admin`}
          className="w-12 h-12 fixed bottom-6 left-6 p-2 dark:bg-white dark:text-black bg-black text-white rounded-full flex justify-center items-center">
          <BsTools />
        </Link>
      
    
  )
}