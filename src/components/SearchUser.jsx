import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import useRoom from "../hooks/useRoom";
import UserDetailsComponent from "./UserDetailsComponent";
import usePassenger from "../hooks/usePassenger";
const SearchUser = ({ source }) => {
  const {
    doSearchUsers,
    searchResultList,
    userIdForAsignment,
    setSearchResultList,
  } = useRoom();
  const {
    isPassSelected,
    doSearchUsersInfoForRooms,
    userInfoForTripPassengersList,
  } = usePassenger();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("hidden");
  const [searchString, setSearchString] = useState("");
  const [sslength, setSslength] = useState(0);

  const handleSearch = (e) => {
    if (searchString.length <= 0) {
      setIsOpen(!isOpen);
      if (state === "hidden") {
        setState("block");
      }
    }
    if (sslength === 0 && isOpen) {
      setIsOpen(!isOpen);
      setState("hidden");
    }
  };

  const handleKeyDown = (e) => {
    setSslength(searchString.length);
    if (e.key === "Backspace") {
      if (searchString.length <= 1) {
        setIsOpen(false);
        setState("hidden");
        setSearchString;
      }
    }
    if (searchString === "") setSslength(0);
    if (searchString !== "" && !isOpen) {
      setState("block");
      if (source === "booking") searchInUserInfoList(searchString);
      else doSearchUsers(searchString);
      setState("hidden");
      setIsOpen(true);
    }
    if (searchString === "" && isOpen) {
      setIsOpen(false);
      setState("hidden");
    } else {
      setState("block");
      if (source === "booking") searchInUserInfoList(searchString);
      else doSearchUsers(searchString);
      setState("hidden");
    }
  };

  const searchInUserInfoList = (searchString) => {
    const filtered = userInfoForTripPassengersList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchString) ||
        item.email.toLowerCase().includes(searchString)
    );
    setSearchResultList(filtered);
  };
  useEffect(() => {
    if (userIdForAsignment != "") {
      setIsOpen(false);
      setState("hidden");
    }
  }, [userIdForAsignment]);

  useEffect(() => {
    if (isPassSelected) {
      setSearchString("");
    }
  }, [isPassSelected]);

  useEffect(() => {
    const searchUserInfoForRoomAsign = async () => {
      if (source === "booking") {
        await doSearchUsersInfoForRooms();
      }
    };
    searchUserInfoForRoomAsign();
  }, [source]);

  return (
    <div className="items-center w-full ">
      <div className="flex">
        <input
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchString(e.target.value)}
          className="w-full border-2 border-teal-700 rounded rounded-r-none"
          type="text"
          value={searchString}
          placeholder="Ingresa nombre o email "
        />
        <button
          onClick={handleSearch}
          className="p-2 text-white bg-teal-500 border-2 border-teal-700 rounded rounded-l-none"
          style={{
            backgroundColor: "var(--primary)",
            borderColor: "var(--primary)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4 bg-gray-100 ">
          {isOpen && (
            <div>
              <div className="overflow-y-auto h-3/6 max-h-96 ">
                {searchResultList.length > 0 ? (
                  <div className="flex flex-col">
                    {searchResultList?.map((res) => (
                      <UserDetailsComponent ticket={res} />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Loader state={state} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
