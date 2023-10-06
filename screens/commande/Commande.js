import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";

//Color
import { Colors } from "../../constant/Colors";
import Commandecheckcomponent from "../../components/Commandecheckcomponent";
//mycontext
import { MyContext } from "../../context/MyContext";

const Commande = () => {
  const { setBadgeCommande } = useContext(MyContext);

  useEffect(() => {
    setBadgeCommande(false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.commandeDetailsView}>
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

export default Commande;
