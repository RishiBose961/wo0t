import { useQuery } from '@tanstack/react-query';

const useDashBoardHook = () => {
    const fetchLikeCount = async () => {
        const res = await fetch(`/api/das/postlike`);
        return res.json();
      };
    
      const {
        isPending,
        error,
        isError,
        data: likeCountPost,
      } = useQuery({
        queryKey: ["posted"],
        queryFn: fetchLikeCount,
      });

      return {likeCountPost}
}

export default useDashBoardHook