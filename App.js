import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./routes/StackNavigator";
import BottomTabNavigator from "./routes/TabNavigator";
import DrawerNavigator from "./routes/DrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
