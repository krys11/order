import React from "react";
import { Platform } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

//Screen user
import Home from "../screens/home/Home";
import Welcome from "../screens/welcome/Welcome";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";
import ForgotPassword from "../screens/forgotPassword/ForgotPassword";
import ProductsDetails from "../screens/productsDetails/ProductsDetails";
import Account from "../screens/account/Account";
import Paiement from "../screens/paiement/Paiement";

//Screen Admin
import LoginAdmin from "../screens/admin/loginAdmin/LoginAdmin";
import HomeAdmin from "../screens/admin/homeAdmin/HomeAdmin";

//Color
import { Colors } from "../constant/Colors";
import SendsNotificationAdmin from "../screens/admin/sendAllNotifications/SendsNotificationAdmin";

const stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <stack.Navigator
      initialRouteName="Welcome"
      // screenOptions={{
      //   headerTitleAlign: "center",
      //   headerBackgroundContainerStyle: {
      //     backgroundColor: Colors.colorBlack,
      //   },
      //   headerStyle: {
      //     height: 100,
      //     borderBottomLeftRadius: Platform.OS === "ios" ? 30 : 35,
      //     borderBottomRightRadius: Platform.OS === "ios" ? 30 : 35,
      //     backgroundColor: Colors.colorWhiteFade,
      //     borderColor: Colors.colorWhiteFade,
      //   },
      // }}
    >
      <stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Loginadmin"
        component={LoginAdmin}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Forgetpassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </stack.Navigator>
  );
};

const HomeProductsStackNavigator = () => {
  return (
    <stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: Colors.colorWhite,
        headerStyle: {
          backgroundColor: Colors.colorBlackAlpha,
        },
        headerTitleAlign: "center",
      }}
    >
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="Product Details" component={ProductsDetails} />
      <stack.Screen name="Commande Details" component={Paiement} />
    </stack.Navigator>
  );
};

const HomeAdminStackNavigator = () => {
  return (
    <stack.Navigator
      initialRouteName="Homeadmin"
      screenOptions={{
        headerTintColor: Colors.colorWhite,
        headerStyle: {
          backgroundColor: Colors.colorBlackAlpha,
        },
        headerTitleAlign: "center",
      }}
    >
      <stack.Screen
        name="Homeadmin"
        component={HomeAdmin}
        options={{ headerShown: false }}
      />
      {/* <stack.Screen
        name="SendsNotificationadmin"
        component={SendsNotificationAdmin}
        options={{ headerShown: false }}
      /> */}
    </stack.Navigator>
  );
};

const AccountStackNavigator = () => {
  return (
    <stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: Colors.colorWhite,
        headerStyle: {
          backgroundColor: Colors.colorBlackAlpha,
        },
        headerTitleAlign: "center",
      }}
    >
      <stack.Screen
        name="Home"
        component={Account}
        options={{ headerShown: false }}
      />
    </stack.Navigator>
  );
};

export {
  MainStackNavigator,
  HomeProductsStackNavigator,
  AccountStackNavigator,
  HomeAdminStackNavigator,
};
