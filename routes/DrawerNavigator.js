import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./TabNavigator";
import Home from "../screens/home/Home";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{}}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="HomeDrawer" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;