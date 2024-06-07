import React from "react";
import MainCompProfile from "../Profile/MainCompProfile";


const MainComp = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      {[0, 1, 2, 3, 4].map((i) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 mb-4 gap-3">
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
          <div className="hidden lg:flex w-fit">
              <MainCompProfile/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainComp;
