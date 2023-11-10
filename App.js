import React from "react";
import Entry from "./screens/Entry";
import * as Notifications from "expo-notifications";
import { ToastConfig } from "./components/Toastcomponent";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  return (
    <>
      <Entry />
      <ToastConfig />
    </>
  );
}
