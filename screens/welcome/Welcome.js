import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

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
