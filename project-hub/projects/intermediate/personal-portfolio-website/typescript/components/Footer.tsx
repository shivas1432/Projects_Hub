import { navbarLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-10 pt-10'>
        <h1 className='text-24 text-white-1 font-extrabold text-center'>ZERO | PORTFOLIO</h1>
        <div className='flex justify-center gap-8 my-8  max-md:gap-4'>
            {navbarLinks.map(({route,label})=>{
                return <Link href={route} key={route} className='text-white-3'>
                    <p>{label}</p>
                </Link>
            })}
        </div>
        <p className='text-white-3 flex justify-center tracking-wide mb-4'>&copy; All rights reserved by <span className='text-blue-600 tracking-wider font-bold'>&nbsp;ZERO</span></p>
    </div>
  )
}

export default Footer