"use client"


import Box from '@/components/Box'
import WorkBox from '@/components/WorkBox'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'

const Work = () => {

  const router = useRouter();

  return (
    <div className='mt-4'>
      <div className='flex flex-col mx-32 max-md:mx-2 py-6 gap-4'>
        <div className='flex gap-4 max-md:flex-col'>
          <div className='md:hidden mb-2 flex gap-5 p-2 items-center max-md:justify-center'>
            <Image src='/star.svg' alt='star' width={80} height={40} className='aspect-square max-md:w-[15%] max-md:h-fit' />
            <h1 className='text-[60px] font-extrabold max-md:text-24'>MY WORKS</h1>
            <Image src='/star.png' alt='star' width={80} height={40} className='aspect-square max-md:w-[15%] max-md:h-fit' />
          </div>
          <div className='flex flex-col gap-4 md:w-[35%] h-full'>
            <WorkBox image='/project1.png' name='ZERO | STORY' type='WebApp' projectId='story' />
            <WorkBox image='/project2.png' name='ZERO | PORTFOLIO' type='WebApp' projectId='portfolio' />
          </div>
          <div className='md:w-[65%] relative'>
            <motion.div className='md:ml-20 mb-2 flex gap-5 p-2 items-center max-md:justify-center max-md:hidden' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
              <Image src='/star.svg' alt='star' width={80} height={40} className='aspect-square max-md:w-[15%] max-md:h-fit' />
              <h1 className='text-[60px] font-extrabold max-md:text-24'>MY WORKS</h1>
              <Image src='/star.png' alt='star' width={80} height={40} className='aspect-square max-md:w-[15%] max-md:h-fit' />
            </motion.div>
            <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
              <WorkBox image='/project3.png' name='ZERO | INTELLIGENCE' type='WebApp / AI-ML' projectId='intelligence' />
              <WorkBox image='/project7.png' name='ZERO | DEPLOY' type='WebApp' projectId='deploy' />
              <WorkBox image='/project5.png' name='ZERO | AUTHENTICATE' type='WebApp' projectId='authenticate' />
              <WorkBox image='/project6.png' name='ZERO | CAMPUS' type='WebApp' projectId='campus' />
            </div>
          </div>
        </div>
        <div className='flex gap-4 max-md:flex-col'>
          <motion.div className='flex flex-col max-md:justify-center p-4 md:w-[25%] relative bg-gradient-to-r from-black-2/80 to-black-2/40 rounded-2xl' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            <div className='flex justify-evenly bg-gradient-to-l max-md:mb-24 from-[#000000] rounded-3xl p-5 gap-8' >
              <Link href='https://www.instagram.com/ashishhh2210?igsh=MWR1NHBxZmZ1MGY5OQ==' className='cursor-pointer' target={'_blank'}>
                <Image src='/instagram.svg' alt='insta' width={66} height={66} className='aspect-square bg-black-1 border hover:bg-gray-1/50 transition md:p-4 rounded-2xl' />
              </Link>
              <Link href='https://x.com/ashishhh2210' className='cursor-pointer' target={'_blank'}>
                <Image src='/twitter.svg' alt='insta' width={66} height={66} className='aspect-square rounded-full bg-black-2 border hover:bg-gray-1/70 transition' />
              </Link>

            </div>
            <div className='pl-2 absolute bottom-4'>
              <p className='font-bold text-white-3'>STAY WITH ME</p>
              <h1 className='text-white-1 font-extrabold text-20'>Socials.</h1>
            </div>
            <Button className='absolute right-0 bottom-5' onClick={() => router.push(`/socials`)}>
              <Image src='/arrowR.png' alt='arrow' width={50} height={50} className='transition hover:scale-150' />
            </Button>
          </motion.div>
          <motion.div className='p-4 md:w-[50%] bg-gradient-to-r from-black-2/80 to-black-2/40 rounded-2xl relative' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            {/* <Image src='/lamp.png' alt='lamp' width={100} height={100} className='absolute top-0'/> */}
            <h1 className='text-[42px] pl-2 py-7 max-md:py-2 font-extrabold'>Let's <br />Work <span className='text-blue-600'>together.</span></h1>
            <Button className='absolute right-0 bottom-5' onClick={() => router.push(`/contact`)}>
              <Image src='/arrowR.png' alt='arrow' width={50} height={50} className='transition hover:scale-150' />
            </Button>
          </motion.div>
          <Box className='md:w-[25%]' image='/signature.svg' subtitle='MORE ABOUT ME.' title='Credentials.' route='/credentials' />
        </div>
      </div>
    </div>
  )
}

export default Work