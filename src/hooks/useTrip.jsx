import React, { useContext } from "react";
import TripContext from "../context/TripProvider";
const useTrip = () => {
  return useContext(TripContext);
};

export default useTrip;
