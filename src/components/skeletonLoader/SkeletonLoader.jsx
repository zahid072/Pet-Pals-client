import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = () => {
  return (
    <div className='flex md:flex-row flex-col gap-5 my-32 max-w-7xl mx-auto'>
      <div className='lg:max-w-md w-full md:block hidden'>
        <div className='flex gap-3 justify-center py-3'><Skeleton baseColor='#929191fe' circle={true} height={50} width={100} className='bg-[#929191fe]'/></div>
        <Skeleton baseColor='#929191fe' height={50} className=' mt-5'/>
        <Skeleton baseColor='#929191fe' height={50} className=' mt-5'/>
        <Skeleton baseColor='#929191fe' height={50} className=' mt-5'/>
        <Skeleton baseColor='#929191fe' height={50} className=' mt-5'/>

      </div>
      <div className='lg:max-w-5xl w-full'>
      <Skeleton baseColor='#929191fe' height={60} className=''/>
      <div className='space-y-5'>
        <div>
        <Skeleton baseColor='#dad0d0fe' height={50} className=''/>
        </div>
        <div>
        <Skeleton baseColor='#dad0d0fe' height={50} className=''/>
        </div>
        <div>
        <Skeleton baseColor='#dad0d0fe' height={50} className=''/>
        </div>
        <div>
        <Skeleton baseColor='#dad0d0fe' height={50} className=''/>
        </div>
        <div>
        <Skeleton baseColor='#dad0d0fe' height={50} className=''/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
