import React from "react";

const Loader = ({ state }) => {
  return (
    <div className="flex justify-center">
      <span className={`${state} loader`}></span>
    </div>
  );
};

export default Loader;
