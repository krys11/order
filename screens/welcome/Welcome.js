import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";
import Screenloader from "../screenLoader/Screenloader";

const Welcome = () => {
  const navigation = useNavigation();
  const { isAuth, setIsAuth, data } = useContext(MyContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Welcome</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Go Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Welcome;
