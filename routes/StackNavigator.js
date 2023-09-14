import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/welcome/Welcome";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";
import ForgotPassword from "../screens/forgotPassword/ForgotPassword";
import Order from "../screens/order/Order";
import Bills from "../screens/bills/Bills";
import Account from "../screens/account/Account";
import Home from "../screens/home/Home";
import ProductsDetails from "../screens/productsDetails/ProductsDetails";
import { Colors } from "../constant/Colors";

const stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <stack.Navigator
      initialRouteName="welcome"
      screenOptions={{ header: () => null }}
    >
      <stack.Screen name="Welcome" component={Welcome} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="Register" component={Register} />
      <stack.Screen name="Forgotpassword" component={ForgotPassword} />
    </stack.Navigator>
  );
};

const OrderStackNavigation = () => {
  return (
    <stack.Navigator screenOptions={{ header: () => null }}>
      <stack.Screen name="Order" component={Order} />
    </stack.Navigator>
  );
};

const BillsStackNavigation = () => {
  return (
    <stack.Navigator screenOptions={{ header: () => null }}>
      <stack.Screen name="Bills" component={Bills} />
    </stack.Navigator>
  );
};

const AccountStackNavigation = () => {
  return (
    <stack.Navigator screenOptions={{ header: () => null }}>
      <stack.Screen name="Account" component={Account} />
    </stack.Navigator>
  );
};

const HomeProducts = () => {
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

export {
  MainStackNavigator,
  OrderStackNavigation,
  BillsStackNavigation,
  AccountStackNavigation,
  HomeProducts,
};
