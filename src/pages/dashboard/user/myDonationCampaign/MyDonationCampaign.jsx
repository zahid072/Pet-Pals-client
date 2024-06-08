import { Card, Tooltip, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaPen } from "react-icons/fa";
import PaymentHistory from "../../../../components/modals/PaymentHistory";

const MyDonationCampaign = () => {
  const [requestData, setRequestData] = useState([]);
  const [campaignId, setCampaignId] = useState("");
  const [paymentHistoryModal, setPaymentHistoryModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const { user } = useAuth();
  const email = user?.email
    ? user?.email
    : user?.reloadUserInfo?.providerUserInfo[0].email;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/donationCampaign/user?email=${email}`).then((res) => {
      setRequestData(res.data);
      setRefetch(false);
    });
  }, [user, refetch]);
  // ::::::::::::::::::::::::::::::::::::::::::::
  const handleUpdate = (petId, id) => {
    axiosSecure
      .patch(`/pets/status/${petId}`, { adopted: true })
      .then((res) => {
        if (res.data.modifiedCount) {
          axiosSecure.patch(`//${id}`, { status: "accepted" }).then((res) => {
            if (res.data.modifiedCount) {
              setRefetch(true);
            }
          });
        }
      });
  };

  // --------------------------------------
  const handlePause = (id) => {
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
        axiosSecure.patch(`//${id}`).then((res) => {
          if (res.data.deletedCount) {
            setRefetch(true);
            Swal.fire({
              title: "Canceled!",
              text: "Pet has been canceled.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold font-baloo uppercase">
        My Donation Campaign
      </h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div className="bg-white p-6 rounded-lg max-w-4xl lg:mx-auto mx-2 w-full z-10 shadow ">
        <div>
          <div className="">
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
                        Progress
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
                  {requestData &&
                    requestData.map((campaign, index) => (
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
                            <button>progress</button>
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            <button
                              onClick={() => {
                                setPaymentHistoryModal(!paymentHistoryModal);
                                setCampaignId(campaign?._id)
                              }}
                              className="px-2 py-1 rounded bg-blue-gray-100 hover:bg-blue-gray-200"
                            >
                              View Donator
                            </button>
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
                                  handleUpdate(campaign?._id);
                                }}
                                className="px-4 py-2 rounded bg-green-400 text-white"
                              >
                                {" "}
                                <FaPen />
                              </button>
                            </Tooltip>

                            {campaign?.pauseStatus ? (
                              <button
                                onClick={() => {
                                  handlePause(campaign?._id);
                                }}
                                className="px-2 mr-2 py-1 rounded bg-deep-orange-400 text-white"
                              >
                                UnPause
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  handlePause(campaign?._id);
                                }}
                                className="px-2 mr-2 py-1 rounded bg-deep-orange-400 text-white"
                              >
                                Pause
                              </button>
                            )}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
      {paymentHistoryModal && (
        <PaymentHistory
          campaignId={campaignId}
          setPaymentHistoryModal={setPaymentHistoryModal}
        />
      )}
    </div>
  );
};

export default MyDonationCampaign;
