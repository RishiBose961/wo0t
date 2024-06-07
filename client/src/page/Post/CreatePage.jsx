import React from "react";
import DateTime from "./DateTime";

const people = [
  { id: 0, name: "" },
  { id: 1, name: "Gaming" },
  { id: 2, name: "News" },
  { id: 3, name: "Music" },
  { id: 4, name: "Social Media" },
  { id: 5, name: "Others" },
];

const CreatePage = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <p className=" font-semibold text-xl capitalize">What in Your minds</p>
      <div className=" grid grid-cols-2 gap-6 mt-4">
        <div>
          <div>
            <label className="text-sm/6 font-medium text-white">
              Description
            </label>

            <input
              className="mt-3 block w-full rounded-lg border-none  py-1.5 px-3 text-sm/6
            text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2
            data-[focus]:outline-white/25"
            />
          </div>
          <div className="mt-4">
            <label className="text-sm/6 font-medium text-white">Category</label>
            <select className="mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6">
              {people.map((person) => (
                <option key={person.id} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="text-sm/6 font-medium text-white">Date & Time</label>
            <DateTime />
          </div>
        </div>
        <div>
          <div>
            <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg border">
              <img
                alt=""
                src="https://plus.unsplash.com/premium_photo-1664284793210-e6f4d12a6780?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8"
                className="h-56 w-full object-cover"
              />

              <div className="p-4 sm:p-6">
                <time
                  datetime="2022-10-10"
                  className="block text-xs text-white"
                >
                  {" "}
                  10th Oct 2022{" "}
                </time>

                <a href="#">
                  <h3 className="mt-0.5 text-lg text-white">
                    How to position your furniture for positivity
                  </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae dolores, possimus pariatur animi temporibus
                  nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                  quidem, mollitia itaque minus soluta, voluptates neque
                  explicabo tempora nisi culpa eius atque dignissimos. Molestias
                  explicabo corporis voluptatem?
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
