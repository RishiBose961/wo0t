import { Send } from 'lucide-react'
import React, { useState } from 'react'
import useSendLiveMessage from '../../hooks/useSendLiveMessage';

const LiveInputChat = () => {
    const [message, setMessage] = useState("");
    const { sendliveMessage, loading } = useSendLiveMessage();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!message) return;
  
      await sendliveMessage(message);
      setMessage("");
    };
  return (
    <div className="flex justify-start items-center space-x-2 mt-3  border-t pt-3 mb-1">
    <label className="form-control w-full ">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered text-md w-full rounded-full "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </label>
    <button 
      className="btn btn-outline btn-info rounded-full"
      onClick={handleSubmit}
    >
      <Send  className='h-5 w-5'/>
    </button>
    
  </div>
  )
}

export default LiveInputChat