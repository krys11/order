import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

//icons
import { MaterialIcons } from "@expo/vector-icons";
//color
import { Colors } from "../../constant/Colors";

const Bills = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.factureDetailsView}>
        <View style={[styles.factureDetailsFormat]}>
          <View style={styles.factureDetails}>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>
                Date : 02/09/2023 13h:13
              </Text>
              <TouchableOpacity style={{ color: Colors.colorWhite }}>
                <MaterialIcons
                  name="delete"
                  size={24}
                  color={Colors.colorRed}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Ref: 23456787</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Nom:</Text>
              <Text style={{ color: Colors.colorWhite }}>
                Pizza (Petit Format)
              </Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Nombres:</Text>
              <Text style={{ color: Colors.colorWhite }}>1</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Montant:</Text>
              <Text style={{ color: Colors.colorWhite }}>2000</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Client:</Text>
              <Text style={{ color: Colors.colorWhite }}>Kry's Hyppo</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>
                Numero de paiement:
              </Text>
              <Text style={{ color: Colors.colorWhite }}>+22995647834</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>
                Date de paiement:
              </Text>
              <Text style={{ color: Colors.colorWhite }}>02/02/3223 13:13</Text>
            </View>
          </View>
        </View>
        <View style={[styles.factureDetailsFormat]}>
          <View style={styles.factureDetails}>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>
                Date : 02/09/2023 13h:13
              </Text>
              <TouchableOpacity style={{ color: Colors.colorWhite }}>
                <MaterialIcons
                  name="delete"
                  size={24}
                  color={Colors.colorRed}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Ref: 23456787</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Nom:</Text>
              <Text style={{ color: Colors.colorWhite }}>
                Pizza (Petit Format)
              </Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Nombres:</Text>
              <Text style={{ color: Colors.colorWhite }}>1</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Montant:</Text>
              <Text style={{ color: Colors.colorWhite }}>2000</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Client:</Text>
              <Text style={{ color: Colors.colorWhite }}>Kry's Hyppo</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>
                Numero de paiement:
              </Text>
              <Text style={{ color: Colors.colorWhite }}>+22995647834</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>
                Date de paiement:
              </Text>
              <Text style={{ color: Colors.colorWhite }}>02/02/3223 13:13</Text>
            </View>
          </View>
        </View>
        <View style={[styles.factureDetailsFormat]}>
          <View style={styles.factureDetails}>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>
                Date : 02/09/2023 13h:13
              </Text>
              <TouchableOpacity style={{ color: Colors.colorWhite }}>
                <MaterialIcons
                  name="delete"
                  size={24}
                  color={Colors.colorRed}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Ref: 23456787</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Nom:</Text>
              <Text style={{ color: Colors.colorWhite }}>
                Pizza (Petit Format)
              </Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Nombres:</Text>
              <Text style={{ color: Colors.colorWhite }}>1</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Montant:</Text>
              <Text style={{ color: Colors.colorWhite }}>2000</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>Client:</Text>
              <Text style={{ color: Colors.colorWhite }}>Kry's Hyppo</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>
                Numero de paiement:
              </Text>
              <Text style={{ color: Colors.colorWhite }}>+22995647834</Text>
            </View>
            <View style={styles.rowOne}>
              <Text style={{ color: Colors.colorWhite }}>
                Date de paiement:
              </Text>
              <Text style={{ color: Colors.colorWhite }}>02/02/3223 13:13</Text>
            </View>
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
  factureDetailsView: {
    marginVertical: 10,
    marginBottom: 50,
  },
  factureDetailsFormat: {
    backgroundColor: Colors.colorBlackAlpha,
    height: 300,
    padding: 10,
    marginVertical: 25,
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
    borderStyle: "dashed",
  },
});

export default Bills;
