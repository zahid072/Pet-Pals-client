import React from 'react'
import { IoLogoOctocat } from 'react-icons/io'
import { LuDog } from 'react-icons/lu'
import { MdPets } from 'react-icons/md'

const SectionTop = ({title}) => {
  return (
    <div className='flex flex-col justify-center items-center mb-7 gap-3 w-full'>
        <p className='flex items-center gap-2 text-deep-orange-500'> <LuDog /><MdPets className=' text-3xl' /><IoLogoOctocat /></p>
        <p className='font-gilda font-semibold'>We really love pets</p>
        <h1 className="text-center font-bold text-4xl font-baloo uppercase">{title}</h1>
    </div>
  )
}

export default SectionTop
