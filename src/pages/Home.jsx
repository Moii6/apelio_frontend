import React, { useEffect, useState } from "react";
import useTrip from "../hooks/useTrip";
import Alert from "../components/Alert";
import {
  dateFormat,
  lastTripDifferentThanCreated,
  orderTripsByStartDate,
  verifyObjectEmpty,
} from "../utilities";
import { Link } from "react-router-dom";
const Home = () => {
  const { errorType, errorObject, doAllTrips, allTripsList } = useTrip();
  const [diffCreatedList, setDiffCreatedList] = useState([]);

  useEffect(() => {
    doAllTrips();
  }, []);
  useEffect(() => {
    if (JSON.stringify(allTripsList) !== "{}")
      setDiffCreatedList(lastTripDifferentThanCreated(allTripsList));
    orderTripsByStartDate(diffCreatedList);
  }, [allTripsList]);
  return (
    <div>
      {errorObject?.message && <Alert type={errorType} error={errorObject} />}
      <div className="flex flex-col w-full gap-4 sm:flex-row">
        <div
          className="p-5 border-2 rounded-md shadow sm:w-7/12"
          style={{ borderColor: "var(--primary)", backgroundColor: "white" }}
        >
          <div className="flex flex-col" id>
            <div className="flex flex-col items-center justify-between w-full sm:flex-row">
              <h1 className="text-3xl">
                <Link to={`trip/${allTripsList[0]?._id}`}>
                  {allTripsList?.length > 0
                    ? allTripsList[0]?.name
                    : "No hay Datos"}
                </Link>
              </h1>
              <div>
                <p className="pl-3 text-end text-md">
                  {dateFormat(allTripsList[0]?.startLocation.date || "")}
                </p>
                <div className="flex justify-end">
                  <p
                    className={`px-4 py-1 text-sm rounded-full ${
                      allTripsList[0]?.status === "created"
                        ? "text-gray-600 bg-gray-300"
                        : allTripsList[0]?.status === "running"
                        ? "text-green-600 bg-green-300"
                        : allTripsList[0]?.status === "finished"
                        ? "text-teal-600 bg-teal-300"
                        : allTripsList[0]?.status === "suspended"
                        ? "text-orange-600 bg-orange-300"
                        : allTripsList[0]?.status === "canceled" &&
                          "text-red-600 bg-red-300"
                    }`}
                  >
                    {allTripsList[0]?.status === "created"
                      ? "creado"
                      : allTripsList[0]?.status === "running"
                      ? "en proceso"
                      : allTripsList[0]?.status === "finished"
                      ? "terminado"
                      : allTripsList[0]?.status === "suspended"
                      ? "suspendido"
                      : allTripsList[0]?.status === "canceled" && "cancelado"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end w-full mt-5 sm:flex-row">
              <div
                className="flex items-center w-full gap-2 pr-5"
                style={{ color: "var(--primary)" }}
              >
                <p>{allTripsList[0]?.endLocation.address} </p>
              </div>
              <div
                className="flex items-center gap-1 pr-5"
                data-tooltip-target="tooltip-default"
              >
                {allTripsList?.length > 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="35px"
                    viewBox="0 -960 960 960"
                    width="35px"
                    fill="#088395"
                  >
                    <path d="M340-720q-33 0-56.5-23.5T260-800q0-33 23.5-56.5T340-880q33 0 56.5 23.5T420-800q0 33-23.5 56.5T340-720Zm220 560H302q-33 0-60.5-23.5T207-240l-87-440h82l88 440h270v80Zm220 80L664-280H386q-29 0-50.5-17.5T308-344l-44-214q-11-48 22.5-85t81.5-37q35 0 63.5 21t36.5 57l44 202h130q21 0 39 11t29 29l140 240-70 40Z" />
                  </svg>
                )}

                <p className="text-lg text-gray-800">
                  {allTripsList[0]?.passengers.length}
                </p>
              </div>
              <div
                id="tooltip-default"
                role="tooltip"
                style={{
                  color: "var(--contrast)",
                  background: "var(--primary)",
                }}
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip "
              >
                Pasajeros
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="p-5 rounded sm:w-5/12"
          style={{ color: "white", backgroundColor: "var(--primary)" }}
        >
          <h1 className="mb-3 text-3xl font-bold">
            {diffCreatedList?.length > 0
              ? diffCreatedList[0]?.name
              : "No hay viajes Previos"}
          </h1>
          <p className="mb-3 text-md">
            {diffCreatedList?.length > 0
              ? dateFormat(diffCreatedList[0]?.endLocation.date)
              : "-"}
          </p>
          <div className="flex">
            <div className="flex w-full gap-2 pr-5 text-gray-200">
              <p>
                {diffCreatedList?.length > 0
                  ? diffCreatedList[0]?.endLocation.address
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="p-5 pb-5 my-5 border-2 rounded-lg"
        style={{ borderColor: "var(--primary)" }}
      >
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Destino
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {allTripsList.length > 0 ? (
                allTripsList.slice(1).map((trip) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-50 "
                    key={trip?._id}
                    id={trip?._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {trip.name || ""}
                    </th>
                    <td className="px-6 py-4">
                      {dateFormat(trip.startLocation.date)}
                    </td>
                    <td className="px-6 py-4">{trip.endLocation.address}</td>
                    <td className="flex items-center gap-4 px-6 py-4 ">
                      <p
                        className={`px-4 py-1 text-sm rounded-full ${
                          trip[0]?.status === "created"
                            ? "text-gray-600 bg-gray-300"
                            : trip.status === "running"
                            ? "text-green-600 bg-green-300"
                            : trip.status === "finished"
                            ? "text-teal-600 bg-teal-300"
                            : trip.status === "suspended"
                            ? "text-orange-600 bg-orange-300"
                            : trip.status === "canceled" &&
                              "text-red-600 bg-red-300"
                        }`}
                      >
                        {trip.status === "created"
                          ? "creado"
                          : trip.status === "running"
                          ? "en proceso"
                          : trip.status === "finished"
                          ? "terminado"
                          : trip.status === "suspended"
                          ? "suspendido"
                          : trip.status === "canceled" && "cancelado"}
                      </p>
                      <Link
                        to={`trip/${trip._id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Ver mas
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b hover:bg-gray-50 ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    No hay datos
                  </th>
                </tr>
              )}
            </tbody>
          </table>
          <nav
            className="flex flex-wrap items-center justify-between pt-4 flex-column md:flex-row"
            aria-label="Table navigation"
          >
            <span className="block w-full mb-4 text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto">
              Showing <span className="font-semibold text-gray-900 ">1-10</span>{" "}
              of <span className="font-semibold text-gray-900 ">1000</span>
            </span>
            <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center h-8 px-3 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
