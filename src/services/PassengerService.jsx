import { errorResponseObject } from "../utilities";
import axiosClient, {
  getTokenFromSessionStoreage,
  httpConfig,
} from "../utilities/AxiosClient";

const postCreatePassenger = async (payload) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.post(
      `${import.meta.env.VITE_ENDPOINT_TICKET}`,
      payload,
      httpConfig(token)
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};
const putPassenger = async (payload) => {
  const { ticketId, tripId, seat, userId } = payload;
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.put(
      `${import.meta.env.VITE_ENDPOINT_TICKET}/${ticketId}/${tripId}`,
      { seat, userId },
      httpConfig(token)
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

const deletePassenger = async (payload) => {
  const { ticketId, tripId } = payload;
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.delete(
      `${import.meta.env.VITE_ENDPOINT_TICKET}/${ticketId}/${tripId}`,
      httpConfig(token)
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

export { postCreatePassenger, putPassenger, deletePassenger };
