import { Sparkles } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import UpdateProfile from "../../hooks/UpdateProfile";

const SideStory = () => {
  const { submitHandler, geminikeys, setgeminikeys, isLoading } =
    UpdateProfile();
  const { userInfo } = useSelector((state) => state.auth);

  function maskApiKey(apiKey) {
    const visibleStart = 4;
    const visibleEnd = 6;
    const maskedSection = "******";

    // Extract the start and end parts of the API key
    const start = apiKey?.substring(0, visibleStart);
    const end = apiKey?.substring(apiKey.length - visibleEnd);

    // Combine the parts with the masked section
    const maskedApiKey = `${start}${maskedSection}${end}`;

    return maskedApiKey;
  }

  const apiKey = userInfo?.geminiApiKey;
  const maskedApiKey = maskApiKey(apiKey);

  return (
    <div className="hidden xl:flex h-screen flex-col justify-between border-s">
      {userInfo ? (
        <div className="px-4 py-6">
          <span className="grid h-10 w-64 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            GEMINI API KEY
          </span>
          <div>
            {userInfo?.geminiApiKey ? (
              <div className="badge badge-accent m-4 badge-outline">
                {maskedApiKey}
              </div>
            ) : (
              <form
                onSubmit={submitHandler}
                className="flex justify-start items-center space-x-3 m-4"
              >
                <input
                  className="block w-full rounded-lg border-none py-1.5 px-3 text-sm/6
  text-white bg-black/80 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2
  data-[focus]:outline-white/25"
                  placeholder="API KEY"
                  value={geminikeys}
                  onChange={(e) => setgeminikeys(e.target.value)}
                />
                <button type="submit">
                  <Sparkles className=" cursor-pointer" />
                </button>
              </form>
            )}
          </div>
          <span className="grid h-10 w-64 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            Your Interested Tags
          </span>
          <div></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideStory;
