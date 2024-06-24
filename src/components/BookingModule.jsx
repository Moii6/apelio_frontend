import React, { useEffect, useState } from "react";
import useTrip from "../hooks/useTrip";
import useRoom from "../hooks/useRoom";
import RoomComponent from "./RoomComponent";
import ModalRoom from "./ModalRoom";
const BookingModule = ({ booking }) => {
  const { doGetRooms, roomsList } = useTrip();
  const { doCreateNewRoom } = useRoom();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsOpenModal] = useState(false);

  const [isPressed, setIsPressed] = useState(false);

  const handleAddRoom = () => {
    setIsOpenModal(true);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsPressed(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsPressed(false);
    }
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      doGetRooms(booking._id);
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {}, []);
  return (
    <div className="h-auto mb-4 overflow-y-auto border border-gray-200 rounded">
      <button
        className={`flex items-center justify-between w-full px-4 py-2 font-medium text-left transition duration-300 ${
          isOpen && "rounded-t-lg"
        }`}
        style={
          isOpen
            ? { backgroundColor: "var(--primary)", color: "white" }
            : {
                backgroundColor: "rgb(243 244 246 / var(--tw-bg-opacity)",
                color: "var(--primary)",
              }
        }
        onClick={toggleAccordion}
      >
        <p>Habitaciones</p>
        {!isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="#088395"
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="#ffff"
          >
            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
          </svg>
        )}
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div
          className="flex flex-col p-4 overflow-y-auto bg-gray-100 "
          style={{ maxHeight: "500px" }}
        >
          <div className="flex items-center mb-5">
            <button
              className={`px-4 py-2 rounded ${
                isPressed ? "bg-teal-800 " : "bg-teal-600"
              } text-white border-2 focus:outline-none focus:ring-2 focus:ring-teal-300`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onClick={handleAddRoom}
            >
              Agregar habitacion
            </button>
          </div>
          <ul>
            {roomsList?.length > 0 ? (
              roomsList?.map((room) => (
                <RoomComponent
                  key={room._id}
                  bookingId={booking._id}
                  room={room}
                />
              ))
            ) : (
              <p>No hay Habitaciones en este alojamiento</p>
            )}
          </ul>
        </div>
      </div>
      <ModalRoom
        type={"new"}
        isOpen={isModalOpen}
        onClose={closeModal}
        bookingName={booking.name}
        bookingId={booking._id}
      />
    </div>
  );
};

export default BookingModule;
