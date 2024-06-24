import { errorResponseObject } from "../utilities";
import axiosClient, {
  getTokenFromSessionStoreage,
  httpConfig,
} from "../utilities/AxiosClient";

const getAllUserDetailsByNameAndEmail = async (stringParam) => {
  const token = getTokenFromSessionStoreage();
  console.log(token);
  try {
    const { data } = await axiosClient.post(
      `${import.meta.env.VITE_ENDPOINT_USER_DETAILS}`,
      { name: stringParam },
      httpConfig(token)
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

const getAllUserDetailsByUserId = async (passengerArray) => {
  let userDetailsArray = [];
  const token = getTokenFromSessionStoreage();
  for (const user of passengerArray) {
    console.log(user.userId);
    try {
      const { data } = await axiosClient.get(
        `${import.meta.env.VITE_ENDPOINT_USER_DETAILS}${user.userId}`,
        httpConfig(token)
      );
      userDetailsArray.push(data);
    } catch (error) {
      console.log(error);
      return errorResponseObject(error);
    }
  }
  console.log(userDetailsArray);
  return userDetailsArray;
};

export { getAllUserDetailsByNameAndEmail, getAllUserDetailsByUserId };
