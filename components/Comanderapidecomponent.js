import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
//color
import { Colors } from "../constant/Colors";
//mycontext
import { MyContext } from "../context/MyContext";
//components
import { TestComponent } from "./Testcomponents";
import Selectformacomponent from "./Selectformacomponent";

const Comanderapidecomponent = () => {
  const { menu, price, format } = useContext(MyContext);
  const [selectFormat, setSelectFormat] = React.useState("");
  const [fixPrice, setFixPrice] = React.useState("");

  return (
    <View style={styles.commandeRapideView}>
      <View style={styles.productDetails}>
        <Image source={menu[0].img1} style={styles.img} />
        <View style={styles.details}>
          <Text style={styles.productName}>Pizza Mexicaine</Text>
          <Text style={styles.detailsView}>Details...</Text>
        </View>
        <View style={styles.formatView}>
          <Selectformacomponent
            format={format}
            selectFormat={selectFormat}
            setSelectFormat={setSelectFormat}
            setFixPrice={setFixPrice}
          />
        </View>
      </View>
      <View style={styles.productPriceCommande}>
        <Text style={styles.productPrice}>{fixPrice ? fixPrice : 0}FCFA</Text>
        <TouchableOpacity>
          <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
            Commander
          </Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
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
