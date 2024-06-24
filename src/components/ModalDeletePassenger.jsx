import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import useTrip from "../hooks/useTrip";
import usePassenger from "../hooks/usePassenger";
import Loader from "./Loader";

const ModalDeletePassenger = ({ ticketId, isOpen, user }) => {
  const { singleTrip, setNotificationObj } = useTrip();
  const { doDeletePassenger, verifyPassengerAttachedToRoom } = usePassenger();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loadeState, setLoaderState] = useState("hidden");

  const handleClose = () => {
    setIsOpenModal(false);
  };
  const handleDelete = async () => {
    const isAttached = await verifyPassengerAttachedToRoom(user._id);
    if (isAttached) {
      setNotificationObj({
        type: "error",
        message: "El usuario tiene una habitacion asignada",
      });
      return;
    }
    setLoaderState("block");
    await doDeletePassenger({ ticketId, tripId: singleTrip?._id });
    setLoaderState("hidden");
    setIsOpenModal(false);
    setNotificationObj({ type: "success", message: "Se elimino el pasajero" });
  };

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);
  return (
    <div>
      <Modal isOpen={isOpenModal} onClose={handleClose}>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <h1 className="text-xl " style={{ color: "var(--primary)" }}>
            Eliminar Pasajero
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
        <div className="flex items-center justify-between pt-3 ">
          <div className="flex items-center justify-between w-full pt-3 ">
            <div className="flex w-full gap-2 py-3">
              <div className="flex p-3 text-white bg-gray-400 rounded-full">
                <p>{user?.name.split(" ")[0].charAt(0)}</p>
                <p>{user?.name.split(" ")[1].charAt(0)}</p>
              </div>
              <div className="w-full">
                <div className="flex items-start justify-between w-full ">
                  <p className="" style={{ color: "var(--primary)" }}>
                    {user?.name}
                  </p>
                  <span className="px-2 py-1 ml-3 text-xs text-green-800 bg-green-300 rounded-full">
                    {user?.role === "passenger" ? "pasajero" : ""}
                  </span>
                </div>
                <p>Asiento: {user?.seat}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="flex items-center py-2 text-amber-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          Esta accion no se puede revertir
        </p>
        {loadeState == "block" && (
          <div className="flex items-center justify-center pb-16 ">
            <Loader state={loadeState} />
          </div>
        )}
        <div className="flex w-full text-white">
          <button
            className="w-full py-3 rounded "
            id="deletebtn"
            onClick={handleDelete}
          >
            Eliminar Pasajero
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDeletePassenger;
