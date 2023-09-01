import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  OrderStackNavigation,
  BillsStackNavigation,
  AccountStackNavigation,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ header: () => null }}>
      <Tab.Screen name="order" component={OrderStackNavigation} />
      <Tab.Screen name="bills" component={BillsStackNavigation} />
      <Tab.Screen name="account" component={AccountStackNavigation} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
