"use client"


import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import {motion} from 'framer-motion'

const WorkBox = ({ image, type, name, projectId }: { image: string; type: string; name: string; projectId: string }) => {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/project/${projectId}`)
    }

    return (
        <motion.div className='bg-black-1 w-full rounded-2xl p-4 relative pb-8' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            <Image src={image} alt='image' width={400} height={250} className='rounded-2xl mb-8' />
            <div className='mt-2 ml-2'>
                <p className='text-white-3'>{type}</p>
                <h1 className='font-bold'>{name}</h1>
            </div>
            <Button className='absolute right-1 bottom-10' onClick={handleClick}>
              <Image src='/arrowR.png' alt='arrow' width={50} height={50} className='transition hover:scale-150' />
            </Button>
        </motion.div>
    )
}

export default WorkBox