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

const Comanderapidecomponent = ({ item, itemformat, itemPrice }) => {
  const { setCommande, setFacture } = useContext(MyContext);
  const [selectFormat, setSelectFormat] = React.useState("");
  const [fixPrice, setFixPrice] = React.useState("");

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

  const genererCommandeAndFacture = () => {
    if (selectFormat) {
      setCommande((previousCommande) => [
        ...previousCommande,
        {
          date: getDates(),
          heure: getHours(),
          name: item.title,
          nombres: "2",
          montant: fixPrice,
          status: "Confirmer",
          format: selectFormat,
        },
      ]);

      setFacture((previousFacture) => [
        ...previousFacture,
        {
          date: getDates(),
          heure: getHours(),
          ref: "4844168484",
          name: item.title,
          format: selectFormat,
          nombres: "2",
          montant: fixPrice,
          client: "Kry's Hyppo",
          num: "+22998521478",
        },
      ]);
    } else {
      Alert.alert("Format", "Veillez selectionner un format", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.commandeRapideView}>
      <View style={styles.productDetails}>
        <Image source={item.img0} style={styles.img} />
        <View style={styles.details}>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.detailsView}>Details...</Text>
        </View>
        <View style={styles.formatView}>
          <Selectformacomponent
            itemformat={itemformat}
            selectFormat={selectFormat}
            setSelectFormat={setSelectFormat}
            setFixPrice={setFixPrice}
            itemPrice={itemPrice}
            placeholder="Format"
          />
        </View>
      </View>
      <View style={styles.productPriceCommande}>
        <Text style={styles.productPrice}>{fixPrice ? fixPrice : 0}FCFA</Text>
        <TouchableOpacity onPress={genererCommandeAndFacture}>
          <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
            Commander
          </Text>
        </TouchableOpacity>
      </View>
      <TestComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  commandeRapideView: {
    backgroundColor: Colors.colorBlackAlpha,
    marginVertical: 5,
    padding: 10,
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 999,
  },
  details: {
    marginLeft: 5,
  },
  formatView: {
    flexDirection: "column",
    width: 90,
  },
  productName: {
    color: Colors.colorWhite,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 15,
  },
  detailsView: {
    color: Colors.colorWhite,
  },
  productPriceCommande: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  productPrice: {
    color: Colors.colorRed,
  },
});

export default Comanderapidecomponent;
