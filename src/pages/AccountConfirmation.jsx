import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";
const AccountConfirmation = () => {
  const { token } = useParams();
  const { doConfirmation, errorObject, errorType } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    doConfirmation(token);
  };
  return (
    <div>
      <h1
        className="px-5 py-3 text-3xl font-bold h-2/12"
        style={{ color: "var(--primary)" }}
      >
        Apelio <span className="text-sm text-gray-600">by Golden Hill</span>
      </h1>
      <div className="flex flex-col items-center w-full gap-3 pt-20 ">
        <div className="flex items-center justify-center w-8/12">
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--primary)" }}
          >
            Haz click en el boton para confirmar tu cuenta
          </h1>
        </div>

        <div className="flex flex-col items-center gap-3">
          {errorObject?.message && (
            <Alert type={errorType} error={errorObject} />
          )}
          <button
            type="button"
            id="loginbtn"
            onClick={handleSubmit}
            className={`w-full text-white font-medium rounded-lg text-md px-20 py-3 me-2 mb-2 focus:ring-teal-500 focus:border-teal-500 `}
          >
            Confirmar mi cuenta
          </button>
          <a
            href="/"
            className="text-sm text-blue-400 underline hover:text-blue-600"
          >
            Iniciar Sesion
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountConfirmation;
