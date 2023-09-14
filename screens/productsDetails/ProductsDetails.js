import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { ImageSlider } from "react-native-image-slider-banner";
import { useRoute } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";
import { Colors } from "../../constant/Colors";

const ProductsDetails = () => {
  const { params } = useRoute();
  const { menu } = useContext(MyContext);

  const product = menu.find((item) => item.id === params.id);
  console.log(product);

  return (
    <ScrollView>
      <View style={styles.productsDetailsView}>
        <ImageSlider
          data={[
            { img: require(`../../img/logo_default.jpeg`) },
            { img: require("../../img/logo_default.jpeg") },
            { img: require("../../img/logo_default.jpeg") },
          ]}
          localImg={true}
          autoPlay={true}
          closeIconColor="#f1f1f1"
          caroselImageStyle={{ resizeMode: "cover" }}
        />
        <Text>Format</Text>
        <Text>Description:</Text>
        <View>
          <Text>1000FCFA</Text>
          <TouchableOpacity>
            <Text>Commander</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text>ProductsDetails</Text>
      </View>
      <View>
        <Text>ProductsDetails</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productsDetailsView: {},
});

export default ProductsDetails;
