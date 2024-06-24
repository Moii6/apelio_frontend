import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Header = () => {
  const location = useLocation();
  const { logindata, closeSession } = useAuth();
  const handleCerrarSesion = (e) => {
    e.preventDefault();
    closeSession();
  };
  return (
    <nav className="w-full px-5 bg-white border-gray-200 sm:px-0">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <a
          href="/app"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            className="self-center text-2xl font-semibold whitespace-nowrap "
            style={{ color: "var(--primary)" }}
          >
            Apelio
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
            style={{ color: "var(--primary)" }}
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </a>
        <span className="text-xl md:hidden">
          {location.pathname === "/app"
            ? "Inicio"
            : location.pathname === "/app/trip"
            ? "Viajes"
            : location.pathname === "/app/ticket"
            ? "Boletos"
            : location.pathname === "/app/createtrip"
            ? "Nuevo Viaje"
            : location.pathname === "/app/myprofile"
            ? "Mi Perfil"
            : location.pathname === "/app/configuration" && "Configuracion"}
        </span>
        <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <div className="flex items-center px-1 py-1 text-lg text-white bg-gray-500 rounded-full">
              <p>
                {logindata.name.split(" ")[0].charAt(0)}
                {logindata.name.split(" ")[1].charAt(0)}
              </p>
            </div>
          </button>
          {/**Dropdown menu */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {logindata.name}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {logindata.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to={"/app/myprofile"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link
                  to={"/app/configuration"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Configuracion
                </Link>
              </li>
              <li>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                  <button onClick={handleCerrarSesion}>Cerrar Sesion</button>
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                className="block px-3 py-2 text-lg sm:hover:bg-teal-500 sm:rounded-md sm:hover:text-white md:hover:text-teal-500 md:hover:bg-transparent"
                to={"/app"}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-lg sm:hover:bg-teal-500 sm:rounded-md sm:hover:text-white md:hover:text-teal-500 md:hover:bg-transparent"
                to={"/app/trip"}
              >
                Viajes
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-lg sm:hover:bg-teal-500 sm:rounded-md sm:hover:text-white md:hover:text-teal-500 md:hover:bg-transparent"
                to={"/app/ticket"}
              >
                Boletos
              </Link>
            </li>
            <li className="items-center block">
              <Link
                className="flex items-center gap-2 px-3 py-2 text-lg sm:hover:bg-teal-500 sm:rounded-md sm:hover:text-white md:hover:text-teal-500 md:hover:bg-transparent"
                to={"/app/createtrip"}
              >
                Nuevo Viaje
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
