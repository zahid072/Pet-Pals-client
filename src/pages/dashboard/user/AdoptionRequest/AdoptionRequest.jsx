import { Avatar, Card, Tooltip, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdoptionRequest = () => {
  const [requestData, setRequestData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { user } = useAuth();
  const email = user?.email
    ? user?.email
    : user?.reloadUserInfo?.providerUserInfo[0].email;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/adoptionRequest?email=${email}`).then((res) => {
      setRequestData(res.data);
      setRefetch(false);
    });
  }, [user, refetch]);
  // ::::::::::::::::::::::::::::::::::::::::::::
  const handleAccept = (petId, id) => {
    axiosSecure
      .patch(`/pets/status/${petId}`, { adopted: true })
      .then((res) => {
        if (res.data.modifiedCount) {
          axiosSecure
            .patch(`/adoptionRequest/status/${id}`, { status: "accepted" })
            .then((res) => {
              if (res.data.modifiedCount) {
                setRefetch(true);
              }
            });
        }
      });
  };
  // --------------------------------------
  const handleUndo = (petId, id) => {
    axiosSecure
      .patch(`/pets/status/${petId}`, { adopted: false })
      .then((res) => {
        if (res.data.modifiedCount) {
          axiosSecure
            .patch(`/adoptionRequest/status/${id}`, { status: "pending" })
            .then((res) => {
              if (res.data.modifiedCount) {
                setRefetch(true);
              }
            });
        }
      });
  };
  // --------------------------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/adoptionRequest/${id}`).then((res) => {
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
      <h1 className="text-center text-3xl font-semibold font-gilda">
        All Adoption Request
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
                        User
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Number
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Address
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
                    requestData.map((pet, index) => (
                      <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            <Avatar
                              src={pet?.petImage}
                              alt={pet?.petName}
                              className="border mx-auto size-12 border-blue-gray-300 bg-blue-gray-50/50 object-contain p-1"
                            />
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {pet?.petName}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {pet?.userName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {pet?.userEmail}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {pet?.phoneNumber}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {pet?.address}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {pet?.status === "accepted" ? (
                              <Tooltip content="Undo">
                                <button
                                  onClick={() => {
                                    handleUndo(pet?.petId, pet?._id);
                                  }}
                                  className="text-green-400 font-semibold"
                                >
                                  Accepted
                                </button>
                              </Tooltip>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    handleDelete(pet?._id);
                                  }}
                                  className="px-2 mr-2 py-1 rounded bg-red-400 text-white"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => {
                                    handleAccept(pet?.petId, pet?._id);
                                  }}
                                  className="px-2 py-1 rounded bg-green-400 text-white"
                                >
                                  Accept
                                </button>
                              </>
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
    </div>
  );
};

export default AdoptionRequest;
