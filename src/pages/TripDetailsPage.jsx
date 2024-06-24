import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTrip from "../hooks/useTrip";
import Alert from "../components/Alert";
import {
  currencyFormat,
  dateFormat,
  extractSeats,
  verifyObjectEmpty,
} from "../utilities";
import BookingModule from "../components/BookingModule";
import PassengerComponent from "../components/PassengerComponent";
import Modal from "../components/Modal";
import SearchUser from "../components/SearchUser";
import useRoom from "../hooks/useRoom";
import usePassenger from "../hooks/usePassenger";
import Loader from "../components/Loader";
import UserDetailsComponent from "../components/UserDetailsComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createNotification from "../services/NotificationService";
import ModalBooking from "../components/ModalBooking";
import ItineraryModule from "../components/Itinerary/ItineraryModule";
const TripDetailsPage = () => {
  const { id } = useParams();
  const {
    errorType,
    errorObject,
    doGetTrip,
    singleTrip,
    displayAlert,
    notificationObject,
    setNotificationObj,
  } = useTrip();
  const { userIdForAsignment, searchResultList, setUserIdForAsignment } =
    useRoom();
  const {
    notifyPassengerIsSelected,
    doAddPassengerToTrip,
    seatsList,
    setSeatsList,
  } = usePassenger();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBookingOpen, setIsModalBookingOpen] = useState(false);
  const [userSelect, setUserSelect] = useState({});
  const [seatSelected, setSeatSelected] = useState("0");
  const [loader, setLoader] = useState("hidden");
  const [modalBookingFormat, setModalBookingFormat] = useState("new");
  const [bookingSelected, setBookingSelected] = useState({});

  const closeModal = (e) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
    setUserSelect({});
    setUserIdForAsignment("");
    notifyPassengerIsSelected(false);
  };

  const addPassenger = async () => {
    if (userSelect.length > 0) {
      if (seatSelected === "0") {
        displayAlert("error", {
          message: "El asiento no es valido",
        });
      } else {
        setLoader("block");
        await doAddPassengerToTrip(
          userSelect[0]._id,
          singleTrip._id,
          seatSelected
        );
        setLoader("hidden");
        notifyPassengerIsSelected(true);
        setIsModalOpen(!isModalOpen);
        setUserSelect({});
        setUserIdForAsignment("");
        notifyPassengerIsSelected(false);
        createNotification("success", "Pasajero agregado con exito");
      }
    } else {
      displayAlert("error", {
        message: "No se ha seleccionado ningun usuario",
      });
    }
  };

  const addBooking = async () => {
    if (singleTrip.booking.length < 4) {
      setIsModalBookingOpen(!isModalBookingOpen);
      return;
    }
    createNotification("error", "No se pueden agregar mas alojamientos");
  };

  const editBooking = async (bookingId) => {
    const singlebook = await verifyModifyAvailability(bookingId);
    if (singlebook) {
      setBookingSelected(singlebook);
      setIsModalBookingOpen(!isModalBookingOpen);
      setModalBookingFormat("edit");
    }
  };

  const deleteBooking = async (bookingId) => {
    const singlebook = await verifyModifyAvailability(bookingId);
    if (singlebook) {
      setBookingSelected(singlebook);
      setIsModalBookingOpen(!isModalBookingOpen);
      setModalBookingFormat("delete");
    }
  };

  const verifyModifyAvailability = (bookingId) => {
    const singlebook = singleTrip.booking.find(
      (book) => book._id === bookingId
    );
    if (singlebook.rooms.length > 0) {
      createNotification(
        "error",
        "Esta accion no esta permitida porque el alojamiento tiene habitaciones creadas"
      );
      return false;
    }
    return singlebook;
  };

  const verifySeatAvailable = () => {
    if (singleTrip?.passengers?.length === singleTrip?.seats) {
      toast.error("Ya no hay asientos disponibles", {
        autoClose: 3000,
      });
      return;
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    doGetTrip(id);
  }, []);

  useEffect(() => {
    if (JSON.stringify(notificationObject) !== "{}") {
      createNotification(notificationObject?.type, notificationObject?.message);
      setNotificationObj({});
    }
  }, [notificationObject]);
  useEffect(() => {
    if (userIdForAsignment !== "") {
      const userFiltered = searchResultList.filter(
        (res) => res._id === userIdForAsignment
      );
      setUserSelect(userFiltered);
    }
  }, [userIdForAsignment]);

  useEffect(() => {
    let numbersFiltered;
    if (singleTrip.seats > 0) {
      const numbers = Array.from(
        { length: singleTrip.seats - 1 + 1 },
        (_, i) => 1 + i
      );
      const passengerSeats = extractSeats(singleTrip.passengers);
      numbersFiltered = numbers.filter(
        (item) => !passengerSeats.includes(item)
      );
    }
    setSeatsList(numbersFiltered);
  }, [singleTrip, userIdForAsignment]);

  return (
    <div className="w-full md:px-3">
      <ToastContainer />
      {errorObject?.message && (
        <div className="absolute">
          <Alert type={errorType} error={errorObject} />
        </div>
      )}
      <div className="flex gap-4">
        <div className=" hidden md:block h-52 w-4/12  p-5 bg-cover bg-center bg-[url('https://i.pinimg.com/564x/06/ae/ce/06aecee5c98dacaf993549b45cd8b334.jpg')]"></div>
        <div className="w-full md:w-8/12">
          <div className="flex flex-col justify-between mb-2 md:flex-row md:mb-0">
            <h1
              className="text-3xl font-bold font-lato"
              style={{ color: "var(--dark)" }}
            >
              {singleTrip?.name}
            </h1>
            <div className="flex items-center">
              <p
                className={` mt-2 px-4 py-1 text-sm font-bold rounded-full ${
                  singleTrip?.status === "created"
                    ? "text-gray-600 bg-gray-300"
                    : singleTrip?.status === "running"
                    ? "text-green-600 bg-green-300"
                    : singleTrip?.status === "finished"
                    ? "text-teal-600 bg-teal-300"
                    : singleTrip?.status === "suspended"
                    ? "text-orange-600 bg-orange-300"
                    : singleTrip?.status === "canceled" &&
                      "text-red-600 bg-red-300"
                }`}
              >
                {singleTrip?.status === "created"
                  ? "creado"
                  : singleTrip?.status === "running"
                  ? "en proceso"
                  : singleTrip?.status === "finished"
                  ? "terminado"
                  : singleTrip?.status === "suspended"
                  ? "suspendido"
                  : singleTrip?.status === "canceled" && "cancelado"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <span style={{ color: "var(--ligth)" }}>
              {dateFormat(singleTrip?.startLocation?.date)}
            </span>
            <p className="hidden text-3xl md:block">-</p>
            <span style={{ color: "var(--primary)" }}>
              {dateFormat(singleTrip?.endLocation?.date)}
            </span>
          </div>
          <div className="flex flex-col gap-3 my-3 lg:flex-row">
            <div className="flex gap-4 ">
              <p className="p-2 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  viewBox="0 -960 960 960"
                  width="25px"
                  fill="#088395"
                >
                  <path d="M120-120v-80h720v80H120Zm74-200L80-514l62-12 70 62 192-52-162-274 78-24 274 246 200-54q32-9 58 12t26 56q0 22-13.5 39T830-492L194-320Z" />
                </svg>
              </p>
              <div>
                <p className="text-xs text-gray-400">Origen</p>
                <p> {singleTrip?.startLocation?.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="p-2 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#088395"
                >
                  <path d="M754-324 120-500v-220l60 20 28 84 192 54v-318l80 20 110 350 200 56q23 6 36.5 24.5T840-388q0 33-27 53t-59 11ZM120-120v-80h720v80H120Z" />
                </svg>
              </p>
              <div>
                <p className="text-xs text-gray-400">Destino</p>
                <p> {singleTrip?.endLocation?.address}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:gap-12 md:flex-row">
            <div className="flex gap-4 pb-7 ">
              <p className="p-2 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#088395"
                >
                  <path d="M340-720q-33 0-56.5-23.5T260-800q0-33 23.5-56.5T340-880q33 0 56.5 23.5T420-800q0 33-23.5 56.5T340-720Zm220 560H302q-33 0-60.5-23.5T207-240l-87-440h82l88 440h270v80Zm220 80L664-280H386q-29 0-50.5-17.5T308-344l-44-214q-11-48 22.5-85t81.5-37q35 0 63.5 21t36.5 57l44 202h130q21 0 39 11t29 29l140 240-70 40Z" />
                </svg>
              </p>
              <div>
                <p className="text-xs text-gray-400">Asientos</p>
                <p className="pl-3"> {singleTrip?.seats}</p>
              </div>
            </div>
            <div className="w-5/12 px-6 py-2 bg-gray-100 rounded-lg xs:w-3/12 sm:w-5/12 md:w-auto ">
              <p className="text-xs font-bold">Precio</p>
              <p className="px-6 text-3xl font-bold text-green-800 rounded-full ">
                {singleTrip?.price
                  ? currencyFormat(singleTrip?.price)
                  : "$1400"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-5 my-5 border-b-2">
        <p className="text-xs text-gray-400">Descripcion</p>
        <p className="">{singleTrip?.description || "No hay descripcion"}</p>
      </div>
      <div className="gap-4 mt-5 ">
        <div className="flex flex-col justify-between w-full mt-5 lg:flex-row md:gap-4 ">
          <div
            className="w-full p-2 mt-5 border-b-2"
            style={{
              color: "var(--primaryDark)",
              borderColor: "var(--contrast)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h1 className="mb-5 text-2xl">{`Pasajeros (${singleTrip?.passengers?.length})`}</h1>
              <button
                id="loginbtn"
                onClick={verifySeatAvailable}
                className="flex items-center gap-2 px-5 py-4 text-white rounded-lg"
              >
                <p>Agregar Pasajero</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                </svg>
              </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div>
                <div className="flex justify-between pb-2 border-b-2">
                  <h1 className="text-xl" style={{ color: "var(--primary)" }}>
                    Agregar Pasajero
                  </h1>
                  <button onClick={closeModal}>
                    <p className="text-red-500 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </p>
                  </button>
                </div>
                {userSelect[0]?.name ? (
                  <div className="flex items-center justify-between gap-4 p-2 mt-5 mb-2">
                    <div className="flex">
                      <div className="flex p-3 text-white bg-gray-400 rounded-full">
                        <p>{userSelect[0].name.split(" ")[0].charAt(0)}</p>
                        <p>{userSelect[0].name.split(" ")[1].charAt(0)}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="" style={{ color: "var(--primary)" }}>
                          {userSelect[0].name}
                          <span className="px-2 py-1 ml-3 text-xs text-green-800 bg-green-300 rounded-full">
                            {userSelect[0].role === "passenger"
                              ? "pasajero"
                              : ""}
                          </span>
                        </p>
                        <p className="text-sm text-gray-400">
                          {userSelect[0].email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-xs text-gray-400">Asiento</p>
                      {seatsList?.length > 0 ? (
                        <select
                          name="seat"
                          id="seat"
                          onChange={(e) => setSeatSelected(e.target.value)}
                          className="px-2 text-center border-teal-700 rounded-lg"
                        >
                          <option value={0} selected>
                            0
                          </option>
                          {seatsList.map((seat) => (
                            <option value={seat}>{seat}</option>
                          ))}
                        </select>
                      ) : (
                        <p>No hay asientos disponibles</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="my-5 ">
                    <p className="pl-3 text-gray-300">
                      No se ha seleccionado aun
                    </p>
                  </div>
                )}
                <SearchUser />
                {errorObject?.message && (
                  <Alert type={errorType} error={errorObject} />
                )}
                <div className="flex flex-col w-full mt-5">
                  {loader === "block" && (
                    <div className="pb-10 mb-5">
                      <Loader state={loader} />
                    </div>
                  )}

                  <button
                    onClick={addPassenger}
                    className="w-full py-3 text-lg text-white rounded-lg"
                    id="loginbtn"
                  >
                    Agregar Pasajero
                  </button>
                </div>
              </div>
            </Modal>

            <div
              style={{ maxHeight: "500px" }}
              className="grid h-auto grid-flow-row gap-4 mb-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-1"
            >
              {singleTrip?.passengers?.length > 0 ? (
                singleTrip?.passengers.map((passenger) => (
                  <UserDetailsComponent
                    key={passenger._id}
                    ticket={passenger}
                  />
                ))
              ) : (
                <p className="text-lg " style={{ color: "var(--primary)" }}>
                  No hay pasajeros en este viaje
                </p>
              )}
            </div>
          </div>
          <div
            className="w-full p-2 mt-5 border-b-2 "
            style={{ color: "var(--dark)", borderColor: "var(--contrast)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h1 className="mb-3 text-2xl">
                Hospedaje({singleTrip?.booking?.length})
              </h1>
              <button
                id="outlinebtn"
                onClick={addBooking}
                className="flex items-center gap-2 px-4 py-3 border-2 rounded-lg "
              >
                <p>Agregar Hospedaje</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <ModalBooking
              isOpen={isModalBookingOpen}
              onClose={setIsModalBookingOpen}
              tripId={singleTrip._id}
              format={modalBookingFormat}
              book={bookingSelected}
            />
            {singleTrip?.booking?.length > 0 ? (
              singleTrip?.booking.map((book) => (
                <div
                  key={book._id}
                  className="justify-between border-b-2 mt-7 last-of-type:border-none"
                >
                  <div className="flex justify-between gap-6 pb-2 md:flex-row">
                    <div className="flex justify-between w-full">
                      <div className="flex gap-5">
                        <div className="mb-1">
                          <p className="text-sm text-gray-400">Nombre</p>
                          <p className="pl-2">{book.name}</p>
                        </div>
                        <div className="mb-1">
                          <p className="text-sm text-gray-400">Direccion</p>
                          <p className="pl-2">{book.address}</p>
                        </div>
                      </div>
                      <div className="flex ">
                        <button
                          onClick={(e) => editBooking(book._id)}
                          className="flex items-center gap-2 px-3 py-1 text-blue-600 rounded-lg md:p-1 hover:bg-blue-600 hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => deleteBooking(book._id)}
                          className="flex items-center gap-2 px-3 py-1 text-red-500 rounded-lg md:p-1 hover:bg-red-500 hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <BookingModule booking={book} />
                </div>
              ))
            ) : (
              <p style={{ color: "var(--primary)" }}>
                No hay informacion de Hospedaje
              </p>
            )}
          </div>
        </div>
        <div
          className="w-full p-2 mt-5 text-2xl border-b-2"
          style={{ color: "var(--dark)", borderColor: "var(--contrast)" }}
        >
          <ItineraryModule />
        </div>
        <div
          className="w-full p-2 mt-5 text-2xl "
          style={{ color: "var(--dark)" }}
        >
          Bitacora
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
