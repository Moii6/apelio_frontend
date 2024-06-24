import { errorResponseObject } from "../utilities";
import axiosClient, {
  getTokenFromSessionStoreage,
  httpConfig,
} from "../utilities/AxiosClient";

const getAllTrips = async () => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.get(
      `${import.meta.env.VITE_ENDPOINT_TRIP_ALLTRIP}`,
      httpConfig(token)
    );

    return data;
  } catch (error) {
    return errorResponseObject(error);
  }
};
const getTrip = async (id) => {
  const token = getTokenFromSessionStoreage();
  try {
    const { data } = await axiosClient.get(
      `${import.meta.env.VITE_ENDPOINT_TRIP_ALLTRIP}${id}`,
      httpConfig(token)
    );

    return data;
  } catch (error) {
    return errorResponseObject(error);
  }
};
export { getAllTrips, getTrip };
