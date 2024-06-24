import React, { createContext, useEffect, useState } from "react";
import {
  getConfirmation,
  postLogin,
  postSignin,
} from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { getUserForRoom } from "../services/RoomService";
import { feedData, feedLogin } from "../utilities";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [logindata, setLoginData] = useState({});
  const [errorObject, setErrorObject] = useState({});
  const [errorType, setErrorType] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  const doLogin = async (payload) => {
    const data = await postLogin(payload);
    if (data?._id) {
      delete data.updatedAt;
      setLoginData(data);
      sessionStorage.setItem("user", JSON.stringify(data));
      setLoadingAuth(true);
      setTimeout(() => {
        setLoadingAuth(false);
        navigate("/app");
      }, 2000);
    } else {
      setErrorObject(data);
      setTimeout(() => {
        setErrorObject({});
      }, 5000);
    }
  };
  const doSignin = async (payload) => {
    const data = await postSignin(payload);
    if (data?._id) {
      setErrorType("success");
      setErrorObject({
        message: "Account created!, go to your email to check next steps",
      });
      setTimeout(() => {
        setErrorType("");
        setErrorObject({});
      }, 10000);
    }
  };

  const doConfirmation = async (token) => {
    const data = await getConfirmation(token);
    if (data.status === 200) {
      setErrorType("success");
      setErrorObject({
        status: data.status,
        message: "Ya puedes usar tu cuenta, ahora inicia sesion",
      });
    } else {
      setErrorType("error");
      setErrorObject(data);
      setTimeout(() => {
        setErrorType("");
        setErrorObject({});
      }, 5000);
    }
  };

  const closeSession = () => {
    sessionStorage.setItem("user", "");
    setLoginData({});
    navigate("/");
  };
  const getUserInfo = async (id) => {
    const data = await getUserForRoom(id);
    if (data.name) {
      return data;
    }
    return {};
  };

  useEffect(() => {
    setLoadingAuth(true);
    const credentials = sessionStorage.getItem("user");
    if (credentials) {
      setLoginData(JSON.parse(credentials));
    }
    setLoadingAuth(false);
    const feedUSers = async () => {
      for (const user of feedData) {
        const data = await postSignin(user);
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 5000);
        });
      }
    };
    //feedUSers();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        errorObject,
        errorType,
        loadingAuth,
        logindata,
        setErrorType,
        setErrorObject,
        doLogin,
        doSignin,
        doConfirmation,
        closeSession,
        getUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
