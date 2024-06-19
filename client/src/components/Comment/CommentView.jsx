import React from "react";

const CommentView = () => {
  return (
    <>
      {[0,1,2,3,4,5,6,7,8,9,10].map((i)=>(
      <div class="chat chat-start mt-5 z-50">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div class="chat-bubble">
          It was said that you would, destroy the Sith, not join them.
        </div>
      </div>
      ))}
    </>
  );
};

export default CommentView;
