import React from 'react'
import {motion} from 'framer-motion'

const ServiceBox = ({title, description}:{title: string; description: string;}) => {
  return (
    <motion.div className='bg-black-2 rounded-2xl md:p-6 max-md:p-2' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
        <h1 className='text-white-2 pb-2 font-bold'>{title}</h1>
        <p className='text-white-3'>{description}</p>
    </motion.div>
  )
}

export default ServiceBox