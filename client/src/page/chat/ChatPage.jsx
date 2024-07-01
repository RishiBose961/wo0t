import React from 'react'
import Conversations from '../../components/ChatMessage/Conversation/Conversations'
import MessageContainer from '../../components/ChatMessage/Message/MessageContainer'

const ChatPage = () => {
  return (
    <div className=' grid grid-cols-3'>
      <div>
      <Conversations/>  
      </div>
      <div className=' col-span-2'>
        <MessageContainer/>
      </div>
   
    </div>
  )
}

export default ChatPage