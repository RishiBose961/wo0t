import React, { useState } from "react";

const MiningTitle = ({ data, setDescriptions }) => {
  let [selected, setSelected] = useState();

  const handleSelect = (item) => {
    setSelected(item);
    setDescriptions(item);
  };

  return (
    <>
      {data === undefined ? (
        ""
      ) : (
        <div className="chat chat-start mt-2">
          <div
            className={`chat-bubble cursor-pointer ${
              selected === data ? "bg-blue-400 text-black" : ""
            } `}
            onClick={() => handleSelect(data)} // Ensure relative positioning for the chat bubble
          >
            {data}
          </div>
        </div>
      )}
    </>
  );
};

export default MiningTitle;
