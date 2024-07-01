import { create } from 'zustand'


const useConversation = create((set)=>({
    selectedConversation:null,
    setSelectedConversation:(selectedConversation)=>set({selectedConversation}),
    selectedtyping:null,
    setSelectedtyping:(selectedtyping)=>set({selectedtyping}),
    messages:[],
    setMessages:(messages)=>set({messages}),
    livemessages:[],
    setliveMessages:(livemessages)=>set({livemessages}),
}))


export default useConversation;