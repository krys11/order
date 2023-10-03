import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useContext } from "react";
//color
import { Colors } from "../constant/Colors";
//icons
import { MaterialIcons } from "@expo/vector-icons";
//mycontext
import { MyContext } from "../context/MyContext";

const Facturecomponent = () => {
  const { facture } = useContext(MyContext);

  const itemFacture = facture.map((item, index) => {
    return (
      <View style={styles.factureDetailsFormat} key={index}>
        <View style={styles.factureDetails}>
          <View style={styles.rowOne}>
            <Text style={{ color: Colors.colorWhite }}>
              Date : {item.date} {item.heure}
            </Text>
            <TouchableOpacity style={{ color: Colors.colorWhite }}>
              <MaterialIcons name="delete" size={24} color={Colors.colorRed} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowOne}>
            <Text style={{ color: Colors.colorWhite }}>Ref:</Text>
            <Text style={{ color: Colors.colorWhite }}>{item.ref}</Text>
          </View>
          <View style={styles.rowOne}>
            <Text style={{ color: Colors.colorWhite }}>Nom:</Text>
            <Text style={{ color: Colors.colorWhite }}>
              {item.name} ({item.format})
            </Text>
          </View>
          <View style={styles.rowOne}>
            <Text style={{ color: Colors.colorWhite }}>Nombres:</Text>
            <Text style={{ color: Colors.colorWhite }}>{item.nombres}</Text>
          </View>
          <View style={styles.rowOne}>
            <Text style={{ color: Colors.colorWhite }}>Montant:</Text>
            <Text style={{ color: Colors.colorWhite }}>{item.montant}</Text>
          </View>
          <View style={styles.rowOne}>
            <Text style={{ color: Colors.colorWhite }}>Client:</Text>
            <Text style={{ color: Colors.colorWhite }}>{item.client}</Text>
          </View>
          <View style={styles.rowOne}>
            <Text style={{ color: Colors.colorWhite }}>
              Numero de paiement:
            </Text>
            <Text style={{ color: Colors.colorWhite }}>{item.num}</Text>
          </View>
          <View style={styles.rowOne}>
            <Text style={{ color: Colors.colorWhite }}>Date de paiement:</Text>
            <Text style={{ color: Colors.colorWhite }}>
              {item.date} {item.heure}
            </Text>
          </View>
        </View>
      </View>
    );
  });

  return itemFacture;
};

const styles = StyleSheet.create({
  factureDetailsFormat: {
    backgroundColor: Colors.colorBlackAlpha,
    height: 300,
    padding: 20,
    marginBottom: 10,
    justifyContent: "space-around",
  },
  factureDetails: {
    flexDirection: "column",
  },
  rowOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.colorGreen,
    borderStyle: Platform.OS === "ios" ? "solid" : "dashed",
  },
});

export default Facturecomponent;
