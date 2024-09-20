import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  message: string;
}
export const NotificationToast = ({
  message,
  type,
  position = "top-right",
}: ToastProps) => {
  useEffect(() => {
    toast(message, {
      type: type,
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, [type, position, message]);

  return <ToastContainer />;
};
