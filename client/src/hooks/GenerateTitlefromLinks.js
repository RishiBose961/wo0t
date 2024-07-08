import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const GenerateTitlefromLinks = () => {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("/api/post/generatetitle", newTodo);
    },
  });
  

//   console.log(mutation.data.data);

  return {mutation}
};

export default GenerateTitlefromLinks;
