import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import { useLocation } from 'react-router-dom';

const useGetLiveMessage = () => {
    const [loading, setLoading] = useState(false);
	const { livemessages, setliveMessages } = useConversation();

    const location = useLocation();

    const url = location.pathname;
  
    // Split the URL at the last slash (/)
    const id = url.split("/").pop();

	useEffect(() => {
		const getLiveMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/l/posts/${id}/live`);
				const data = await res.json();
				if (data.error) throw new Error(data?.error);
				setliveMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		 getLiveMessages();
	}, [setliveMessages]);
    


	return { livemessages, loading };
}

export default useGetLiveMessage