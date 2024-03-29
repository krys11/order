import { View, ScrollView, StyleSheet } from "react-native";
import React, { useContext } from "react";
//navigation param
import { useRoute } from "@react-navigation/native";
//context
import { MyContext } from "../../context/MyContext";
//Color
import { Colors } from "../../constant/Colors";
import Productdetailscomponent from "../../components/Productdetailscomponent";

const ProductsDetails = () => {
  const { params } = useRoute();
  const { menu } = useContext(MyContext);

  const product = menu.find((item) => item.id === params.id);
  const itemFormat = product["format"].map((item, index) => {
    return (
      <View key={index}>
        <Productdetailscomponent product={product} item={item} id={params.id} />
      </View>
    );
  });

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 60 }}>
        <View style={styles.productsDetailsView}>{itemFormat}</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorBlack,
  },
  productsDetailsView: {
    paddingHorizontal: 20,
    backgroundColor: Colors.colorBlack,
  },
  productsDetailsFormat: {
    backgroundColor: Colors.colorBlackAlpha,
    padding: 10,
    marginVertical: 10,
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

export default ProductsDetails;
