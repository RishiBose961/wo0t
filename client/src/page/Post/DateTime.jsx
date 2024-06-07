import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { PlusSquareIcon } from "lucide-react";

let today = new Date();

let dd = today.getDate();
let mm = today.getMonth() + 1;

let yyyy = today.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = dd + "/" + mm + "/" + yyyy;

export default function DateTime() {
  return (
    <div className="w-full pt-3">
      <div className="w-full max-w-md">
        <TabGroup>
          <TabList className="flex gap-4">
            <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              Today
            </Tab>
            <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              Schedule
            </Tab>
          </TabList>
          <TabPanels className="mt-3">
            <TabPanel className="rounded-xl bg-white/5 p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p>Publish Now</p>
                  <p>{today}</p>
                </div>
                <div>
                  <PlusSquareIcon />
                </div>
              </div>
            </TabPanel>
            <TabPanel className="rounded-xl bg-white/5 p-3">
              <p>Date</p>
              <input type="date" className="px-2 rounded-lg" />
              <p className="mt-6">Time</p>
              <input type="time" className="px-2 rounded-lg" />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
