import React, { createContext, useState } from "react";
import {
  deletePassenger,
  postCreatePassenger,
  putPassenger,
} from "../services/PassengerService";
import useTrip from "../hooks/useTrip";
import { getAllUserDetailsByUserId } from "../services/SearchService";
const PassengerContext = createContext();
const PassengerProvider = ({ children }) => {
  const [isPassSelected, setIsPassSelected] = useState(false);
  const [seatsList, setSeatsList] = useState([]);
  const { roomsList, singleTrip, setSingleTrip, doGetRooms } = useTrip();
  const [userInfoForTripPassengersList, setUserInfoForPassengersList] =
    useState([]);

  const notifyPassengerIsSelected = (state) => {
    setIsPassSelected(state);
  };

  const doAddPassengerToTrip = async (userId, tripId, seat) => {
    const data = await postCreatePassenger({ userId, tripId, seat });
    const tripCopy = singleTrip;
    tripCopy.passengers = data.passengers;
    const seatListUpd = seatsList.filter((seat) => seat.seat !== seat);
    setSeatsList(seatListUpd);
    setSingleTrip(tripCopy);
  };

  const doUpdatePassenger = async (payload) => {
    const data = await putPassenger(payload);
    if (data.ticket) {
      setSingleTrip({ ...singleTrip });
    }
  };

  const doDeletePassenger = async (payload) => {
    const data = await deletePassenger(payload);
    setSingleTrip({ ...singleTrip });
    console.log(data);
    if (data.id) {
      const tripUpd = { ...singleTrip };
      tripUpd.passengers = singleTrip.passengers.filter(
        (passenger) => passenger._id !== data.id
      );
      setSingleTrip(tripUpd);
    }
  };

  const doSearchUsersInfoForRooms = async () => {
    const result = await getAllUserDetailsByUserId(singleTrip?.passengers);
    setUserInfoForPassengersList(result);
  };

  const verifyPassengerAttachedToRoom = async (userId) => {
    const result = roomsList?.some((room) => {
      console.log(room);
      return room.user === userId;
    });
    return result;
  };
  return (
    <PassengerContext.Provider
      value={{
        isPassSelected,
        seatsList,
        userInfoForTripPassengersList,
        setSeatsList,
        doUpdatePassenger,
        setIsPassSelected,
        notifyPassengerIsSelected,
        doAddPassengerToTrip,
        doDeletePassenger,
        doSearchUsersInfoForRooms,
        verifyPassengerAttachedToRoom,
      }}
    >
      {children}
    </PassengerContext.Provider>
  );
};
export { PassengerContext };
export default PassengerProvider;
