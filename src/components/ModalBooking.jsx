import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Alert from "../components/Alert";
import useTrip from "../hooks/useTrip";
import useRoom from "../hooks/useRoom";
import Loader from "./Loader";
import createNotification from "../services/NotificationService";

const ModalBooking = ({ format, tripId, isOpen, onClose, book }) => {
  const {
    doCreateBooking,
    verifyBookingNameAvailable,
    doUpdateBooking,
    doDeleteBooking,
  } = useRoom();
  const { errorType, errorObject, displayAlert } = useTrip();
  const [loader, setLoader] = useState("hidden");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (format === "new") {
      createBook();
      return;
    }
    if (format === "edit") {
      await editBook();
      return;
    }
    if (format === "delete") {
      deleteBook();
      return;
    }
  };

  const handleClose = () => {
    onClose(!isOpen);
  };

  const createBook = async () => {
    console.log("nuevo alojamiento");
    if ([name, address].includes("")) {
      displayAlert("error", {
        message: "Todos los campos son necesarios",
      });
      return;
    }
    const isrepeated = verifyBookingNameAvailable(name);
    if (isrepeated) {
      displayAlert("error", {
        message: "Ya existe un alojamiento con ese nombre",
      });
      return;
    }
    setLoader("block");
    const result = await doCreateBooking(tripId, {
      name,
      address,
      trip: tripId,
    });
    if (result) {
      createNotification(
        "error",
        "Error al crear el alojamiento: " + result.message
      );
    } else createNotification("success", "Alojamiento creado con exito");
    setLoader("hidden");
    handleClose();
  };

  const editBook = async () => {
    console.log(name, address);
    if (name !== book.name || address !== book.address) {
      await doUpdateBooking(book._id, { name, address });
    }
    handleClose();
  };

  const deleteBook = async () => {
    console.log("borrar book: ", book);
    await doDeleteBooking(book._id);
    handleClose();
  };

  useEffect(() => {
    if (format === "edit") {
      setName(book.name);
      setAddress(book.address);
    } else {
      setName("");
      setAddress("");
    }
  }, [format]);
  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div>
          <div className="flex items-center justify-between pb-2 border-b-2">
            <h1 className="text-xl " style={{ color: "var(--primary)" }}>
              {format === "new"
                ? "Nuevo Alojamiento"
                : format === "edit"
                ? "Editar Alojamiento"
                : "Eliminar Alojamiento"}
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
          {format !== "delete" ? (
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col w-full">
                <div className="flex flex-col w-full mt-5">
                  <label htmlFor="name" className="mb-1 text-sm text-gray-400">
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
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="mb-1 text-sm text-gray-400">
                    Direccion
                  </label>
                  <input
                    className="mb-5 rounded-lg"
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Direccion"
                    value={address}
                  />
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
                  className="py-3 mt-5 text-white rounded-lg"
                  value={"Guardar"}
                />
              </div>
            </form>
          ) : (
            <div className="mt-5 ">
              <div className="flex items-center gap-5 mb-3">
                <label htmlFor="name" className="text-sm text-gray-400">
                  Nombre
                </label>
                <p className="text-lg">{book.name}</p>
              </div>
              <div className="flex items-center gap-5 mb-3">
                <label htmlFor="name" className="text-sm text-gray-400">
                  Direccion
                </label>
                <p className="text-lg">{book.address}</p>
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
              <div className="flex">
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 text-white rounded-lg"
                  id="deletebtn"
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalBooking;
