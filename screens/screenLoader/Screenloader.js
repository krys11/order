import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constant/Colors";

const Screenloader = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <Text style={styles.textchargment}>Patientez...</Text>
          <ActivityIndicator
            animating={true}
            size="large"
            color={Colors.colorWhite}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: Colors.colorBlackAlpha,
    justifyContent: "center",
    alignItems: "center",
  },
  textchargment: {
    color: Colors.colorWhite,
    marginBottom: 10,
    fontSize: 20,
  },
});

export default Screenloader;
