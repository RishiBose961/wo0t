import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Comments from "../../components/Comment/Comments";
import LiveChat from "../../components/LiveChat/LiveChat";
import InfoPost from "./InfoPost";
import ShowReleted from "../../components/ShowReleted/ShowReleted";

const Individualpost = () => {
  const { id } = useParams("");

  const {
    isPending,
    error,
    isError,
    data: singlepostData,
  } = useQuery({
    queryKey: ["singlepostDatas", id],
    queryFn: async () => {
      return await fetch(`/api/post/${id}`).then((res) => res.json());
    },
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const dataShow = singlepostData;

  const createdAt = new Date(dataShow?.createdAt);

  const now = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = now - createdAt;

  // Convert the time difference to hours
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  console.log(dataShow);

  return (
    <div
      className="flex justify-center  sm:h-[450px]  mt-3 rounded-lg overflow-hidden "
      style={{ height: `90vh` }}
    >
      <div className=" overflow-auto pb-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className=" col-span-2">
              <InfoPost dataShow={dataShow} isPending={isPending} />
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <TabGroup>
                  <TabList>
                    {hoursDifference >= 24 ? (
                      ""
                    ) : (
                      <>
                        {dataShow?.commentshow && (
                          <Tab
                            className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none
                    data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 
                    data-[focus]:outline-1 data-[focus]:outline-white"
                          >
                            Live Chat
                          </Tab>
                        )}
                      </>
                    )}

                    <Tab
                      className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none
                 data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 
                 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      Comments
                    </Tab>
                  </TabList>
                  <TabPanels>
                    {hoursDifference >= 24 ? (
                      ""
                    ) : (
                      <>
                        {dataShow?.commentshow && (
                          <TabPanel className="bg-black/80">
                            {" "}
                            <LiveChat />
                          </TabPanel>
                        )}
                      </>
                    )}

                    <TabPanel className="bg-black/80">
                      <Comments
                        postitle={dataShow?.category}
                        postId={dataShow?._id}
                      />
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
            </div>
          </div>
        </div>
        <ShowReleted
          dataShows={dataShow?.category}
          dataShowid={dataShow?._id}
        />
      </div>
    </div>
  );
};

export default Individualpost;
