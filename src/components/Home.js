import React, { lazy, useState, Suspense, useTransition } from "react";
import { lazyLoad } from "../lazyLoad.js";

const AdminData = lazy(() =>
  wait(1000).then(() =>
    import("./AdminData").then((module) => {
      return { default: module.AdminData };
    })
  )
);
// use above lazy import or simplify it and use as shown below
// const AdminData = lazyLoad("./components/AdminData", "AdminData");

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          import("../sum.js").then((module) => {
            alert(`Sum of 2 + 2 is ${module.sum(2, 2)}`);
          });
        }}
      >
        Add 2 + 2
      </button>
      <button
        onClick={() => {
          startTransition(() => {
            setIsAdmin((prev) => !prev);
          });
        }}
      >
        Toggle Admin
      </button>
      {isPending && "Loading"}
      <Suspense fallback={<h1>Loading component...</h1>}>
        {isAdmin ? <AdminData /> : <h2>Not an Admin</h2>}
      </Suspense>
    </div>
  );
};

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export default Home;
