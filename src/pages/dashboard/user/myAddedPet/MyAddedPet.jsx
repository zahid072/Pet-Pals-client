import React, { useState } from "react";
import { Avatar, Card, Tooltip, Typography } from "@material-tailwind/react";
import useAuth from "../../../../Hooks/useAuth";
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PetsUpdate from "../../../../components/modals/PetsUpdate";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const MyAddedPet = () => {
  const { user } = useAuth();
  const [selectedPet, setSelectedPet] = useState({});
  const [petUpdateModal, setPetUpdateModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const email = user?.email
    ? user?.email
    : user?.reloadUserInfo?.providerUserInfo[0].email;

  // ----------------------------------

  const getPets = async ({ pageParam = 1 }) => {
    const res = await axiosSecure.get(
      `/pets/userAdded/${email}?page=${pageParam}&limit=10`
    );
    return { ...res?.data, prevOffset: pageParam };
  };
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["myAddedPets"],
    queryFn: getPets,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.prevOffset + 1;
      if (nextOffset > Math.ceil(lastPage.petsCount / 10)) {
        return undefined;
      }
      return nextOffset;
    },
  });
  const allPets = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.pets];
  }, []);

  // ---------------------------------------------------
  const handleUpdate = (pet) => {
    if (user) {
      setSelectedPet(pet);
      setPetUpdateModal(!petUpdateModal);
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
        axiosSecure.delete(`/pets/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Pet has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <title>My Added Pets|| Pet Pals</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <h1 className="text-center text-3xl font-semibold font-baloo uppercase">My Pets</h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div className="bg-white p-6 rounded-lg lg:w-4/6 mx-auto md:w-4/5 w-full z-10 shadow">
        <div>
          <div className="">
            <InfiniteScroll
              dataLength={allPets ? allPets.length : 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
              scrollableTarget={null}
            >
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
                    {allPets &&
                      allPets.map((pets, index) => (
                        <tr
                          key={index}
                          className={
                            pets?.adopted ? "bg-blue-gray-50/50" : `bg-white`
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
                              <span>
                                {pets?.adopted ? "Adopted" : "Not Adopted"}
                              </span>
                            </Typography>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-3 items-center">
                              <Tooltip content="Update">
                                <button
                                  onClick={() => {
                                    handleUpdate(pets);
                                  }}
                                  className="px-1 py-2 rounded hover:bg-blue-gray-100 text-xl"
                                >
                                  <FaPen />
                                </button>
                              </Tooltip>
                              <Tooltip content="Delete">
                                <button
                                  onClick={() => {
                                    handleDelete(pets?._id);
                                  }}
                                  className="px-1 py-2 rounded hover:bg-blue-gray-100 text-xl"
                                >
                                  <FaTrashAlt />
                                </button>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Card>
            </InfiniteScroll>
          </div>
        </div>
        {petUpdateModal && (
          <>
            <PetsUpdate
              refetch={refetch}
              selectedPet={selectedPet}
              setPetUpdateModal={setPetUpdateModal}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyAddedPet;
