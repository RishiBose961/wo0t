import React, { useRef, useState } from "react";
import DateTime from "./DateTime";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const people = [
  "News",
  "Sports",
  "Play",
  "Elections",
  "Money",
  "Gaming",
  "Weather",
  "Watch",
  "Learning",
  "Shopping",
  "Health",
  "Travel",
  "Traffic",
  "Autos",
];

const CreatePage = () => {
  const [descriptions, setDescriptions] = useState("");
  const [sourceurl, setSourceurl] = useState(null);
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [uploaded, setUploaded] = useState();

  const sourceu = useRef(null);

  const queryClient = new QueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      descriptions,
      sourceurl,
      category,
      visibility,
      date,
      time,
    }) => {
      try {
        const res = await axios.post(
          "/api/post/newpost",
          {
            descriptions,
            sourceurl,
            category,
            visibility,
            date,
            time,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            onUploadProgress: (data) => {
              setUploaded(Math.round((data.loaded / data.total) * 100));
            },
          }
        );

        return res.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posted"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ descriptions, sourceurl, category, visibility, date, time });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSourceurl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="flex justify-between items-center">
        <p className=" font-semibold text-xl capitalize">What in Your minds</p>
        <div className="flex justify-end items-center space-x-4">
          <button className="btn btn-outline btn-info" onClick={handleSubmit}>
            {isPending ? "Posting..." : "Upload"}
          </button>
          {uploaded > 0 && uploaded < 100 && (
            <div
              className="radial-progress"
              style={{ "--value": uploaded }}
              role="progressbar"
            >
              {uploaded}
            </div>
          )}
        </div>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 pb-20">
        <div>
          <div>
            <label className="text-sm/6 font-medium text-white">Caption</label>

            <input
              className="mt-3 block w-full rounded-lg border-none  py-1.5 px-3 text-sm/6
            text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2
            data-[focus]:outline-white/25"
              value={descriptions}
              onChange={(e) => setDescriptions(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="text-sm/6 font-medium text-white">Category</label>
            <select
              defaultValue=""
              required
              className="mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option hidden value="">
                Select Your Categories
              </option>
              {people.map((person, index) => (
                <option key={index} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="text-sm/6 font-medium text-white">
              Visibility
            </label>
            <select
              defaultValue=""
              required
              className="mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option hidden value="">
                Select Your Visibility
              </option>

              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className=" col-span-2">
              <label className="text-sm/6 font-medium text-white">
                Date & Time
              </label>
              <DateTime
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
              />
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <label className="text-sm/6 font-medium text-white">Upload</label>
              <div className="flex justify-center items-center mt-4">
                {sourceurl ? (
                  <X
                    onClick={() => {
                      setSourceurl(null);
                      sourceu.current.value = null;
                    }}
                  />
                ) : (
                  <Upload
                    className=" w-20 h-20 cursor-pointer hover:animate-pulse"
                    onClick={() => sourceu.current.click()}
                  />
                )}
              </div>
            </div>
          </div>

          <input type="file" hidden ref={sourceu} onChange={handleImgChange} />
        </div>
        <div>
          <div>
            <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg border">
              {sourceurl ? (
                <img alt="" src={sourceurl} className="h-56 w-full border-b" />
              ) : (
                <div className="h-56 w-full bg-white/5 animate-pulse border-b" />
              )}

              <div className="p-4 sm:p-6">
                <time
                  datetime="2022-10-10"
                  className="block text-xs text-white"
                >
                  {" "}
                  {date} {time}
                </time>

                <a href="#">
                  <h3 className="mt-0.5 text-lg text-white">{descriptions}</h3>
                </a>

                <div className="flex justify-between items-center mt-3">
                  {category === "" ? (
                    ""
                  ) : (
                    <div className="badge badge-accent badge-outline">
                      {category}
                    </div>
                  )}

                  {visibility === "" ? (
                    ""
                  ) : (
                    <div className="badge badge-accent capitalize badge-outline">
                      {visibility}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
