import React from 'react'
import Conversations from '../../components/ChatMessage/Conversation/Conversations'
import MessageContainer from '../../components/ChatMessage/Message/MessageContainer'

const ChatPage = () => {
  let height = screen?.height;
  return (
    <div className=' grid grid-cols-3'>
      <div className=''>
      <Conversations/>  
      </div>
      <div className=' col-span-2  border-l px-4' style={{ height: height / 1.5 }}>
        <MessageContainer/>
      </div>
   
    </div>
  )
}

export default ChatPage