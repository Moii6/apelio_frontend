import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
const ProtectedRoute = () => {
  const { logindata, loadingAuth } = useAuth();
  const navigate = useNavigate();

  if (loadingAuth)
    return (
      <div className="container flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <>
      {logindata?._id ? (
        <div className="flex justify-center h-screen bg-white">
          <div className="flex flex-col items-center w-full md:w-10/12 xl:w-8/12 2xl:w-6/12">
            <Header />
            <div className="flex flex-col w-full gap-4 px-5 md:px-0">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default ProtectedRoute;
