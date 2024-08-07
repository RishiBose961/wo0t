import { useQuery } from '@tanstack/react-query';
import React from 'react'

const LikeCount = ({likepost}) => {

  

  const {
    isPending,
    error,
    isError,
    data: likecount,
  } = useQuery({
    queryKey: ["likepostsss"],
    queryFn: async () => {
      return await fetch(`/api/li/count/${likepost}`).then((res) => res.json());
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>{likecount?.count}</div>
  )
}

export default LikeCount