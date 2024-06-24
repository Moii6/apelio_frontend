import axiosClient from "../utilities/AxiosClient";

const postLogin = async (payload) => {
  try {
    const { data } = await axiosClient.post(
      `${import.meta.env.VITE_ENDPOINT_USER_LOGIN}`,
      payload
    );
    return data;
  } catch (error) {
    return errorResponseObject(error);
  }
};

const postSignin = async (payload) => {
  try {
    const { data } = await axiosClient.post(
      `${import.meta.env.VITE_ENDPOINT_USER_SIGNIN}`,
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

const getConfirmation = async (token) => {
  try {
    const { data } = await axiosClient.get(
      `${import.meta.env.VITE_ENDPOINT_USER_CONFIRMATION}/${token}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return errorResponseObject(error);
  }
};

const errorResponseObject = (error) => {
  console.log(error);
  return {
    status: error?.response?.status || 500,
    message:
      error?.response?.data?.message ||
      error?.response?.data?.msg ||
      error?.response?.statusText ||
      error?.name + " " + error?.message ||
      error,
  };
};

export { postLogin, postSignin, getConfirmation };
