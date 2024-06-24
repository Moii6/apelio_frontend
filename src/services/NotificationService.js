import { toast } from "react-toastify";

const createNotification = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, { autoClose: 3000 });
      break;
    case "error":
      toast.error(message, { autoClose: 3000 });
      break;
    default:
      toast.info(message, { autoClose: 3000 });
      break;
  }
};

export default createNotification;
