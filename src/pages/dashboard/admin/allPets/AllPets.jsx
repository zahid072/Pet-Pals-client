import React, { useState } from "react";
import useAllData from "../../../../Hooks/useAllData";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import TimeStamp from "../../../../components/timeStamp/TimeStamp";
import { CiMenuKebab } from "react-icons/ci";
import useAuth from "../../../../Hooks/useAuth";
import useUsersData from "../../../../Hooks/useUsersData";
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";

const AllPets = () => {
  const [allPetsData] = useAllData();
  const { admin } = useUsersData();
  const [modal, setModal] = useState(0);
  const { user } = useAuth();

  const handlePopUp = (e, id) => {
    e.stopPropagation();
    setModal(id);
    if (modal === id) {
      setModal(0);
    }
  };
  const handleAdmin = (id) => {
    // axiosSecure.patch(`/allUsers/${id}`, { role: "admin" }).then((res) => {
    //   console.log(res.data);
    //   if (res.data.modifiedCount) {
    //     setModal(0);
    //     refetch();
    //   }
    // });
  };
  const handleUser = (id) => {
    // axiosSecure.patch(`/allUsers/${id}`, { role: "user" }).then((res) => {
    //   console.log(res.data);
    //   if (res.data.modifiedCount) {
    //     setModal(0);
    //     refetch();
    //   }
    // });
  };
  const handleDelete = (id) => {
    // axiosSecure.delete(`/allUsers/${id}`).then((res) => {
    //   console.log(res.data);
    //   if (res.data.deletedCount) {
    //     setModal(0);
    //     refetch();
    //   }
    // });
  };
  return (
    <div>
      <h1 className="text-center text-xl font-semibold font-gilda">All Pets</h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div
        onClick={
          modal > 0
            ? () => {
                setModal(0);
              }
            : ""
        }
        className="bg-white p-6 rounded-lg lg:w-4/6 mx-auto md:w-4/5 w-full z-10 shadow "
      >
        <div>
          <div className="">
            <Card className="h-full w-full overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Image
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Name
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Age
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Status
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
                  {allPetsData.map((pets, index) => (
                    <tr
                      key={index}
                      className={
                        pets?.adopted ? "bg-blue-gray-50/50" : "bg-white"
                      }
                    >
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Avatar
                            src={pets?.image}
                            alt={pets?.petName}
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
                          {pets?.petName}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {pets?.petAge}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {pets?.adopted ? "Adopted" : "Not Adopted"}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <div className="relative inline">
                          <button
                            onClick={(e) => {
                              handlePopUp(e, index + 1);
                            }}
                            className="px-1 py-2 rounded hover:bg-blue-gray-100 text-xl"
                          >
                            <CiMenuKebab />
                          </button>
                          {modal === index + 1 && (
                            <div className="absolute tooltip-shape w-48 right-[36px] -top-[100px] z-50 ">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="p-3"
                              >
                                <button
                                  onClick={() => {
                                    handleAdmin(pets?._id);
                                  }}
                                  className="px-3 flex gap-2 hover:border-deep-orange-500 items-center rounded border text-nowrap text-white border-white mb-2"
                                >
                                  {" "}
                                  <FaPen />
                                  Update
                                </button>

                                <button
                                  onClick={() => {
                                    handleDelete(pets?._id);
                                  }}
                                  className={`px-3 flex gap-2 hover:border-deep-orange-500 items-center rounded border text-nowrap text-white border-white`}
                                >
                                  <FaTrashAlt />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
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

export default AllPets;
