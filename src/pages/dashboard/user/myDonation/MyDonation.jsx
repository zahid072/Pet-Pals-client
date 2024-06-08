import React, { useEffect, useState } from "react";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { toast } from "react-toastify";

const MyDonation = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email
    ? user?.email
    : user?.reloadUserInfo?.providerUserInfo[0].email;

  useEffect(() => {
    axiosSecure.get(`/donationCampaign/myDonation/${email}`).then((res) => {
      setPaymentHistory(res.data);
      setRefetch(false);
    });
  }, [email, refetch]);

  const handleRefund = (history) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You need to refund this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/donationCampaign/refund/${history?.campaignId}`, {amount: history?.amount}).then(res =>{
          if(res.data.modifiedCount){
            toast("Refund Success.", {
              position: "top-center",
              hideProgressBar: true,
              theme: "light",
            });
          }
        })
        axiosSecure.delete(`/donationCampaign/history/${history?._id}`).then((res) => {
          if (res.data.deletedCount) {
            setRefetch(true);
            
          }
        });
      }
    });
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold font-baloo uppercase">
        My Donations
      </h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div className="bg-white p-6 rounded-lg lg:w-4/6 mx-auto md:w-4/5 w-full z-10 shadow ">
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
                        Pet Image
                      </Typography>
                    </th>
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
                        Donated
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
                  {paymentHistory.map((history, index) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Avatar
                            src={history?.image}
                            alt={history?.petName}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {history?.petName}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {history?.amount}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          <button
                            onClick={() => {
                              handleRefund(history);
                            }}
                            className="px-4 py-2 rounded bg-blue-gray-100 hover:bg-blue-gray-200 "
                          >
                            Refund
                          </button>
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
    </div>
  );
};

export default MyDonation;
