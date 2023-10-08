import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
//color
import { Colors } from "../constant/Colors";
//mycontext
import { MyContext } from "../context/MyContext";
//components
import TestComponent from "./Testcomponents";
import Selectformacomponent from "./Selectformacomponent";
import Activityindicatorcomponent from "./Activityindicatorcomponent";
import TextinputComponent from "./TextinputComponent";

const Comanderapidecomponent = ({ item, itemformat, itemPrice }) => {
  const {
    setCommande,
    setFacture,
    setUpdate,
    loadingLocalAndFirebaseSave,
    setLoadingLocalAndFirebaseSave,
  } = useContext(MyContext);
  const [selectFormat, setSelectFormat] = React.useState("");
  const [fixPrice, setFixPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  const getDates = () => {
    const dateAll = new Date();
    const date = `${dateAll.getDate()}`.padStart(2, 0);
    const monthe = `${dateAll.getMonth() + 1}`.padStart(2, 0);
    const year = `${dateAll.getFullYear()}`;

    return `${date}/${monthe}/${year}`;
  };

  const getHours = () => {
    const dateAll = new Date();
    const hours = `${dateAll.getHours()}`.padStart(2, 0);
    const minutes = `${dateAll.getMinutes()}`.padStart(2, 0);
    const seconds = `${dateAll.getSeconds()}`.padStart(2, 0);

    return `${hours}:${minutes}:${seconds}`;
  };

  const priceFinale = () => {
    if (fixPrice && quantity) {
      return fixPrice * parseInt(quantity);
    } else {
      return 0;
    }
  };

  const genererCommandeAndFacture = () => {
    if (selectFormat) {
      if (parseInt(quantity) > 0) {
        setLoadingLocalAndFirebaseSave(true);
        setUpdate(true);
        setCommande((previousCommande) => [
          {
            date: getDates(),
            heure: getHours(),
            name: item.title,
            nombres: quantity,
            montant: priceFinale(),
            status: "Confirmer",
            format: selectFormat,
          },
          ...previousCommande,
        ]);

        setFacture((previousFacture) => [
          {
            date: getDates(),
            heure: getHours(),
            ref: "4844168484",
            name: item.title,
            format: selectFormat,
            nombres: quantity,
            montant: priceFinale(),
            client: "Kry's Hyppo",
            num: "+22998521478",
          },
          ...previousFacture,
        ]);

        setSelectFormat("");
        setFixPrice("");
        setQuantity("");
      } else {
        Alert.alert("Quantité", "Veillez définir un nombre", [{ text: "OK" }]);
      }
    } else {
      Alert.alert("Format", "Veillez selectionner un format", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.commandeRapideView}>
      <View style={{ alignItems: "center" }}>
        <Image source={item.img0} style={styles.img} />
        <Text style={styles.productPrice}> {priceFinale()} FCFA </Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.productNameAndDetails}>{item.title}</Text>
        <Text style={[styles.productNameAndDetails, { fontWeight: 300 }]}>
          Details...
        </Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "space-evenly" }}>
        <Selectformacomponent
          itemformat={itemformat}
          selectFormat={selectFormat}
          setSelectFormat={setSelectFormat}
          setFixPrice={setFixPrice}
          itemPrice={itemPrice}
          placeholder="Format"
        />
        <TextinputComponent
          label=""
          value={quantity}
          setValue={setQuantity}
          keyboardType="numeric"
          styles={{ marginVertical: 5, borderRadius: 10, height: 30 }}
          placeholder="Nombres"
        />

        {loadingLocalAndFirebaseSave ? (
          <Activityindicatorcomponent />
        ) : (
          <TouchableOpacity onPress={genererCommandeAndFacture}>
            <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
              Commander
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <TestComponent genererCommandeAndFacture={genererCommandeAndFacture} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  commandeRapideView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Colors.colorBlackAlpha,
    marginVertical: 10,
    padding: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 999,
  },
  productPrice: {
    color: Colors.colorRed,
    marginTop: 10,
  },
  productNameAndDetails: {
    color: Colors.colorWhite,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 15,
  },
});

export default Comanderapidecomponent;
