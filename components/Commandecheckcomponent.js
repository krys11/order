import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
//color
import { Colors } from "../constant/Colors";
//mycontext
import { MyContext } from "../context/MyContext";

const Commandecheckcomponent = () => {
  const { commande } = useContext(MyContext);

  const itemCommande = commande.map((item, index) => {
    return (
      <View style={styles.commandeDetailsFormat} key={index}>
        <Text style={{ color: Colors.colorWhite }}>
          Date : {item.date} {item.heure}
        </Text>
        <View style={styles.commandeDetails}>
          <View style={styles.rowOne}>
            <Text style={{ color: Colors.colorWhite }}>Nom</Text>
            <Text style={{ color: Colors.colorWhite }}>Nombres</Text>
            <Text style={{ color: Colors.colorWhite }}>Montant</Text>
            <Text style={{ color: Colors.colorWhite }}>Status</Text>
          </View>
          <View style={styles.rowTwo}>
            <Text style={{ color: Colors.colorWhite }}>{item.name}</Text>
            <Text style={{ color: Colors.colorWhite }}>{item.nombres}</Text>
            <Text
              style={{
                color: Colors.colorWhite,
                position: "relative",
                left: 25,
              }}
            >
              {item.montant}
            </Text>
            <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
              {item.status}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ color: Colors.colorWhite }}>
            Format: {item.format}
          </Text>
        </View>
      </View>
    );
  });

  return itemCommande;
};

const styles = StyleSheet.create({
  commandeDetailsFormat: {
    backgroundColor: Colors.colorBlackAlpha,
    height: 150,
    padding: 10,
    marginVertical: 10,
    justifyContent: "space-around",
  },
  commandeDetails: {
    flexDirection: "column",
  },
  rowOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  rowTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default Commandecheckcomponent;
