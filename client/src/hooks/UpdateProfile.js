import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { useEffect, useState } from "react";
import { setCredentials } from "../slices/authSlices";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [geminikeys, setgeminikeys] = useState("");
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setgeminikeys(userInfo?.geminikeys);
  }, [userInfo?.setgeminikeys]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({
        _id: userInfo._id,
        geminiApiKey: geminikeys,
      }).unwrap();

      dispatch(setCredentials({ ...res }));

      alert("Profile Update");
    } catch (error) {
      console.log(error?.data?.message || error);
    }
  };
  return { submitHandler, geminikeys, setgeminikeys, isLoading };
};

export default UpdateProfile;
