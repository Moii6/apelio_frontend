import { errorResponseObject } from "../utilities";
import axiosClient, {
  getTokenFromSessionStoreage,
  httpConfig,
} from "../utilities/AxiosClient";

const postCreateBooking = async (tripId, payload) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.post(
      `${import.meta.env.VITE_ENDPOINT_BOOK}${tripId}`,
      payload,
      httpConfig(token)
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

const putUpdateBooking = async (bookId, payload) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.put(
      `${import.meta.env.VITE_ENDPOINT_BOOK}${bookId}`,
      payload,
      httpConfig(token)
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

const deleteBooking = async (bookId) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.delete(
      `${import.meta.env.VITE_ENDPOINT_BOOK}${bookId}`,
      httpConfig(token)
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};
export { postCreateBooking, putUpdateBooking, deleteBooking };
