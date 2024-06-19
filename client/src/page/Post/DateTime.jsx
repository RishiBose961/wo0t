import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { PlusSquareIcon } from "lucide-react";

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
today = `${yyyy}-${mm}-${dd}`;

export default function DateTime({
  date,
  setDate,
  scheduledate,
  setscheduledate,
}) {
  const handleIconClick = () => {
    const currentTime = today; // Get current time in 'HH:MM:SS' format
    setDate(currentTime);
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);

  const maxDateTime = new Date();
  maxDateTime.setDate(maxDateTime.getDate() + 10);
  const maxDateTimeFormatted = maxDateTime.toISOString().slice(0, 16);

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
                  <PlusSquareIcon onClick={handleIconClick} />
                </div>
              </div>
            </TabPanel>
            <TabPanel className="rounded-xl bg-white/5 p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p>Date</p>
                  <input
                    type="datetime-local"
                    className="px-2 rounded-lg mt-2"
                    value={scheduledate}
                    onChange={(e) => setscheduledate(e.target.value)}
                    min={currentDateTime}
                    max={maxDateTimeFormatted}
                  />
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
