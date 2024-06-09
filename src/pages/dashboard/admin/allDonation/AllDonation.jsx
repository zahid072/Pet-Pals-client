import { Card, Tooltip, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import RadialProgressBar from "../../../../components/RadialProgressBar/RadialProgressBar";
import useCampaignData from "../../../../Hooks/useCampaignData";
import InfiniteScroll from "react-infinite-scroll-component";
import UpdateCampaign from "./UpdateCampaign";

const AllDonation = () => {
  const [updateCampaign, setUpdateCampaign] = useState({});
  const [updateCampaignModal, setUpdateCampaignModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [allCampaign, fetchNextPage, hasNextPage, refetch, campaignIsLoading] =
    useCampaignData();

  // ::::::::::::::::::::::::::::::::::::::::::::
  const handleUpdate = (campaign) => {
    setUpdateCampaign(campaign);
    setUpdateCampaignModal(!updateCampaignModal);
  };
  // -------------------------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donationCampaign/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Campaign has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // --------------------------------------
  const handlePause = (campaign) => {
    if (campaign?.pauseStatus) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/donationCampaign/pause/${campaign?._id}`, {
              pauseStatus: false,
            })
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                  text: "Success.",
                  icon: "success",
                });
              }
            });
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/donationCampaign/pause/${campaign?._id}`, {
              pauseStatus: true,
            })
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                  text: "Success.",
                  icon: "success",
                });
              }
            });
        }
      });
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold font-baloo uppercase">
        All Donation Campaigns
      </h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div className="bg-white p-6 rounded-lg max-w-4xl lg:mx-auto mx-2 w-full z-10 shadow ">
        <div>
          <div className="">
            <InfiniteScroll
              dataLength={allCampaign ? allCampaign?.length : 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={<div class="loader-infinite"></div>}
            >
              <Card className="h-full w-full overflow-x-auto">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Pet Name
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Max Donation
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Completed
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Donators
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Action
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCampaign &&
                      allCampaign.map((campaign, index) => (
                        <tr key={index} className={"bg-blue-gray-50/50"}>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {campaign?.petName}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              ${campaign?.maxAmount}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              <RadialProgressBar
                                size={12}
                                progress={campaign?.maxAmount}
                                max={campaign?.userCanDonate}
                              />
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {campaign?.pauseStatus ? (
                                <button
                                  onClick={() => {
                                    handlePause(campaign);
                                  }}
                                  className="px-2 mr-2 py-1 rounded bg-deep-orange-400 text-white"
                                >
                                  UnPause
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    handlePause(campaign);
                                  }}
                                  className="px-2 mr-2 py-1 rounded bg-deep-orange-400 text-white"
                                >
                                  Pause
                                </button>
                              )}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-medium flex items-center gap-3"
                            >
                              <Tooltip content="Update">
                                <button
                                  onClick={() => {
                                    handleUpdate(campaign);
                                  }}
                                  className="px-4 py-2 rounded bg-blue-gray-400 text-white"
                                >
                                  {" "}
                                  <FaPen />
                                </button>
                              </Tooltip>
                              <Tooltip content="Delete">
                                <button
                                  onClick={() => {
                                    handleDelete(campaign?._id);
                                  }}
                                  className="px-4  py-2 rounded bg-red-400 text-white"
                                >
                                  <FaTrashAlt />
                                </button>
                              </Tooltip>
                            </Typography>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Card>
            </InfiniteScroll>
          </div>
        </div>
      </div>
      {updateCampaignModal && (
        <UpdateCampaign
          refetch={refetch}
          updateCampaign={updateCampaign}
          setUpdateCampaignModal={setUpdateCampaignModal}
        />
      )}
    </div>
  );
};

export default AllDonation;
