"use client"

import { projects } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const page = ({ params }: { params: { projectId: string } }) => {
  return (
    <div className='mt-4 scroll-smooth'>
      <div className='mx-32 max-md:mx-2 py-6'>
        {projects.map(({ id, description, techStack, thumbnail, name, year, service, methodology, link }) => {
          return (
            <>
              {id === params.projectId ? (
                <div key={id} className='flex flex-col items-center gap-6'>
                  <motion.div className='mb-4 flex gap-5 p-2 items-center max-md:mb-2 ' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                    <Image src='/star.svg' alt='star' width={40} height={40} className='aspect-square' />
                    <h1 className='text-[30px] font-extrabold'>{name}</h1>
                    <Image src='/star.png' alt='star' width={40} height={40} />
                  </motion.div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                    <Image src={thumbnail} alt='thumbnail' width={1300} height={1200} className='w-[100vw] p-2 bg-white-1 rounded-3xl max-md:p-1' />
                  </motion.div>
                  <motion.div className='flex max-md:flex-col gap-4 bg-gradient-to-r from-black-1 to-black-1 p-4 w-full rounded-2xl' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                    <div className='md:w-[50%] space-y-2 bg-gradient-to-r from-black-6 to-black-2 rounded-2xl p-4'>
                      <h1 className='text-white-3 font-bold text-[18px]'>Tech stack.</h1>
                      <p className='text-white-2'>{techStack}</p>
                    </div>
                    <Image src='/lamp.png' alt='lamp' width={120} height={40} className='h-fit' />
                    <div className='md:w-[50%] space-y-2 bg-gradient-to-r from-black-6 to-black-2 rounded-2xl p-4'>
                      <h1 className='text-white-3 font-bold text-[18px]'>About.</h1>
                      <p className='text-white-2'>{description}</p>
                    </div>
                  </motion.div>
                  <motion.div className='flex max-md:flex-col gap-6 bg-gradient-to-r from-black-1 to-black-1 p-4 w-full rounded-2xl' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                    <div className='w-[30%] max-md:w-[100%] space-y-8 bg-gradient-to-r from-black-6 to-black-2 rounded-2xl p-4 max-md:relative'>

                      <Link href={`https://${link}`} target={'_blank'} className='absolute right-[2%] bottom-[5%] md:hidden'>
                        <span className='text-white-1 bg-black-1/90 rounded-2xl p-4 font-bold'>Live Demo</span>
                      </Link>

                      <div>
                        <h1 className='text-white-3 font-bold text-[16px]'>Year</h1>
                        <p className='text-white-2 font-extrabold text-[20px]'>{year}</p>
                      </div>
                      <div>
                        <h1 className='text-white-3 font-bold text-[16px]'>Services</h1>
                        <p className='text-white-2 font-extrabold text-[20px]'>{service}</p>
                      </div>
                      <div>
                        <h1 className='text-white-3 font-bold text-[16px]'>Project</h1>
                        <p className='text-white-2 font-extrabold text-[20px]'>{name}</p>
                      </div>
                      <Image src='/lamp.png' alt='lamp' width={100} height={100} />
                    </div>
                    <div className='w-[70%] max-md:w-[100%] space-y-8 relative'>
                      <h1 className='text-white-3 font-extrabold text-[20px]'>Description.</h1>
                      <p className='text-white-2 font-bold text-[16px] max-md:text-justify'>{methodology}</p>
                      <div className='md:absolute bottom-2 left-[50%] md:-translate-x-[50%] flex flex-col items-center justify-center w-full'>
                        <div className='mb-1 flex gap-5 p-2 items-center'>
                          <Image src='/star.svg' alt='star' width={40} height={40} className='aspect-square' />
                          <h1 className='text-[30px] font-extrabold max-md:text-24'>{name}</h1>
                          <Image src='/star.png' alt='star' width={40} height={40} />
                        </div>
                        <p>by <b className='tracking-wider underline underline-offset-8'>Ashish Jadhav.</b></p>
                        <div className='absolute right-3 max-md:hidden'>
                          {link ? (
                            <span className='text-white-1 bg-black-6 rounded-2xl p-4 font-bold'>
                              <Link href={`https://${link}`} target={'_blank'}>
                                <span>Live Demo</span>
                              </Link>
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <></>
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default page