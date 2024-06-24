import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useRoom from "../hooks/useRoom";
import createNotification from "../services/NotificationService";

const UserInfoForRoom = ({ handleSetRoomDetailsOpen, details, userId }) => {
  const { getUserInfo } = useAuth();
  const { doRoomUnnasign } = useRoom();
  const [isOpen, setIsOpen] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState({});

  const toggleAccordion = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const data = await getUserInfo(userId);
      setLocalUserInfo(data);
    }
    handleSetRoomDetailsOpen(isOpen);
  };

  const handleUnnasign = async (e) => {
    e.preventDefault();
    handleSetRoomDetailsOpen(isOpen);
    setLocalUserInfo({});
    await doRoomUnnasign(details.bookingId, userId, details.id);
    createNotification("success", "Habitacion desasignada con exito");
  };

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-end justify-start w-full">
      <div className="flex">
        {isOpen && (
          <button
            onClick={handleUnnasign}
            className="px-4 text-red-600 rounded-lg text-md py--1 hover:underline hover:text-red-400"
          >
            Desasignar
          </button>
        )}
        <button
          className="flex items-center px-5 py-1 rounded-lg"
          onClick={toggleAccordion}
        >
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#088395"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#088395"
            >
              <path d="M200-440v-80h560v80H200Z" />
            </svg>
          )}{" "}
        </button>
      </div>
      <div
        className={` w-full overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex-1 w-full p-4 align-bottom " id={details.id}>
          <div className="flex gap-5">
            <div className="mb-1">
              <p className="text-xs text-gray-400 ">Nombre</p>
              <p className="text-md" style={{ color: "var(--primary)" }}>
                {details.name}
              </p>
            </div>
            <div className="mb-1">
              <p className="text-xs text-gray-400">Descripcion</p>
              <p className="text-sm text-gray-600">{details.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="mb-1">
              <p className="text-xs text-gray-400">Pasajero</p>
              <p className="text-md" style={{ color: "var(--primary)" }}>
                {localUserInfo?.name}
              </p>
            </div>
            <div className="mb-1">
              <p className="text-xs text-gray-400">Telefono</p>
              <p className="text-sm">
                {localUserInfo.phone ? localUserInfo.phone : "331-473-2348"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForRoom;
