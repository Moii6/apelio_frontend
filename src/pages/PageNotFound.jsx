import React from "react";
import { iconPlane } from "../utilities/icons";

const PageNotFound = () => {
  return (
    <div>
      <h1
        className="px-5 py-3 text-3xl font-bold h-2/12"
        style={{ color: "var(--primary)" }}
      >
        Apelio <span className="text-sm text-gray-600">by Golden Hill</span>
      </h1>
      <div className="flex flex-col items-center w-full gap-3 pt-20 ">
        <div className="flex items-center justify-center w-8/12">
          <h1 className="text-7xl text-amber-700">404 Not Found :(</h1>
        </div>

        <div className="flex items-center " style={{ color: "var(--primary)" }}>
          <h2 className="text-xl">
            Well, this is embarrassing, we couldn't find the page
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
