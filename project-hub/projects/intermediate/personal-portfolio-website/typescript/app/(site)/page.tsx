"use client"


import Box from '@/components/Box'
import BoxWithImage from '@/components/BoxWithImage'
import HomeCard from '@/components/HomeCard'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'


const Home = () => {
  const router = useRouter();

  return (
    <div className="mt-4">
      <div className='flex flex-col mx-32 py-6 gap-4 max-md:mx-2'>
        <div className='flex gap-4 max-md:flex-col'>
          <BoxWithImage className='w-[50%] h-full' image='/profile2.jpg' />
          <div className='w-[50%] h-fit flex flex-col gap-4 max-md:w-full' >
            <motion.div className='p-4 w-[100%] bg-gradient-to-r from-black-2/80 to-black-2/40 rounded-2xl' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
              <p className='text-white-2 tracking-widest'><b className='text-white-1 text-16 tracking-wider'>Freelance Work</b>&nbsp;: Available as a freelancer</p>
            </motion.div>
            <div className='flex gap-4'>
              <Box className='w-[50%]' image='/signature.svg' subtitle='MORE ABOUT ME.' title='Credentials.' route='/credentials' />
              <Box className='w-[50%]' image='/project.svg' title='Works.' subtitle='SHOWCASE' route='/work' />
            </div>
          </div>
        </div>

        <div className='flex gap-4'>
          <Box className='md:w-[25%] max-md:w-[50%] md:h-[90%]' image='/cv.png' title='Download.' subtitle='MY CV' route='/pdf/Ashish Jadhav Resume.pdf' />
          <motion.div className='p-4 w-[50%] bg-gradient-to-r from-black-2/80 to-black-2/40 rounded-2xl relative max-md:hidden' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            <div className='flex gap-5 justify-evenly mt-12'>
              <Link href='/' className='hover:scale-150 transition cursor-crosshair'>
                <Image src='/webdev.png' alt='webdev' width={40} height={40} />
              </Link>
              <Link href='/' className='hover:scale-150 transition cursor-crosshair'>
                <Image src='/python.png' alt='webdev' width={40} height={40} />
              </Link>
              <Link href='/' className='hover:scale-150 transition cursor-crosshair'>
                <Image src='/server.png' alt='webdev' width={40} height={40} />
              </Link>
              <Link href='/' className='hover:scale-150 transition cursor-crosshair'>
                <Image src='/webhook.png' alt='webdev' width={40} height={40} />
              </Link>
            </div>
            <div className='pl-2 absolute bottom-4'>
              <p className='font-bold text-white-3'>SPECIALIZATION</p>
              <h1 className='text-white-1 font-extrabold text-20'>Services Offering.</h1>
            </div>
            <Button className='absolute right-0 bottom-5'>
              <Image src='/arrowR.png' alt='arrow' width={50} height={50} className='transition hover:scale-150' onClick={() => router.push('/services')} />
            </Button>
          </motion.div>

          <motion.div className='flex flex-col max-md:justify-center p-4 md:w-[25%] max-md:w-[50%] relative bg-gradient-to-r from-black-2/80 to-black-2/40 rounded-2xl' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            <div className='flex justify-evenly bg-gradient-to-l max-md:mb-14 from-[#000000] rounded-3xl md:p-5 gap-8' >
              <Link href='https://www.instagram.com/ashishhh2210?igsh=MWR1NHBxZmZ1MGY5OQ==' className='cursor-pointer' target={'_blank'}>
                <Image src='/instagram.svg' alt='insta' width={66} height={66} className='aspect-square bg-black-1 border hover:bg-gray-1/50 transition md:p-4 rounded-2xl' />
              </Link>
              <Link href='https://www.linkedin.com/in/ashish-jadhav-zero' className='cursor-pointer' target={'_blank'}>
                <Image src='/linkedin.svg' alt='insta' width={66} height={66} className='aspect-square rounded-full bg-black-2 border hover:bg-gray-1/70 transition' />
              </Link>

            </div>
            <div className='pl-2 absolute bottom-4 max-md:pl-0' >
              <p className='font-bold text-white-3 max-md:text-12'>STAY WITH ME</p>
              <h1 className='text-white-1 font-extrabold text-20 max-md:text-14'>Socials.</h1>
            </div>
            <Button className='absolute right-0 bottom-5 max-md:bottom-[10%]' onClick={() => router.push(`/socials`)}>
              <Image src='/arrowR.png' alt='arrow' width={50} height={50} className='transition hover:scale-150' />
            </Button>
          </motion.div>
        </div>

        <div className='flex gap-4 max-md:flex-col'>
          <motion.div className='p-4 w-[50%] max-md:w-full flex gap-4 bg-gradient-to-r from-black-2/80 to-black-2/40 rounded-2xl relative' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            <HomeCard title='02' subtitle1='PERSONAL WORK' subtitle2='EXPERIENCE' />
            <HomeCard title='+2' subtitle1='HAPPY' subtitle2='CLIENTS' />
            <HomeCard title='08' subtitle1='TOTAL' subtitle2='PROJECTS' />
          </motion.div>
          <motion.div className='p-4 w-[50%] max-md:w-full bg-gradient-to-r from-black-2/80 to-black-2/40 rounded-2xl relative' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            {/* <Image src='/lamp.png' alt='lamp' width={100} height={100} className='absolute top-0'/> */}
            <h1 className='text-[42px] pl-2 py-7 max-md:py-2 font-extrabold'>Let's <br />Work <span className='text-blue-600'>together.</span></h1>
            <Button className='absolute right-0 bottom-5' onClick={() => router.push(`/contact`)}>
              <Image src='/arrowR.png' alt='arrow' width={50} height={50} className='transition hover:scale-150' />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Home