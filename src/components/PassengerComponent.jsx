import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const PassengerComponent = ({ passenger }) => {
  const { getUserInfo } = useAuth();
  const [localUser, setLocalUser] = useState();
  useEffect(() => {
    const gettingUser = async () => {
      const data = await getUserInfo(passenger.userId);
      setLocalUser(data);
    };
    gettingUser();
  }, []);
  return (
    <div
      className="p-2 border-b-2 text-md"
      style={{ borderColor: "var(--ligth)" }}
    >
      <p className=""></p>
      {localUser?.name}
    </div>
  );
};

export default PassengerComponent;
