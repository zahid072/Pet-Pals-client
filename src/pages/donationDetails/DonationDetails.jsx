import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DaysLeft from "../../components/timeStamp/DaysLeft";
import MakeDonation from "../../components/modals/MakeDonation";
import { LuDog } from "react-icons/lu";
import { IoLogoOctocat } from "react-icons/io5";
import { MdPets } from "react-icons/md";
import RecommendedCard from "./RacommendedCard";
import { Helmet } from "react-helmet";


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DonationDetails = () => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [donateModal, setDonateModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const { id } = useParams();
  const [campaign, setCampaign] = useState({});
  const axiosSecure = useAxiosSecure();
  const [campaignData, setCampaignData] = useState([]);
  const newDate = new Date().toISOString();
  
  useEffect(() => {
    axiosSecure.get(`/donate/random?id=${id}`).then((res) => {
      const filtered = res.data?.filter(
        (cam) => newDate < cam?.lastDate && cam?.maxAmount < cam?.userCanDonate
      );
      setCampaignData(filtered);
    });
  }, [id]);


  // get random index for slice data
  useEffect(() => {
   if(campaignData.length>0){
    let numbers = [];
    const firstNumber = getRandomNumber(0, campaignData?.length);
    if(campaignData?.length < 4){
      numbers = [{firstNumber:0}, {secondNumber:campaignData?.length}]
    }else if(firstNumber<=campaignData?.length-3){
      const secondNumber = firstNumber + 3;
      numbers = [{firstNumber}, {secondNumber}]
    } else if(firstNumber>campaignData?.length - 3){
      numbers = [{firstNumber:firstNumber -3}, {secondNumber:firstNumber}]
    }
    setRandomNumbers(numbers);
   }
}, [campaignData?.length>0]);

  // get the matched pets
  useEffect(() => {
    axiosSecure.get(`/donationCampaign/${id}`).then((res) => {
      setCampaign(res.data);
      setRefetch(false);
    });
  }, [id, refetch]);
  const handleDonate = () => {
    setDonateModal(!donateModal);
  };
  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />
          <title>Donation Details || Pet Pals</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-100">
      <div className="flex flex-col max-w-5xl mx-auto overflow-hidden rounded">
        <div className="w-full bg-gray-500 dark:bg-gray-500">
          <img
            src={campaign?.image}
            alt={campaign?.petName}
            className="w-full object-cover sm:h-[500px] h-60 "
          />
        </div>
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-4xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900 dark:bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between md:flex-row flex-col items-center ">
              <h3
                rel="noopener noreferrer"
                className="inline-block text-2xl font-semibold sm:text-3xl"
              >
                {campaign?.petName}
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-600 flex gap-2 items-center">
                Campaign ends in: <DaysLeft timestamp={campaign?.lastDate} />
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h4>
              You can donate maximum:{" "}
              <span className="text-amber-500">${campaign?.userCanDonate}</span>
            </h4>
            <h4>
              Max Donation Amount:{" "}
              <span className="text-amber-500">${campaign?.maxAmount}</span>
            </h4>
            <p>Short Description: {campaign?.shortDescription}</p>
          </div>
          <div className="bg-blue-gray-50/10">
            <h4 className="py-4 px-3 rounded-t bg-blue-gray-500">
              Description
            </h4>
            <p className="text-gray-100 dark:text-gray-800 p-4">
              {campaign?.longDescription}
            </p>
          </div>
          <div className="w-full flex justify-center mt-5">
            <Button
              disabled={
                campaign?.pauseStatus ||
                campaign?.maxAmount >= campaign?.userCanDonate
              }
              onClick={() => {
                handleDonate();
              }}
              className="bg-[#FF5722] border border-deep-orange-500 hover:border-white hover:shadow"
            >
              Donate
            </Button>
          </div>
          {campaign?.pauseStatus ||
          campaign?.maxAmount >= campaign?.userCanDonate ? (
            <p className="text-red-500 mt-4 text-center">
              This campaign is paused.
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="flex flex-col justify-center items-center mt-6">
            <p className="flex items-center gap-2 text-deep-orange-500">
              {" "}
              <LuDog />
              <MdPets className=" text-3xl" />
              <IoLogoOctocat />
            </p>
            <p className="font-gilda font-semibold text-black">
              We really love pets
            </p>
            <h3 className="text-3xl font-semibold font-baloo text-center text-black">
              Recommended Donation
            </h3>
          </div>
          <div className=" flex flex-col justify-center items-center gap-5 mt-5">
            {campaignData &&
              campaignData.slice(randomNumbers[0]?.firstNumber, randomNumbers[1]?.secondNumber).map((campaign, index) => (
                <div key={index} className="text-black">
                  <RecommendedCard campaign={campaign}/>
                </div>
              ))}
          </div>
        </div>
      </div>
      {donateModal && (
        <MakeDonation
          setRefetch={setRefetch}
          campaign={campaign}
          setDonateModal={setDonateModal}
        />
      )}
    </div>
    </>
  );
};

export default DonationDetails;
