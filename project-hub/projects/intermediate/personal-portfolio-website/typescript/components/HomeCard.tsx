import React from 'react'

const HomeCard = ({ title, subtitle1, subtitle2 }: { title: string; subtitle1: string; subtitle2: string }) => {
    return (
        <div className='relative bg-gradient-to-r from-black-1/90 to-black-2/40 rounded-2xl text-center px-4 w-[33%] pt-4'>
            <h1 className='text-[38px] font-extrabold'>{title}</h1>
            <div className='pt-8 max-md:mb-2'>
                <p className='text-white-2 font-mono max-md:text-12'>{subtitle1}</p>
                <p className='text-white-2 font-mono max-md:text-12'>{subtitle2}</p>
            </div>
        </div>
    )
}

export default HomeCard