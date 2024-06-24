import React, { useEffect, useState } from "react";
import useRoom from "../hooks/useRoom";
import usePassenger from "../hooks/usePassenger";
import useAuth from "../hooks/useAuth";
import ModalEditPassenger from "./ModalEditPassenger";
import ModalDeletePassenger from "./ModalDeletePassenger";

const UserDetailsComponent = ({ ticket }) => {
  const { getUserInfo } = useAuth();
  const { setingUserForAssignment } = useRoom();
  const { notifyPassengerIsSelected } = usePassenger();
  const [localUser, setLocalUser] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const handleClickUser = () => {
    if (localUser.seat) {
      //console.log("elimnar pasajero / ticket: ", localUser._id);
    }
    setingUserForAssignment(localUser?._id);
    notifyPassengerIsSelected(true);
  };
  const handleEditPassenger = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleDeletePassenger = () => {
    setIsOpenModalDelete(!isOpenModalDelete);
  };

  useEffect(() => {
    const gettingUser = async (seat) => {
      let data = await getUserInfo(ticket?.userId);
      data.seat = seat;
      setLocalUser(data);
    };
    if (ticket?.userId) gettingUser(ticket?.seat);
    else setLocalUser(ticket);
  }, [ticket]);
  if (ticket?.userId)
    return (
      <div className="flex flex-col items-start justify-between pl-2 sm:flex-row sm:items-center last-of-type:border-none">
        <div className="flex w-full gap-2 py-3">
          <div className="flex p-3 text-white bg-gray-400 rounded-full">
            <p>{localUser?.name.split(" ")[0].charAt(0)}</p>
            <p>{localUser?.name.split(" ")[1].charAt(0)}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="" style={{ color: "var(--primary)" }}>
              {localUser?.name}
              <span className="px-2 py-1 ml-3 text-xs text-green-800 bg-green-300 rounded-full">
                {localUser?.role === "passenger" ? "pasajero" : ""}
              </span>
            </p>
            <p className="text-sm text-gray-400">Asiento: {localUser?.seat}</p>
          </div>
        </div>
        <div className="flex items-end gap-2 pr-2 mb-2 sm:mb-0 md:flex-col">
          <button
            className="flex items-center gap-2 px-2 py-1 text-blue-600 rounded-lg md:p-1 hover:bg-blue-600 hover:text-white"
            onClick={handleEditPassenger}
          >
            <p className="block md:hidden">Editar</p>
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
            className="flex items-center gap-2 px-2 py-1 text-red-500 rounded-lg md:p-1 hover:bg-red-500 hover:text-white"
            onClick={handleDeletePassenger}
          >
            <p className="block md:hidden">Eliminar</p>
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
        <ModalEditPassenger
          ticketId={ticket._id}
          isOpen={isOpenModal}
          user={localUser}
        />
        <ModalDeletePassenger
          ticketId={ticket._id}
          isOpen={isOpenModalDelete}
          user={localUser}
        />
      </div>
    );
  return (
    <button
      className="flex items-center gap-2 py-3 border-b-2 hover:px-2 last-of-type:border-none hover:bg-white hover:rounded"
      onClick={handleClickUser}
    >
      <div className="flex p-3 text-white bg-gray-400 rounded-full">
        <p>{localUser?.name.split(" ")[0].charAt(0)}</p>
        <p>{localUser?.name.split(" ")[1].charAt(0)}</p>
      </div>
      <div className="flex flex-col items-start">
        <p className="" style={{ color: "var(--primary)" }}>
          {localUser?.name}
          <span className="px-2 py-1 ml-3 text-xs text-green-800 bg-green-300 rounded-full">
            {localUser?.role === "passenger" ? "pasajero" : ""}
          </span>
        </p>
        <p className="text-sm ">{localUser?.email}</p>
      </div>
    </button>
  );
};

export default UserDetailsComponent;
