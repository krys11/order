import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { ImageSlider } from "react-native-image-slider-banner";
import { useRoute } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";
import { Colors } from "../../constant/Colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ProductsDetails = () => {
  const { params } = useRoute();
  const { menu } = useContext(MyContext);

  const product = menu.find((item) => item.id === params.id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productsDetailsView}>
        <View style={[styles.productsDetailsFormat]}>
          <View style={{ width: "100%", height: 200 }}>
            <ImageSlider
              data={[
                {
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
                },
                {
                  img: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
                },
                {
                  img: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
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
              Petit Format
            </Text>
            <Text style={{ fontWeight: "bold", color: Colors.colorWhite }}>
              {product.title}
            </Text>
          </View>
          <Text style={{ fontWeight: "400", color: Colors.colorWhite }}>
            Sauce, Pain, Sel, Oignon
          </Text>
          <View style={styles.priceCommande}>
            <Text style={{ color: Colors.colorRed, fontWeight: "bold" }}>
              1000FCFA
            </Text>
            <TouchableOpacity>
              <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
                Commander
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.productsDetailsFormat]}>
          <View style={{ width: "100%", height: 200 }}>
            <ImageSlider
              data={[
                {
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
                },
                {
                  img: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
                },
                {
                  img: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
                },
              ]}
              autoPlay={true}
              closeIconColor="#fff"
              caroselImageStyle={{
                resizeMode: "cover",
                justifyContent: "center",
                alignSelf: "center",
              }}
              timer={4000}
            />
          </View>
          <View style={styles.format}>
            <Text style={{ fontWeight: "bold", color: Colors.colorWhite }}>
              Format Moyen
            </Text>
            <Text style={{ fontWeight: "bold", color: Colors.colorWhite }}>
              {product.title}
            </Text>
          </View>
          <Text style={{ fontWeight: "400", color: Colors.colorWhite }}>
            Sauce, Pain, Sel, Oignon
          </Text>
          <View style={styles.priceCommande}>
            <Text style={{ color: Colors.colorRed, fontWeight: "bold" }}>
              1000FCFA
            </Text>
            <TouchableOpacity>
              <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
                Commander
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.productsDetailsFormat]}>
          <View style={{ width: "100%", height: 200 }}>
            <ImageSlider
              data={[
                {
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
                },
                {
                  img: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
                },
                {
                  img: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
                },
              ]}
              autoPlay={true}
              closeIconColor="#fff"
              caroselImageStyle={{
                resizeMode: "cover",
                justifyContent: "center",
                alignSelf: "center",
              }}
              timer={2000}
            />
          </View>
          <View style={styles.format}>
            <Text style={{ fontWeight: "bold", color: Colors.colorWhite }}>
              Grand Format
            </Text>
            <Text style={{ fontWeight: "bold", color: Colors.colorWhite }}>
              {product.title}
            </Text>
          </View>
          <Text style={{ fontWeight: "400", color: Colors.colorWhite }}>
            Sauce, Pain, Sel, Oignon
          </Text>
          <View style={styles.priceCommande}>
            <Text style={{ color: Colors.colorRed, fontWeight: "bold" }}>
              1000FCFA
            </Text>
            <TouchableOpacity>
              <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
                Commander
              </Text>
            </TouchableOpacity>
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
  },
  productsDetailsView: {
    padding: 25,
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
