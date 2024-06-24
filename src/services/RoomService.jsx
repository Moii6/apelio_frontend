import { errorResponseObject } from "../utilities";
import axiosClient, {
  getTokenFromSessionStoreage,
  httpConfig,
} from "../utilities/AxiosClient";

const getRooms = async (bookingId) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.get(
      `${import.meta.env.VITE_ENDPOINT_ROOMS}${bookingId}`,
      httpConfig(token)
    );

    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};
const getUserForRoom = async (userId) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.get(
      `${import.meta.env.VITE_ENDPOINT_USER_DETAILS}${userId}`,
      httpConfig(token)
    );

    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

const getAsignRoom = async (userId, roomID) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.get(
      `${import.meta.env.VITE_ENDPOINT_ROOM_ASIGN}${userId}/${roomID}`,
      httpConfig(token)
    );

    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

const getUnnasignRoom = async (userId, roomId) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.get(
      `${import.meta.env.VITE_ENDPOINT_ROOM_UNASIGN}${userId}/${roomId}`,
      httpConfig(token)
    );

    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

const postCreateNewRoom = async (payload) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.post(
      `${import.meta.env.VITE_ENDPOINT_ROOMS}`,
      payload,
      httpConfig(token)
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};
const filterUsersPresentInRomms = (searchResultList, usersInBookingList) => {
  const namesSearchResult = new Set(searchResultList.map((user) => user.email));
  const nameBooking = "";
  //TODO keep buiilding filtering
};

const putRoom = async (roomId, payload) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.put(
      `${import.meta.env.VITE_ENDPOINT_ROOMS}/${roomId}`,
      payload,
      httpConfig(token)
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};
const deleteRoom = async (roomId) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.delete(
      `${import.meta.env.VITE_ENDPOINT_ROOMS}/${roomId}`,
      httpConfig(token)
    );

    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

export {
  getRooms,
  getUserForRoom,
  getAsignRoom,
  getUnnasignRoom,
  postCreateNewRoom,
  putRoom,
  deleteRoom,
};
