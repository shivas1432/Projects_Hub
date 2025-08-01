"use client"

import Image from 'next/image'
import {motion} from 'framer-motion'
import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const Box = ({ className, image, title, subtitle, route }: { className?: string; image?: string; title:string; subtitle:string; route?:string }) => {

    const router = useRouter();
    const handleClick = () => {
        router.push(`${route}`)
    }

    return (
        <motion.div className={cn('flex-col bg-gradient-to-r from-black-2/80 to-black-2/40 md:p-4 flex rounded-3xl md:relative max-md:pt-4 max-md:pl-4', className)} initial={{scale:0}} animate={{scale:1}} transition={{duration:0.6}}>
            {image && (
                <div className='flex justify-center items-center'>
                    <Image src={image!} alt='hero' width={150} height={50} className='rounded-3xl' />
                </div>
            )}
            <div className='flex-col md:pl-2'>
                <p className='font-bold text-white-3 max-md:text-12'>{subtitle}</p>
                <h1 className='text-white-1 font-extrabold text-20 max-md:text-14'>{title}</h1>
            </div>
            <Button className='md:absolute max-md:relative right-0 bottom-5' onClick={handleClick}>
                <Image src='/arrowR.png' alt='arrow' width={50} height={50} className='max-md:absolute transition hover:scale-150 max-md:right-0 max-md:bottom-0' />
            </Button>
        </motion.div>
    )
}

export default Box