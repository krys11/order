import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";
import { getAuth } from "firebase/auth";

const Welcome = () => {
  const navigation = useNavigation();
  const { auth } = useContext(MyContext);

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
