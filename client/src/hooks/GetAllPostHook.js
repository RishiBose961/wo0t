import { useQuery } from '@tanstack/react-query';

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

      // if (isError) {
      //   <span>{error.message}</span>
      // }
    return {postData,isPending}
}

export default GetAllPostHook