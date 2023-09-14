import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Colors } from "../../constant/Colors";

const Order = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.commandeDetailsView}>
        <View style={[styles.commandeDetailsFormat]}>
          <Text style={{ color: Colors.colorWhite }}>
            Date : 02/09/2023 13h:13
          </Text>
          <View style={styles.commandeDetails}>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Nom</Text>
              <Text style={{ color: Colors.colorWhite }}>Nombres</Text>
              <Text style={{ color: Colors.colorWhite }}>Montant</Text>
              <Text style={{ color: Colors.colorWhite }}>Status</Text>
            </View>
            <View style={styles.rowTwo}>
              <Text style={{ color: Colors.colorWhite }}>Piza</Text>
              <Text style={{ color: Colors.colorWhite }}>2000</Text>
              <Text
                style={{
                  color: Colors.colorWhite,
                  position: "relative",
                  left: 25,
                }}
              >
                2000
              </Text>
              <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
                Confirmer
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ color: Colors.colorWhite }}>Petit Format</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: Colors.colorBlack,
    padding: 25,
  },
  commandeDetailsView: {
    marginVertical: 10,
    marginBottom: 50,
  },
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

export default Order;
