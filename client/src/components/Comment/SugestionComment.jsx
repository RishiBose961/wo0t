import React, { useState } from "react";
import GeminiPostCreate from "../../hooks/GeminiPostCreate";
import { Sparkles } from "lucide-react";
const SugestionComment = ({ setinpval, postitle }) => {
  const { AipostSession } = GeminiPostCreate();

  const [Loading, setLoading] = useState(false);
  const [aigeminigenerate, setAigeminigenerate] = useState();
  let [selected, setSelected] = useState();

  const generateMessage = async () => {
    setLoading(true);
    const Prompt = `generate  2 only postive random message :- ${postitle}`;
    const result = await AipostSession.sendMessage(Prompt);
    setAigeminigenerate(JSON.parse([result.response.text()]));
    setLoading(false);
  };

  const handleSelect = (item) => {
    setSelected(item);
    setinpval({ commentext: `${item}` });
  };

  return (
    <div>
    
      <div
        className="flex justify-start mt-3 bg-gradient-to-r cursor-pointer from-violet-200 w-fit p-2 rounded-full
         to-pink-200 text-black items-center space-x-3"
        onClick={generateMessage}
      >
        <p className="font-semibold">AI Comment</p>
        <Sparkles />
      </div>
      {Loading ? <div className="flex justify-start items-center space-x-3 mt-2">
        <div className="badge badge-accent">Generating</div><span className="loading loading-dots loading-md"></span>
        </div> : ""}
      <ul>
        {aigeminigenerate?.map((item) => (
          <li className=" rounded-lg m-2 p-2 bg-violet-300" key={item}>
            <p
              className=" cursor-pointer text-black"
              onClick={() => handleSelect(item)}
            >
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SugestionComment;
