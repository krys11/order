import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Register</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Forgotpassword")}>
          <Text>Go Forgot Password</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Register;
