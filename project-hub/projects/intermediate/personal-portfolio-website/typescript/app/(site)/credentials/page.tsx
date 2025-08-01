"use client"

import Skills from '@/components/Skills'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import {motion} from 'framer-motion'
import React from 'react'

const Credentials = () => {

  return (
    <div className='mt-4 scroll-smooth'>
      <div className='mx-32 py-6 max-md:mx-4 gap-24 flex max-md:flex-col'>
        <motion.div className='md:w-[30%] p-6 bg-black-3 rounded-2xl md:sticky h-fit top-[6px]' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
          <Image src='/profile.jpg' alt='ashish' width={300} height={300} className='rounded-2xl shadow-2xl' />
          <div className='mt-10'>
            <h1 className='font-extrabold text-[28px] text-center'>Ashish Jadhav.</h1>
            <h2 className='font-extrabold text-[18px] text-white-3 text-center'>@ashishhh2210</h2>
            <div className='flex justify-evenly mt-8 my-2'>
              <Link href='https://www.instagram.com/ashishhh2210?igsh=MWR1NHBxZmZ1MGY5OQ==' target={'_blank'}>
                <Image src='/instagram.svg' alt='twitter' width={50} height={50} className='aspect-square bg-black-2 border mr-2 hover:bg-black-7 transition p-3 rounded-2xl' />
              </Link>
              <Link href='https://x.com/ashishhh2210' target={'_blank'}>
                <Image src='/twitter.svg' alt='twitter' width={50} height={50} className='rounded-full bg-black-2 aspect-square mx-2 p-1 border hover:bg-black-7 transition cursor-pointer' />
              </Link>
              <Link href='https://discord.gg/63sd6r2N88' target={'_blank'}>
                <Image src='/discord.svg' alt='twitter' width={50} height={50} className='rounded-full bg-black-2 aspect-square mx-2 p-2 border hover:bg-black-7 transition cursor-pointer' />
              </Link>
              <Link href='https://github.com/Ashish1022' target={'_blank'}>
                <Image src='/github.svg' alt='twitter' width={50} height={50} className='rounded-full bg-black-2 aspect-square ml-2 p-2 border hover:bg-black-7 transition cursor-pointer' />
              </Link>
            </div>
            <Link href='/contact'>
              <Button className='bg-black-6 w-full rounded-2xl mt-6'>
                Contat Me.
              </Button>
            </Link>
          </div>
        </motion.div>
        <div className='md:w-[70%] flex flex-col gap-8' >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            <h1 className='text-white-1 text-24 font-bold mb-10 font-mono'>About Me.</h1>
            <p className='text-white-2 font-normal mb-4'>I'm a passionate tech enthusiast with a relentless curiosity for the latest advancements in technology. From groundbreaking gadgets and innovative software to emerging trends in artificial intelligence and cybersecurity, I'm always on the cutting edge of what's new and next. My journey in tech is driven by a love for problem-solving and a desire to understand how things work behind the scenes.</p>
            <p className='text-white-2 font-normal mt-4'>Whether it's building my own PC, exploring the latest apps, or diving into the world of blockchain, I thrive on discovering and sharing insights about the technologies that shape our future. When I'm not tinkering with the latest tech, you’ll find me engaged in discussions about tech trends, attending industry events, or contributing to tech communities.</p>
          </motion.div>
          <motion.div className='mt-12' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            <h1 className='font-mono text-24 font-bold mb-10 text-white-1'>EDUCATION.</h1>
            <p className='text-white-3 py-1'>2022 - Present</p>
            <p className='text-blue-600 py-1 font-bold'>Bachelor of Engineeering in Information technology</p>
            <p className='text-white-3 py-1'>University Of Mumbai</p>
            <p className='text-white-2 mb-8 py-1 pb-2'>During my studies at Bharati Vidyapeeth, I immersed myself in the dynamic field of Information Technology. My coursework included Software Engineering, Machine Learning, Network Security, which provided me with a solid foundation in both theoretical concepts and practical applications. I actively engaged in Internships, and Relevant Activities, where I honed my skills in Python programming, systems analysis, or cloud computing. My academic journey was complemented by tech clubs, hackathons, and student organizations, further fueling my passion for technology and innovation.</p>
          </motion.div>
          <motion.div className='mt-8' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            <h1 className='font-mono text-24 font-bold mb-10 text-white-1'>SKILLS.</h1>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-8 w-[50%]'>
                <Skills skill='Python' sub='NumPy, MatPlotlib, Scikit-learn, OpenCV, PyGame' />
                <Skills skill='DevOps' sub='Git, GitHub, Docker, Jenkins, AWS, FileCloud' />
                <Skills skill='Web Development' sub='HTML, CSS, Tailwind, JavaScript, TypeScript, Next JS' />
              </div>
              <div className='flex flex-col gap-8 w-[50%]'>
                <Skills skill='Database' sub='SQL, PostgreSQL, MongoDB, Convex, Supabase' />
                <Skills skill='Networking' sub='Wireshark, NMAP, VPNs, Firewalls' />
                <Skills skill='Other tools' sub='Clerk, Stripe, Three JS' />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Credentials