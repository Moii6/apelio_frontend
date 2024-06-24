import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Alert from "../components/Alert";
import useTrip from "../hooks/useTrip";
import useRoom from "../hooks/useRoom";
import Loader from "./Loader";
import createNotification from "../services/NotificationService";
const ModalRoom = ({ type, isOpen, onClose, room, bookingId, bookingName }) => {
  const {
    errorType,
    errorObject,
    displayAlert,
    setNotificationObj,
    roomsList,
  } = useTrip();
  const { doRoomUpdate, doRoomDelete, doCreateNewRoom } = useRoom();
  const [newDesciption, setNewDescription] = useState("");
  const [loader, setLoader] = useState("hidden");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  //const { _id, number, name, description } = room;

  const handleUpdate = async () => {
    if (newDesciption === "") {
      displayAlert("error", {
        message: "La descripcion no puede estar vacia",
      });
      return;
    }
    if (newDesciption === room?.description) {
      onClose(!isOpen);
      return;
    }
    setLoader("block");
    await doRoomUpdate(room?._id, bookingId, { description: newDesciption });
    setLoader("hidden");
    onClose(!isOpen);
    setNotificationObj({ type: "success", message: "Habitacion Actualizada!" });
  };

  const handleDelete = async () => {
    setLoader("block");
    await doRoomDelete(bookingId, room?._id);
    setLoader("hidden");
    onClose(!isOpen);
    setNotificationObj({
      type: "success",
      message: "Habitacion Eliminada",
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if ([number, name, newDesciption].includes("")) {
      displayAlert("error", {
        message: "Todos los campos son obligatorios",
      });
      return;
    }
    if (checkforExixtingNumber(number)) return;
    setLoader("block");
    await doCreateNewRoom({
      number,
      name,
      description: newDesciption,
      booking: bookingId,
    });
    setLoader("hidden");
    handleClose();
    createNotification("success", "Habitacion creada con exitoa");
  };

  const handleClose = () => {
    setName("");
    setNumber(0);
    setNewDescription("");
    onClose(!isOpen);
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Permitir solo números positivos
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setNumber(inputValue);
      if (checkforExixtingNumber(inputValue)) return;
    }
  };

  const checkforExixtingNumber = (number) => {
    const isrepeat = roomsList.some((room) => room.number === Number(number));
    if (isrepeat) {
      displayAlert("error", {
        message: "Ya existe una habitacion con ese numero",
      });
      return true;
    }
  };
  useEffect(() => {
    setNewDescription(room?.description);
  }, [room]);
  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        {type === "new" ? (
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <h1 className="text-xl" style={{ color: "var(--primary)" }}>
                Nueva Habitacion
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
            <div
              className="gap-1 my-3 border-l-8"
              style={{ borderColor: "var(--primary)" }}
            >
              <h2 className="pl-3 text-lg">{bookingName}</h2>
            </div>
            <form action="" onSubmit={handleCreate}>
              <div className="flex flex-col w-full ">
                <div className="flex gap-5 ">
                  <div className="flex flex-col w-2/12">
                    <label
                      htmlFor="number-text"
                      className="text-sm text-gray-400"
                    >
                      Numero
                    </label>
                    <input
                      className="mb-5 text-center rounded-lg "
                      onChange={handleChange}
                      type="number"
                      name="number"
                      id="number"
                      placeholder="0"
                      value={number}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="name" className="text-sm text-gray-400">
                      Nombre
                    </label>
                    <input
                      className="mb-5 rounded-lg"
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nombre"
                      value={name}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full mb-10">
                  <label
                    htmlFor="description"
                    className="text-sm text-gray-400"
                  >
                    Descripcion
                  </label>
                  <textarea
                    name="desc"
                    onChange={(e) => setNewDescription(e.target.value)}
                    id="desc"
                    rows="3"
                    className="px-3 py-2 rounded-lg"
                    placeholder="Descripcion"
                    value={newDesciption}
                  ></textarea>
                </div>
                {errorObject?.message && (
                  <Alert type={errorType} error={errorObject} />
                )}
                {loader == "block" && (
                  <div className="flex items-center justify-center pb-16 ">
                    <Loader state={loader} />
                  </div>
                )}
                <input
                  type="submit"
                  id="loginbtn"
                  className="py-3 text-white rounded-lg"
                  value={"Guardar"}
                />
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2">
              <h1 className="text-xl" style={{ color: "var(--primary)" }}>
                {type === "upd"
                  ? "Editar Habitacion"
                  : type === "del"
                  ? "Eliminar Habitacion"
                  : "Agregar Habitacion"}
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
            <div className="flex">
              <div className="w-full ">
                <div className="flex gap-5">
                  <div className="my-5">
                    <p className="text-xs text-gray-400">numero</p>
                    <h1 className="pt-2 pl-1">{room?.number}</h1>
                  </div>
                  <div className="my-5">
                    <p className="text-xs text-gray-400">nombre</p>
                    <h1 className="pt-2 pl-1">{room?.name}</h1>
                  </div>
                </div>
                {type === "upd" ? (
                  <div>
                    <div className="">
                      <p className="mb-2 text-xs text-gray-400">descripcion</p>
                      <textarea
                        className="w-full p-2 mb-5"
                        name="desc"
                        id="desc"
                        rows="3"
                        onChange={(e) => setNewDescription(e.target.value)}
                        value={newDesciption}
                      ></textarea>
                    </div>

                    {errorObject?.message && (
                      <Alert type={errorType} error={errorObject} />
                    )}
                    {loader == "block" && (
                      <div className="flex items-center justify-center pb-16 ">
                        <Loader state={loader} />
                      </div>
                    )}
                    <button
                      id="loginbtn"
                      onClick={handleUpdate}
                      className="w-full py-3 text-white rounded"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div className="">
                    <div className="">
                      <p className="text-xs text-gray-400">descripcion</p>
                      <h1 className="pt-2 pl-1">{room?.description}</h1>
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
                    <div className="flex w-full text-white">
                      <button
                        className="w-full py-3 rounded "
                        id="deletebtn"
                        onClick={handleDelete}
                      >
                        Eliminar Habitacion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModalRoom;
