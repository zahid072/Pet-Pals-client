import React from "react";
import { Card, Tooltip, Typography } from "@material-tailwind/react";
import useUsersData from "../../../../Hooks/useUsersData";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import useAdmin from "../../../../Hooks/useAdmin";

const AllUser = () => {
  const { userData, refetch } = useUsersData();
  const { admin } = useAdmin();
  const axiosSecure = useAxiosSecure();
  const handleUpdateAdmin = (user) => {
    if (user?.role === "user" && admin) {
      Swal.fire({
        title: "Are you sure?",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/${user?._id}`, { role: "admin" })
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
              }
            });
        }
      });
    } else if (user?.role === "admin" && admin) {
      Swal.fire({
        title: "Are you sure?",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/${user?._id}`, { role: "user" })
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
              }
            });
        }
      });
    }
  };
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
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
        All Users
      </h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div className="bg-white p-6 rounded-lg lg:w-4/6 mx-auto md:w-4/5 w-full z-10 shadow ">
        <div className="text-xl uppercase">
          <h1>Total Users: ({userData?.length}) </h1>
        </div>
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
                        Name
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Email
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Role
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
                  {userData.map((users, index) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          1
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {users?.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {users?.email}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Tooltip
                            content={
                              users?.role === "admin"
                                ? "Make User"
                                : "Make Admin"
                            }
                          >
                            <span
                              onClick={() => {
                                handleUpdateAdmin(users);
                              }}
                              className={
                                admin
                                  ? " hover:bg-blue-gray-100 p-2 rounded cursor-pointer"
                                  : "p-2 rounded"
                              }
                            >
                              {users?.role}
                            </span>
                          </Tooltip>
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
                          <button
                            onClick={() => {
                              handleDelete(users?._id);
                            }}
                            className="px-1 py-2 rounded hover:bg-blue-gray-100 text-xl"
                          >
                            <FaTrashAlt />
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

export default AllUser;
