import React from "react";
import { Platform } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

//Screen
import Home from "../screens/home/Home";
import Welcome from "../screens/welcome/Welcome";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";
import ForgotPassword from "../screens/forgotPassword/ForgotPassword";
import ProductsDetails from "../screens/productsDetails/ProductsDetails";
import Account from "../screens/account/Account";

//Color
import { Colors } from "../constant/Colors";

const stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <stack.Navigator
      initialRouteName="welcome"
      screenOptions={{
        headerTitleAlign: "center",
        headerBackgroundContainerStyle: {
          backgroundColor: Colors.colorBlack,
        },
        headerStyle: {
          height: 100,
          borderBottomLeftRadius: Platform.OS === "ios" ? 30 : 35,
          borderBottomRightRadius: Platform.OS === "ios" ? 30 : 35,
          backgroundColor: Colors.colorWhiteFade,
          borderColor: Colors.colorWhiteFade,
        },
      }}
    >
      <stack.Screen name="Welcome" component={Welcome} />
      <stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "Connexion" }}
      />
      <stack.Screen
        name="Register"
        component={Register}
        options={{ headerTitle: "Inscription" }}
      />
      <stack.Screen
        name="Forgotpassword"
        component={ForgotPassword}
        options={{ headerTitle: "Mot de passe oublié" }}
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
};
