"use client"


import { navbarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
    const pathName = usePathname();
    const router = useRouter()
    return (
        <div className='navbar pt-4 px-32 mr-2'>
            <nav className='flex gap-6 justify-between'>
                <Link href='/' className='flex cursor-pointer items-center justify-center'>
                    <h1 className='text-24 font-extrabold'>ZERO | PORTFOLIO</h1>
                </Link>
                <div className='flex mx-auto gap-10'>
                    {navbarLinks.map(({ label, route }) => {

                        const isActive = pathName === route || pathName.startsWith(`${route}/`);

                        return <Link href={route} key={route} className={cn('flex gap-3 items-center py-2 max-lg:px-4 justify-center lg:justify-start ml-2 text-white-3 transition hover:text-white-5 hover:bg-black-1 p-1 rounded-lg', {
                            'text-white-1':isActive
                        })}>
                            <p className='text-18 px-2'>{label}</p>
                        </Link>
                    })}
                </div>
                <Button className='text-18 flex items-center justify-center bg-black-2 rounded-[15px] hover:bg-black-3 p-5' onClick={()=>router.push(`/contact`)}>
                    Let's talk
                </Button>
            </nav>
        </div>
    )
}

export default Navbar