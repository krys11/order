import React from "react";
//Toast
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
//Colors
import { Colors } from "../constant/Colors";

//costum config Toast
const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: Colors.colorBlack,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: Colors.colorWhite,
      }}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: Colors.colorBlack,
      }}
      text1Style={{
        fontSize: 15,
        color: Colors.colorWhite,
      }}
      text2Style={{
        fontSize: 15,
        color: Colors.colorWhite,
      }}
    />
  ),
};

const ToastConfig = () => {
  //Toast message
  return <Toast config={toastConfig} />;
};

//Toast message
const showToastSuccess = (msg) => {
  Toast.show({
    type: "success",
    text1: msg,
    visibilityTime: 3000,
  });
};

const showToastError = (msg) => {
  Toast.show({
    type: "error",
    text1: msg + " 👋",
    position: "top",
    visibilityTime: 3000,
  });
};

export { ToastConfig, showToastSuccess, showToastError };
