import { KkiapayProvider } from "@kkiapay-org/react-native-sdk";
import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TestComponent from "../../components/Testcomponents";

const Home = ({ route }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <KkiapayProvider>
          {/* <Text>Home</Text> */}
          <TestComponent />
        </KkiapayProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
