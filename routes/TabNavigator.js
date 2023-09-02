import { View, Text } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//icons
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

//Screen
import Home from "../screens/home/Home";
import Order from "../screens/order/Order";
import Bills from "../screens/bills/Bills";
import Account from "../screens/account/Account";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [color, setColor] = useState("");
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let colorName;
          if (route.name == "Acceuil") {
            iconName = "home";
            return (
              <AntDesign
                name={iconName}
                size={24}
                color={focused ? "red" : "black"}
              />
            );
          } else if (route.name == "Commandes") {
            iconName = "local-grocery-store";
            return (
              <MaterialIcons
                name={iconName}
                size={24}
                color={focused ? "red" : "black"}
              />
            );
          } else if (route.name == "Factures") {
            iconName = "switcher";
            return (
              <AntDesign
                name={iconName}
                size={24}
                color={focused ? "red" : "black"}
              />
            );
          } else if (route.name == "Compte") {
            iconName = "account";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={focused ? "red" : "black"}
              />
            );
          }
        },
        tabBarStyle: {
          borderRadius: 10,
          marginHorizontal: 10,
          marginBottom: 10,
        },
        tabBarLabelStyle: {
          color: "black",
          marginBottom: 1,
          fontSize: 12,
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Acceuil" component={Home} />
      <Tab.Screen name="Commandes" component={Order} />
      <Tab.Screen name="Factures" component={Bills} />
      <Tab.Screen name="Compte" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
