import React, { useState } from "react";

const GeminiPost = ({ aigeminigenerate, setDescriptions }) => {
  let [selected, setSelected] = useState();

  const handleSelect = (item) => {
    setSelected(item);
    setDescriptions(item);
  };

  return (
    <div className="mt-4">
      {aigeminigenerate?.map((item, index) => (
        <div className="chat chat-start" key={index}>
          <div
            className={`chat-bubble cursor-pointer ${
              selected === item ? "bg-blue-400 text-black" : ""
            } `}
            onClick={() => handleSelect(item)} // Ensure relative positioning for the chat bubble
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeminiPost;
