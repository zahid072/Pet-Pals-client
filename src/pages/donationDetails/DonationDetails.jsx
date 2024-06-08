import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import DaysLeft from '../../components/timeStamp/DaysLeft';

const DonationDetails = () => {
  const [campaignModal, setCampaignModal] = useState(false);
  const { id } = useParams();
  const [campaign, setCampaign] = useState({});
  const axiosSecure = useAxiosSecure();
  // get the matched pets
  useEffect(() => {
    axiosSecure.get(`/donationCampaign/${id}`).then((res) => {
      setCampaign(res.data);
    });
  }, [id]);
  const handleDonate = () => {
     
  };
  return (
    <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-100">
	<div className="flex flex-col max-w-5xl mx-auto overflow-hidden rounded">
	<div className='w-full bg-gray-500 dark:bg-gray-500'>
  <img src={campaign?.image} alt={campaign?.petName} className="w-full object-cover sm:h-[500px] h-60 " />
  </div>
		<div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-4xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900 dark:bg-gray-50">
			<div className="space-y-2">
				<div className='flex justify-between md:flex-row flex-col items-center '>
        <h3 rel="noopener noreferrer" className="inline-block text-2xl font-semibold sm:text-3xl">{campaign?.petName}</h3>
        <p className="text-xs text-gray-400 dark:text-gray-600 flex gap-2 items-center">Campaign ends in: <DaysLeft timestamp={campaign?.lastDate}/>
				</p>
        </div>
			</div>
      <div className='space-y-3'>
        <h4>You can donate maximum: <span className='text-amber-500'>${campaign?.userCanDonate}</span></h4>
        <h4>Max Donation Amount: <span className='text-amber-500'>${campaign?.maxAmount}</span></h4>
        <p>Short Description: {campaign?.shortDescription}</p>
      </div>
			<div className="bg-blue-gray-50/10">
        <h4 className='py-4 px-3 rounded-t bg-blue-gray-500'>Description</h4>
				<p className="text-gray-100 dark:text-gray-800 p-4">{campaign?.longDescription}</p>
			</div>
		</div>
    <div className='w-full flex justify-center mt-5'>
    <Button onClick={()=>{
      handleDonate()
    }} className='bg-[#FF5722] border border-deep-orange-500 hover:border-black hover:shadow'>Donate</Button>
    </div>
	</div>
</div>
  )
}

export default DonationDetails
