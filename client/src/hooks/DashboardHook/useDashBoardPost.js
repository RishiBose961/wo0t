import { useQuery } from '@tanstack/react-query';

const useDashBoardPost = () => {
    const fetchUserPost = async () => {
        const res = await fetch(`/api/das/postuser`);
        return res.json();
      };
    
      const {
        isPending,
        error,
        isError,
        data: postUserData,
      } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchUserPost,
      });

      return {postUserData}
}

export default useDashBoardPost