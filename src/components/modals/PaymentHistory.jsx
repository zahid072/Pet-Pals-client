import { Card, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = ({ campaignId, setPaymentHistoryModal }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email
    ? user?.email
    : user?.reloadUserInfo?.providerUserInfo[0].email;

  useEffect(() => {
    axiosSecure.get(`/donationCampaign/history/${email}`).then((res) => {
      const filtered = res.data?.filter(
        (history) => history?.campaignId === campaignId
      );
      setPaymentHistory(filtered);
    });
  }, [email]);
  const handleDelete = (id) => {};
  return (
    <div className="fixed z-[555] top-[20%] left-1/2 -translate-x-1/2 bg-teal-500/70 rounded-md max-w-3xl w-full">
      <div className="relative p-5 max-h-[500px] overflow-auto">
        <button
          onClick={() => {
            setPaymentHistoryModal(false);
          }}
          className="p-1 absolute top-1 right-1 z-[666] bg-blue-gray-200 rounded"
        >
          <IoClose className="text-black text-xl" />
        </button>
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
                    User Email
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Payment Amount
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Transaction Id
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
              {paymentHistory &&
                paymentHistory.map((history, index) => (
                  <tr key={index} className={"bg-blue-gray-50/50"}>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {history?.user}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        ${history?.amount}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        <Tooltip content={history?.transactionId}>
                          <p>{history?.transactionId.slice(0, 12) + `...`}</p>
                        </Tooltip>
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium flex items-center gap-3"
                      >
                        <Tooltip content="Delete">
                          <button
                            onClick={() => {
                              handleDelete(history?._id);
                            }}
                            className="px-4 py-2 rounded bg-green-400 text-white"
                          >
                            {" "}
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
      </div>
    </div>
  );
};

export default PaymentHistory;
