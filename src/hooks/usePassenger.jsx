import React, { useContext } from "react";
import { PassengerContext } from "../context/PassengerProvider";

const usePassenger = () => {
  return useContext(PassengerContext);
};

export default usePassenger;
