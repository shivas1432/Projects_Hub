"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navbarLinks } from "@/constants"
import { cn } from "@/lib/utils"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"


const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src="/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1">
          <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-4">
            <h1 className="text-20 mt-8 font-extrabold text-white-1 ml-2">ZERO | PORTFOLIO</h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 text-white-1">
                {navbarLinks.map(({ route, label }) => {
                  const isActive = pathname === route || pathname.startsWith(`/${route}`);

                  return <SheetClose asChild key={route}><Link href={route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start text-white-3", {
                    'text-white-1':isActive
                  })}>
                    <p className="text-18 font-bold">{label}</p>
                  </Link></SheetClose>
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav