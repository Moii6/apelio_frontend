import React, { useEffect, useState } from "react";
import { iconPlane } from "../utilities/icons";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";
import PageTitleSetter from "../components/PageTitleSetter";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logindata, loadingAuth } = useAuth();
  const navigate = useNavigate();

  const { errorObject, setErrorObject, errorType, setErrorType, doLogin } =
    useAuth();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      showAndClean("Todos los campos son necesarios");
      return;
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isValid.test(email)) {
      showAndClean("El email no tiene el formato correcto");
      return;
    }
    setEmail("");
    setPassword("");
    doLogin({
      email,
      password,
    });
  };
  const showAndClean = (message) => {
    setErrorType("error");
    setErrorObject({ message });
    setTimeout(() => {
      setErrorType("");
      setErrorObject({});
    }, 5000);
  };
  useEffect(() => {
    if (logindata.name) {
      navigate("app");
    }
  }, [logindata]);

  return (
    <>
      <PageTitleSetter title="Inicia Sesion" />
      <div
        className="flex flex-col h-screen"
        style={{ backgroundColor: "var(--contrast)" }}
      >
        <h1
          className="px-5 py-3 text-3xl font-bold h-2/12"
          style={{ color: "var(--primary)" }}
        >
          Apelio <span className="text-sm text-gray-600">by Golden Hill</span>
        </h1>
        <div className="flex items-center justify-center h-full">
          <div className="flex justify-center w-full mx-5 bg-white rounded-lg xs:w-10/12 lg:w-5/12">
            <div
              className="justify-center hidden w-5/12 rounded-l-lg sm:block"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <div className="flex justify-center h-full">
                <div className="flex items-center justify-center">
                  <h1 className="pl-5 text-5xl font-bold text-white">
                    travel with us
                  </h1>
                  <div className="px-3 text-white">{iconPlane}</div>
                </div>
              </div>
            </div>
            <div className={`justify-center w-full sm:w-7/12 px-10`}>
              <form className="justify-center w-full" action="">
                <h1
                  className="my-10 text-4xl font-bold text-center"
                  style={{ color: "var(--primary)" }}
                >
                  Log in into Apelio
                </h1>
                <p className="mb-3 text-center text-gray-400">
                  <a href="/signIn" className="text-blue-600 underline">
                    or create an account
                  </a>
                </p>
                <div className="relative mb-10">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="email-address-icon"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                    placeholder="account@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative mb-10">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-gray-500 dark:text-gray-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password-address-icon"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full ps-10 p-2.5  "
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  {loadingAuth && <Loader />}
                </div>
                {errorObject?.message && (
                  <Alert type={errorType} error={errorObject} />
                )}

                <div className="flex justify-center pt-5 text-center">
                  <a href="" className="text-blue-600 underline">
                    Forgot Password
                  </a>
                </div>

                <div className="mb-10 mt-14">
                  <a>
                    <button
                      onClick={handleSignIn}
                      type="button"
                      id="loginbtn"
                      className={`w-full text-white font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 focus:ring-teal-500 focus:border-teal-500 `}
                    >
                      Sign In
                    </button>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
