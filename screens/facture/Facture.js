import { View, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
//color
import { Colors } from "../../constant/Colors";
import Facturecomponent from "../../components/Facturecomponent";
//mycontext
import { MyContext } from "../../context/MyContext";

const Facture = () => {
  const { setBadgeFacture } = useContext(MyContext);

  useEffect(() => {
    setBadgeFacture(false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        <Facturecomponent />
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
  viewContainer: {
    marginBottom: 25,
  },
});

export default Facture;
