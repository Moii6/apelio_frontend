import React, { createContext, useEffect, useState } from "react";
import {
  getAllUserDetailsByNameAndEmail,
  getAllUserDetailsByUserId,
} from "../services/SearchService";
import {
  deleteRoom,
  getAsignRoom,
  getRooms,
  getUnnasignRoom,
  postCreateNewRoom,
  putRoom,
} from "../services/RoomService";
import useTrip from "../hooks/useTrip";
import {
  deleteBooking,
  postCreateBooking,
  putUpdateBooking,
} from "../services/BookingService";
const RoomContext = createContext();
const RoomProvider = ({ children }) => {
  const { setRoomsList, singleTrip, doGetRooms, doGetTrip } = useTrip();
  const [roomDetailsOpen, setRoomDetailsOpen] = useState(false);
  const [searchResultList, setSearchResultList] = useState([]);
  const [userIdForAsignment, setUserIdForAsignment] = useState("");
  const [isUnnasigned, setIsUnnasigned] = useState(false);

  const doSearchUsers = async (stringParam) => {
    const data = await getAllUserDetailsByNameAndEmail(stringParam);
    setSearchResultList(data.users);
  };
  const doCreateNewRoom = async (payload) => {
    const data = await postCreateNewRoom(payload);
    if (data.room) await doGetRooms(data.room.booking._id);
  };

  const doRoomAssign = async (bookingId, userId, roomId) => {
    await getAsignRoom(userId, roomId);
    const data = await getRooms(bookingId);
    setRoomsList(data.rooms);
  };

  const doRoomUnnasign = async (bookingId, userId, roomId) => {
    await getUnnasignRoom(userId, roomId);
    const data = await getRooms(bookingId);
    setIsUnnasigned(true);
    setRoomsList(data.rooms);
  };

  const doRoomUpdate = async (roomId, bookingId, payload) => {
    const data = await putRoom(roomId, payload);
    await doGetRooms(bookingId);
  };

  const doRoomDelete = async (bookingId, roomId) => {
    await deleteRoom(roomId);
    doGetRooms(bookingId);
  };

  const doCreateBooking = async (tripId, payload) => {
    const data = await postCreateBooking(tripId, payload);
    console.log(data);
    if (data._id) {
      doGetTrip(tripId);
    } else return data;
  };

  const doUpdateBooking = async (bookId, payload) => {
    const data = await putUpdateBooking(bookId, payload);
    if (data._id) {
      doGetTrip(singleTrip._id);
      return true;
    }
  };

  const doDeleteBooking = async (bookId) => {
    const data = await deleteBooking(bookId);
    console.log(data);
  };

  const setingUserForAssignment = (id) => {
    setUserIdForAsignment(id);
  };
  const verifyBookingNameAvailable = (name) => {
    if (singleTrip.booking.length > 0) {
      const res = singleTrip.booking.some(
        (book) => book.name.toLowerCase() === name.toLowerCase()
      );
      return res;
    }
  };

  return (
    <RoomContext.Provider
      value={{
        searchResultList,
        roomDetailsOpen,
        userIdForAsignment,
        isUnnasigned,
        setIsUnnasigned,
        doRoomUnnasign,
        setRoomDetailsOpen,
        doSearchUsers,
        setSearchResultList,
        setingUserForAssignment,
        doRoomAssign,
        setUserIdForAsignment,
        doCreateNewRoom,
        doRoomUpdate,
        doRoomDelete,
        doCreateBooking,
        verifyBookingNameAvailable,
        doUpdateBooking,
        doDeleteBooking,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomProvider };
export default RoomContext;
