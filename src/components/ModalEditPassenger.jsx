import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import usePassenger from "../hooks/usePassenger";
import useTrip from "../hooks/useTrip";
import Loader from "./Loader";

const ModalEditPassenger = ({ ticketId, isOpen, user }) => {
  const { seatsList, doUpdatePassenger } = usePassenger();
  const { singleTrip, setNotificationObj } = useTrip();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [seatSelected, setSeatSelected] = useState(0);
  const [loadeState, setLoaderState] = useState("hidden");

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleSave = async () => {
    if (user.seat !== seatSelected) {
      user.seat = Number(seatSelected);
      console.log("updating passenger... ", user);
      setLoaderState("block");
      await doUpdatePassenger({
        ticketId,
        tripId: singleTrip?._id,
        seat: seatSelected,
        userId: user._id,
      });
      setLoaderState("hidden");
      setIsOpenModal(false);
      setNotificationObj({
        type: "success",
        message: "Se cambio el asiento del pasajero",
      });
      return;
    }
    console.log("nothing happens");
    setIsOpenModal(false);
  };

  useEffect(() => {
    setIsOpenModal(isOpen);
    setSeatSelected(user?.seat);
  }, [isOpen]);
  return (
    <div>
      <Modal isOpen={isOpenModal} onClose={handleClose}>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <h1 className="text-xl" style={{ color: "var(--primary)" }}>
            Editar Pasajero
          </h1>
          <button onClick={handleClose}>
            <p className="text-red-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </p>
          </button>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex gap-2 py-3">
            <div className="flex p-3 text-white bg-gray-400 rounded-full">
              <p>{user?.name.split(" ")[0].charAt(0)}</p>
              <p>{user?.name.split(" ")[1].charAt(0)}</p>
            </div>
            <div className="flex flex-col items-start">
              <p className="" style={{ color: "var(--primary)" }}>
                {user?.name}
                <span className="px-2 py-1 ml-3 text-xs text-green-800 bg-green-300 rounded-full">
                  {user?.role === "passenger" ? "pasajero" : ""}
                </span>
              </p>
              <p>Asiento Actual: {user?.seat}</p>
            </div>
          </div>

          <div>
            <select
              name="seat"
              id="seat"
              onChange={(e) => setSeatSelected(e.target.value)}
              className="px-2 text-center border-teal-700 rounded-lg"
            >
              <option value={seatSelected}>{seatSelected}</option>
              {seatsList?.map((seat) => (
                <option key={seat} value={seat}>
                  {seat}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loadeState == "block" && (
          <div className="flex items-center justify-center pb-16 ">
            <Loader state={loadeState} />
          </div>
        )}

        <div className="flex w-full text-white">
          <button
            className="w-full py-3 rounded"
            id="loginbtn"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalEditPassenger;
