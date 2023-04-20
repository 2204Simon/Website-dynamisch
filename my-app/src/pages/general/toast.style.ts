import { Bounce, Flip, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { colors } from "./constants";

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-container {
    width: 1200px;
    height: 1200px;
  }
`; //Hier passt etwas noch nicht, Größe ändert sich leider nicht von den PushUps

export const CustomToast = {
  error: (message: string) =>
    toast.error(message, {
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 60,
      position: "top-left",
      transition: Slide,
      progressClassName: "my-toast-progress-bar",
      progressStyle: { backgroundColor: colors.companycolor },
      style: { backgroundColor: colors.white, color: colors.black },
    }),
  info: (message: string) =>
    toast.info(message, {
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 60,
      position: "top-left",
      transition: Slide,
      progressClassName: "my-toast-progress-bar",
      progressStyle: { backgroundColor: colors.companycolor },
      style: { backgroundColor: colors.white, color: colors.black },
    }),
  success: (message: string) =>
    toast.success(message, {
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 60,
      position: "top-left",
      transition: Slide,
      progressClassName: "my-toast-progress-bar",
      progressStyle: { backgroundColor: colors.companycolor },
      style: { backgroundColor: colors.white, color: colors.black },
    }),
};

export default StyledToastContainer;
