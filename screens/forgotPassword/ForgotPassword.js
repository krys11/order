import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>ForgotPassword</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>GoBack</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;
