import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

//Color
import { Colors } from "../../constant/Colors";
import Commandecheckcomponent from "../../components/Commandecheckcomponent";

const Order = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.commandeDetailsView}>
        <Commandecheckcomponent />
        <Commandecheckcomponent />
        <Commandecheckcomponent />
        <Commandecheckcomponent />
        <Commandecheckcomponent />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorBlack,
    padding: 20,
  },
  commandeDetailsView: {
    marginVertical: 10,
    marginBottom: 50,
  },
  format: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  priceCommande: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});

export default Order;
