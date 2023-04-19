import { Bounce, Flip, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-container {
    width: 1200px;
    height: 1200px;
  }
`; //Hier passt etwas noch nicht, Größe ändert sich leider nicht von den PushUps

export const CustomToast = {
  error: (message: string) =>
    toast.error(message, {
      autoClose: 20000,
      closeButton: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 60,
      position: "top-left",
      transition: Slide,
      progressClassName: "my-toast-progress-bar",
      progressStyle: { backgroundColor: "black" },
      style: { backgroundColor: "#aa7d03", color: "black" },
    }),
  info: (message: string) =>
    toast.info(message, {
      autoClose: 20000,
      closeButton: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 60,
      position: "top-left",
      transition: Bounce,
      progressClassName: "my-toast-progress-bar",
      progressStyle: { backgroundColor: "#aa7d03" },
      style: { backgroundColor: "black", color: "white" },
    }),
  success: (message: string) =>
    toast.success(message, {
      autoClose: 20000,
      closeButton: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 60,
      position: "top-left",
      transition: Flip,
      progressClassName: "my-toast-progress-bar",
      progressStyle: { backgroundColor: "#aa7d03" },
      style: { backgroundColor: "white", color: "black" },
    }),
};

export default StyledToastContainer;
