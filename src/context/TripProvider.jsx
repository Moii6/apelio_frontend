import React, { createContext, useEffect, useState } from "react";
import { getAllTrips, getTrip } from "../services/TripService";
import useAuth from "../hooks/useAuth";
import { getTokenFromSessionStoreage } from "../utilities/AxiosClient";
import { orderTripsByStartDate } from "../utilities";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../services/RoomService";

const TripContext = createContext();
const TripProvider = ({ children }) => {
  const [allTripsList, setAllTripsList] = useState([]);
  const [roomsList, setRoomsList] = useState([]);
  const [singleTrip, setSingleTrip] = useState({});
  const [errorObject, setErrorObject] = useState({});
  const [errorType, setErrorType] = useState("");
  const [notificationObject, setNotificationObj] = useState(false);
  const navigate = useNavigate();

  const doAllTrips = async () => {
    const data = await getAllTrips();
    if (data.message) {
      setErrorType("error");
      setErrorObject(data);
      setTimeout(() => {
        setErrorType("");
        setErrorObject({});
      }, 7500);
    }
    orderTripsByStartDate(data);
    setAllTripsList(data);
  };

  const doGetTrip = async (id) => {
    const data = await getTrip(id);
    if (data.message && data.message === "Not Found") {
      navigate("/notfound");
      return;
    }
    if (data.message) {
      setErrorType("error");
      setErrorObject(data);
      setTimeout(() => {
        setErrorType("");
        setErrorObject({});
      }, 7500);
    } else {
      setSingleTrip(data);
    }
  };

  const doGetRooms = async (bookingId) => {
    const data = await getRooms(bookingId);
    if (data.rooms) {
      setRoomsList(data.rooms);
    }
  };

  const displayAlert = (errorType, errorObject) => {
    setErrorType(errorType);
    setErrorObject(errorObject);
    setTimeout(() => {
      setErrorType("");
      setErrorObject({});
    }, 4000);
  };

  useEffect(() => {
    setSingleTrip({});
  }, []);
  return (
    <TripContext.Provider
      value={{
        allTripsList,
        errorType,
        errorObject,
        singleTrip,
        roomsList,
        notificationObject,
        setSingleTrip,
        doAllTrips,
        doGetTrip,
        doGetRooms,
        setRoomsList,
        displayAlert,
        setNotificationObj,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export { TripProvider };
export default TripContext;
