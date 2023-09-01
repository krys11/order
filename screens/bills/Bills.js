import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Bills = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Bills</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Bills;
