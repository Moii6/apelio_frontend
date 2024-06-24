import React, { useEffect, useState } from "react";

const Alert = ({ type, error }) => {
  const [color, setcolor] = useState("");
  useEffect(() => {
    switch (type) {
      case "error":
        setcolor("text-red-800 bg-red-50");
        break;
      case "warning":
        setcolor("text-amber-800 bg-amber-50");
        break;
      case "info":
        setcolor("text-sky-800 bg-sky-50");
        break;
      case "success":
        setcolor("text-green-800 bg-green-50");
        break;
      default:
        setcolor("text-red-800 bg-red-50");
        break;
    }
  }, []);
  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm rounded-lg ${color}`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">
          {type === "Error"
            ? "Error " + error.status + ": " + error.message
            : type.charAt(0).toUpperCase() +
              type.slice(1) +
              "! " +
              error.message}
        </span>
      </div>
    </div>
  );
};

export default Alert;
