import React from 'react'

const Banner = () => {
  return (
    <div>
       <div
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://i.ibb.co/xGSYHjC/kittu-one-animals-pet-dog-banner.png")`,
            }}
            className="h-[650px] w-full bg-no-repeat bg-cover bg-center flex flex-col gap-5 items-center justify-center text-white"
          >
              <div className='z-50'>
               <h1 className='font-baloo uppercase font-semibold md:text-5xl text-3xl text-center lg:text-6xl text-white '>Create Happiness Save Lives</h1>
              </div>
          </div>
    </div>
  )
}

export default Banner
