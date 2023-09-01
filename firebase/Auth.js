import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { app } from "./Firebase";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
