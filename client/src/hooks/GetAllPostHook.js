import { useQuery } from '@tanstack/react-query';
import React from 'react'

const GetAllPostHook = () => {
    const fetchpost = async () => {
        const res = await fetch(`/api/post/getpost`);
        return res.json();
      };
    
      const {
        isPending,
        error,
        isError,
        data: postData,
      } = useQuery({
        queryKey: ["posted"],
        queryFn: fetchpost,
      });
    return {postData}
}

export default GetAllPostHook