import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
//color
import { Colors } from "../constant/Colors";
//img
import { ImageSlider } from "react-native-image-slider-banner";
import { useNavigation, useRoute } from "@react-navigation/native";

const Productdetailscomponent = ({ product, item }) => {
  const navigation = useNavigation();
  const { params } = useRoute();
  return (
    <View style={styles.productsDetailsFormat}>
      <View style={{ width: "100%", height: 200 }}>
        <ImageSlider
          data={[
            {
              img: item.img1,
            },
            {
              img: item.img2,
            },
            {
              img: item.img3,
            },
          ]}
          autoPlay={true}
          closeIconColor="#fff"
          caroselImageStyle={{
            resizeMode: "cover",
            justifyContent: "center",
            alignSelf: "center",
          }}
          timer={3000}
        />
      </View>
      <View style={styles.format}>
        <Text style={{ fontWeight: "bold", color: Colors.colorWhite }}>
          Format: {item.nom}
        </Text>
        <Text style={{ fontWeight: "bold", color: Colors.colorWhite }}>
          {product.title}
        </Text>
      </View>
      <Text style={{ fontWeight: "400", color: Colors.colorWhite }}>
        {item.details}
      </Text>
      <View style={styles.priceCommande}>
        <Text style={{ color: Colors.colorRed, fontWeight: "bold" }}>
          {item.price}FCFA
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Commande Details", {
              item: item,
              title: product.title,
            })
          }
        >
          <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
            Commander
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Productdetailscomponent;
