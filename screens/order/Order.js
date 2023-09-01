import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Order = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Order</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Order;
