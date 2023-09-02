import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  OrderStackNavigation,
  BillsStackNavigation,
  AccountStackNavigation,
} from "./StackNavigator";
import Home from "../screens/home/Home";
import Order from "../screens/order/Order";
import Bills from "../screens/bills/Bills";
import Account from "../screens/account/Account";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="home"
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="order" component={Order} />
      <Tab.Screen name="bills" component={Bills} />
      <Tab.Screen name="account" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
