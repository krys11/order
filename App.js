import "react-native-gesture-handler";

import * as React from "react";
import Entry from "./screens/Entry";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import * as Notifications from "expo-notifications";
import { ToastConfig } from "./components/Toastcomponent";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { name as appName } from "./app.json";
import { AppRegistry } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Entry />
        <ToastConfig />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
