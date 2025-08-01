"use client"

import Box from '@/components/Box'
import ServiceBox from '@/components/ServiceBox'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'



const Services = () => {
  const router = useRouter();
  return (
    <div className='mt-4 scroll-smooth'>
      <div className='mx-32 max-md:mx-2 py-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex max-md:flex-col gap-4'>
            <motion.div className='md:w-[35%] p-6 bg-black-3 rounded-2xl flex flex-col gap-8' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
              <div className='flex gap-12 items-center font-bold text-white-2 mt-16 mb-8 mx-4' >
                <Image src='/server.png' alt='server' width={30} height={30} />
                <h1>Database Architecture Design</h1>
              </div>
              <div className='flex gap-12 items-center font-bold text-white-2 my-8  mx-4'>
                <Image src='/webhook.png' alt='server' width={30} height={30} />
                <h1>Webhooks Management</h1>
              </div>
              <div className='flex gap-12 items-center font-bold text-white-2 my-8 mx-4'>
                <Image src='/cloud.png' alt='server' width={30} height={30} />
                <h1>Cloud Storage Management</h1>
              </div>
              <div className='flex gap-12 items-center font-bold text-white-2 mt-8 mb-16 mx-4'>
                <Image src='/webdev.png' alt='server' width={30} height={30} />
                <h1>Web development</h1>
              </div>
            </motion.div>
            <motion.div className='md:w-[65%]' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
              <motion.div className='ml-8 mb-2 flex gap-5 p-2 items-center' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                <Image src='/star.svg' alt='star' width={80} height={40} className='aspect-square max-md:w-[15%] max-md:h-fit' />
                <h1 className='text-[60px] font-extrabold max-md:text-24'>MY Offerings</h1>
                <Image src='/star.png' alt='star' width={80} height={40} className='aspect-square max-md:w-[15%] max-md:h-fit' />
              </motion.div>
              <div className='md:p-6 bg-black-3 rounded-2xl grid grid-cols-2 gap-4 max-md:gap-2'>
                <ServiceBox title='Database Architecture Design' description='Skilled in designing efficient database architectures, focusing on creating scalable, high-performance solutions that ensure data integrity, optimize query performance, and support business needs.' />
                <ServiceBox title='Webhooks Management' description='Expert in efficient webhook management, specializing in integrating and automating real-time data exchanges between systems to streamline workflows and enhance operational efficiency.' />
                <ServiceBox title='Cloud Storage Management' description='Proficient in efficient cloud storage management, focusing on optimizing data storage solutions for scalability, security, and cost-effectiveness while ensuring seamless access and reliability.' />
                <ServiceBox title='Web development' description='Experienced in full-stack web development, adept at creating dynamic, scalable web applications with expertise in both front-end and back-end technologies.' />
              </div>
            </motion.div>
          </div>
          <div className='flex gap-4 max-md:flex-col'>
            <motion.div className='p-4 md:w-[25%] relative bg-gradient-to-r from-black-2/80 to-black-2/40 rounded-2xl' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
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
              {/* <Button className='absolute right-0 bottom-5' onClick={()=>router.push(`/socials`)}>
                <Image src='/arrowR.png' alt='arrow' width={50} height={50} className='transition hover:scale-150' />
              </Button> */}
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
    </div>
  )
}

export default Services