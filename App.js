import React from "react";
import Entry from "./screens/Entry";
import * as Notifications from "expo-notifications";
import { ToastConfig } from "./components/Toastcomponent";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    <SafeAreaProvider>
      <Entry />
      <ToastConfig />
    </SafeAreaProvider>
  );
}
