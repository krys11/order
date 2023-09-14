import { View, Text } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//icons
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

//Screen
import Home from "../screens/home/Home";
import Order from "../screens/order/Order";
import Bills from "../screens/bills/Bills";
import Account from "../screens/account/Account";

//Color
import { Colors } from "../constant/Colors";
import ProductsDetails from "../screens/productsDetails/ProductsDetails";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeProducts } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.colorBlackAlpha,
          borderWidth: 1,
          borderBottomColor: Colors.colorWhite,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          textTransform: "uppercase",
        },
        headerTintColor: Colors.colorWhite,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name == "Acceuil") {
            iconName = "home";
            return (
              <AntDesign
                name={iconName}
                size={24}
                color={focused ? Colors.colorRed : Colors.colorWhite}
              />
            );
          } else if (route.name == "Commandes") {
            iconName = "local-grocery-store";
            return (
              <MaterialIcons
                name={iconName}
                size={24}
                color={focused ? Colors.colorRed : Colors.colorWhite}
              />
            );
          } else if (route.name == "Factures") {
            iconName = "switcher";
            return (
              <AntDesign
                name={iconName}
                size={24}
                color={focused ? Colors.colorRed : Colors.colorWhite}
              />
            );
          } else if (route.name == "Compte") {
            iconName = "account";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={focused ? Colors.colorRed : Colors.colorWhite}
              />
            );
          }
        },
        tabBarStyle: {
          backgroundColor: Colors.colorBlackAlpha,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          color: Colors.colorWhite,
          marginBottom: 1,
          fontSize: 12,
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Acceuil"
        component={HomeProducts}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Commandes" component={Order} />
      <Tab.Screen name="Factures" component={Bills} />
      <Tab.Screen name="Compte" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
