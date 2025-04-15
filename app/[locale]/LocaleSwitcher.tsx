'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select';

export default function LanguageSwitcher({mobile = false} : {mobile?: boolean}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (newLocale: string) => {
    const newPath = `/${newLocale}${pathname.slice(3)}`;
    router.push(newPath);
  };

  return (
      <Select value={locale} onValueChange={handleChange}>
        <SelectTrigger className={`p-0 w-[60px] h-8 text-sm border-none ${mobile ? "dark:!bg-transparent" : "dark:!bg-red-800" } shadow-none`}>
          <SelectValue className='p-0'/>
        </SelectTrigger>
        <SelectContent className='flex flex-row gap-1 border-none shadow-none !m-0 !p-0 w-[60px]'>
          <SelectItem value="es" className='flex border-none flex-nowrap gap-1 bg-white dark:bg-neutral-700 hover:bg-red-600 hover:text-white'>
            <span className='flex flex-nowrap gap-1 items-center justify-center'><Globe className="h-4 w-4 text-muted-foreground" />ES</span>
          </SelectItem>
          <SelectItem value="en" className='flex border-none flex-nowrap gap-1 bg-white dark:bg-neutral-700 hover:bg-red-600 hover:text-white'>
            <span className='flex flex-nowrap gap-1 items-center justify-center'><Globe className="h-4 w-4 text-muted-foreground" />EN</span>
          </SelectItem>
        </SelectContent>
      </Select>
  );
}
