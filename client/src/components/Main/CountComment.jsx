import { useQuery } from "@tanstack/react-query";
import React from "react";

const CountComment = ({ postd }) => {
  const fetchpostcount = async () => {
    const res = await fetch(`/api/c/${postd}/count`);
    return res.json();
  };

  const {
    isPending: loading,
    error,
    isError,
    data: commentCount,
  } = useQuery({
    queryKey: ["commentCounts", postd],
    queryFn: fetchpostcount,
  });

  if (loading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return <div>{commentCount?.count}</div>;
};

export default CountComment;
