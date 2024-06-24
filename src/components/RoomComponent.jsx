import React, { useEffect, useState } from "react";
import UserInfoForRoom from "./UserInfoForRoom";
import ModalAssignRoom from "./Modal";
import SearchUser from "./SearchUser";
import useRoom from "../hooks/useRoom";
import Modal from "./Modal";
import ModalRoom from "./ModalRoom";
import createNotification from "../services/NotificationService";

const RoomComponent = ({ bookingId, room }) => {
  const {
    searchResultList,
    userIdForAsignment,
    setingUserForAssignment,
    doRoomAssign,
    isUnnasigned,
    setIsUnnasigned,
  } = useRoom();
  const [roomDetailsOpen, setRoomDetailsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRoomOpen, setIsModalRoomOpen] = useState(false);
  const [modalRoomType, setModalRoomType] = useState("");
  const [userSelect, setUserSelect] = useState({});

  const handleSetRoomDetailsOpen = (state) => {
    setRoomDetailsOpen(!state);
  };

  const handleEditRoom = () => {
    setModalRoomType("upd");
    setIsModalRoomOpen(true);
  };
  const handleDeleteRoom = () => {
    setModalRoomType("del");
    setIsModalRoomOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setingUserForAssignment("");
    setIsModalOpen(!isModalOpen);
  };
  const handleAssignUser = (e) => {
    e.preventDefault();
    doRoomAssign(bookingId, userIdForAsignment, room._id);
    setingUserForAssignment("");
    setIsModalOpen(false);
    createNotification("success", "Habitacion asignada con exito");
  };

  useEffect(() => {
    const userFiltered = searchResultList.filter(
      (res) => res._id === userIdForAsignment
    );
    setUserSelect(userFiltered);
  }, [userIdForAsignment]);

  useEffect(() => {
    console.log(bookingId);
    if (isUnnasigned) {
      setRoomDetailsOpen(false);
    }
  }, [isUnnasigned]);
  return (
    <div className={`${roomDetailsOpen && "bg-white p-2 mb-2 border-md"} `}>
      <div className="flex justify-between gap-2 my-5 border-b-2">
        <div className="flex flex-col mb-2" id={`${room._id}`}>
          <div className="flex gap-5 mb-3">
            <div className="">
              <p className="text-xs text-gray-400">numero</p>
              <p
                className={`${
                  roomDetailsOpen ? "text-2xl font-bold" : "text-lg font-normal"
                }  text-teal-700 text-center`}
              >
                {room.number}
              </p>
            </div>
            {!roomDetailsOpen && (
              <div>
                <p className="text-xs text-gray-400">Nombre</p>
                <p className="text-lg" style={{ color: "var(--primary)" }}>
                  {room.name}
                </p>
              </div>
            )}
          </div>
          {!roomDetailsOpen && (
            <div className="w-full">
              <p className="text-xs text-gray-400">Descripcion</p>
              <p className="text-sm text-gray-600">{room.description}</p>
            </div>
          )}
        </div>
        <div className={`flex ${roomDetailsOpen && "w-full"}`}>
          {room.user ? (
            <UserInfoForRoom
              key={room._id}
              handleSetRoomDetailsOpen={handleSetRoomDetailsOpen}
              details={{
                bookingId: bookingId,
                desc: room.description,
                name: room.name,
                id: room._id,
              }}
              userId={room.user}
            />
          ) : (
            <div className="flex flex-col items-end justify-start w-full ">
              <button
                className="px-2 pb-1 text-lg text-green-700 rounded hover:text-white hover:bg-teal-500"
                onClick={openModal}
              >
                asignar
              </button>
              <div className="">
                <button
                  id="update_room"
                  className="p-1 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
                  onClick={handleEditRoom}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  id="delete_room"
                  className="p-1 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                  onClick={handleDeleteRoom}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              <ModalRoom
                type={modalRoomType}
                isOpen={isModalRoomOpen}
                onClose={setIsModalRoomOpen}
                room={room}
                bookingId={bookingId}
              />
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex items-center justify-between gap-5 pb-2 mb-4 border-b-2 ">
                  <h2 className="text-2xl ">Asignar Habitacion</h2>{" "}
                  <button onClick={closeModal}>
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

                <div className="flex items-center gap-4 p-2 ">
                  <div className="gap-3 ">
                    <div>
                      <p className="text-xs text-gray-400">Numero</p>
                      <p
                        className="mb-2 text-xl font-bold"
                        style={{ color: "var(--primary)" }}
                      >
                        {room.number}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Nombre</p>
                      <p>{room.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Descripcion</p>
                    <p>{room.description}</p>
                  </div>
                </div>
                <div className="flex my-5">
                  <div className="w-full ">
                    <p className="pb-1 text-xs text-gray-400">Asignar a:</p>
                    {userSelect[0]?.name ? (
                      <div className="flex gap-4 p-2 ">
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
                    ) : (
                      <div className="pb-2 border-b-2">
                        <p className="pl-3 text-gray-300">
                          No se ha seleccionado aun
                        </p>
                      </div>
                    )}

                    <div className="flex w-full mt-2">
                      <SearchUser source={"booking"} />
                    </div>
                  </div>
                </div>
                <button
                  id="loginbtn"
                  className="w-full px-4 py-2 text-white rounded"
                  onClick={handleAssignUser}
                >
                  Asignar
                </button>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomComponent;
