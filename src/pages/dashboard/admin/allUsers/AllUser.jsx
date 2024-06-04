import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import useUsersData from "../../../../Hooks/useUsersData";

const AllUser = () => {
    const {userData} = useUsersData()
    console.log(userData)
  return (
    <div>
      <h1 className="text-center text-xl font-semibold font-gilda">
        All Users
      </h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div
        
        className="bg-white p-6 rounded-lg lg:w-4/6 mx-auto md:w-4/5 w-full z-10 shadow "
      >
        <div className="text-xl uppercase">
          <h1>Total Users: ({userData?.length}) </h1>
        </div>
        <div>
          <div className="">
          <Card className="h-full w-full overflow-x-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                
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
          
          {
            userData.map((users, index)=>(
                <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    1
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {users?.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                   {users?.email}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {users?.role}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    <button >x</button>
                  </Typography>
                </td>
              </tr>
            ))
          }
          
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
