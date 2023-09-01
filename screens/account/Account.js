import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Account = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Account</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Account;
