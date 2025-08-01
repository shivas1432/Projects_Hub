import Image from 'next/image';
import React from 'react'

const ContactBox = ({ image, name, info1, info2 }: { image: string; name: string; info1: string; info2?: string; }) => {
    return (
        <div className='w-full flex gap-4 items-center'>
            <div>
                <Image src={image} alt='mail' width={80} height={30} className='bg-black-2 p-6 rounded-xl' />
            </div>
            <div className='flex flex-col'>
                <h1 className='text-white-3 tracking-wider font-bold mb-2'>{name}</h1>
                <p className='font-normal'>{info1}</p>
                <p className='font-normal'>{info2}</p>
            </div>
        </div>
    )
}

export default ContactBox