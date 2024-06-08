import React, { useEffect, useState } from "react";
import ParticleComponent from "../../components/ParticleComponent/ParticleComponent";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TimeStamp from "../../components/timeStamp/TimeStamp";
import DaysLeft from "../../components/timeStamp/DaysLeft";
import useCampaignData from "../../Hooks/useCampaignData";
import InfiniteScroll from "react-infinite-scroll-component";
import CardSkeleton from "../../components/skeletonLoader/CardSkeleton";

const DonationCampaign = () => {
  const [campaignData, setCampaignData] = useState([]);
  const [allCampaign, fetchNextPage, hasNextPage, refetch, campaignIsLoading] =
    useCampaignData();
  const newDate = new Date().toISOString();
  useEffect(() => {
    const filtered = allCampaign?.filter((cam) => newDate < cam?.lastDate);
    setCampaignData(filtered);
  }, [allCampaign]);
  return (
    <div className="pb-10">
      <div className="h-[300px] overflow-hidden w-full cursor-pointer relative bg-blue-gray-200 mb-5">
        <ParticleComponent />
        <h1 className="text-3xl font-semibold font-baloo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          All Donation Campaigns
        </h1>
      </div>
      <InfiniteScroll
        dataLength={campaignData ? campaignData.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div class="loader-infinite"></div>}
      >
        {campaignIsLoading ? (
          <CardSkeleton />
        ) : (
          <div className="md:mx-16 mx-2 grid lg:grid-cols-3 grid-cols-1 gap-5">
            {campaignData?.length > 0 &&
              campaignData.map((camp, index) => (
                <Card
                  key={index}
                  className="w-full max-w-[48rem] lg:flex-col md:flex-row flex-col"
                >
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 md:w-2/5 lg:w-full w-full relative shrink-0 md:rounded-b-none lg:rounded-bl-none md:rounded-bl-xl rounded-b-none lg:rounded-tr-xl md:rounded-tr-none lg:h-72 md: md:h-auto h-72"
                  >
                    <h4 className="text-xl font-medium p-2 rounded-r absolute top-5 left-0 bg-deep-orange-400/70 text-white">
                      Add Donation
                    </h4>
                    <img
                      src={camp?.image}
                      alt="card-image"
                      className="w-full h-full object-cover"
                    />
                  </CardHeader>
                  <CardBody className="w-full">
                    <div className="mb-4 flex justify-between items-center">
                      <Typography className="text-2xl font-semibold">
                        {camp?.petName}
                      </Typography>
                      <Typography
                        id="take"
                        className="mb-4 flex justify-between items-center"
                      >
                        <TimeStamp timestamp={camp?.timestamp} />
                      </Typography>
                    </div>
                    <Typography color="blue-gray" className="mb-2">
                      You can donate maximum: ${camp?.userCanDonate}
                    </Typography>
                    <Typography color="gray" className=" mb-8 font-normal">
                      Max Donation Amount: ${camp?.maxAmount}
                    </Typography>
                    {/* <Typography
                    color="gray"
                    className=" font-normal flex gap-2 items-center flex-wrap"
                  >
                    Campaign ends in: <DaysLeft timestamp={camp?.lastDate} />
                  </Typography> */}
                    <div>
                      <Link
                        to={`/donationDetails/${camp?._id}`}
                        className="inline-block"
                      >
                        <Button
                          variant="button"
                          className="flex  items-center gap-2"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              ))}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default DonationCampaign;
