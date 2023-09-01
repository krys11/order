import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Login</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Go Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Login;
