import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/m/${selectedConversation?.[1]}`);
				const data = await res.json();
				if (data.error) throw new Error(data?.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?.[1]) getMessages();
	}, [selectedConversation?.[1], setMessages]);


	return { messages, loading };
}

export default useGetMessage