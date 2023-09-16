import { KkiapayProvider } from "@kkiapay-org/react-native-sdk";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constant/Colors";
import { MyContext } from "../../context/MyContext";
import { useNavigation } from "@react-navigation/native";

const Home = ({ route }) => {
  const { menu } = useContext(MyContext);
  const navigation = useNavigation();

  const itemsMenu = menu.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.itemView}
        key={index}
        onPress={() => navigation.navigate("Product Details", { id: item.id })}
      >
        <Image source={item.img1} resizeMode="cover" style={styles.img} />
        <Text style={styles.itemName}>{item.title}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listMenu}>{itemsMenu}</View>
      <Text style={styles.itemName}>Commande Rapide:</Text>
      <View style={styles.commandeRapideContainer}>
        <View style={styles.commandeRapideView}>
          <View style={styles.productDetails}>
            <Image source={menu[0].img1} style={styles.img} />
            <View style={styles.details}>
              <Text style={styles.productName}>Pizza Mexicaine</Text>
              <Text style={styles.detailsView}>Details...</Text>
            </View>
            <Text style={{ color: Colors.colorRed }}>Format</Text>
          </View>
          <View style={styles.productPriceCommande}>
            <Text style={styles.productPrice}>2000FCFA</Text>
            <TouchableOpacity>
              <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
                Commander
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.commandeRapideView}>
          <View style={styles.productDetails}>
            <Image source={menu[0].img1} style={styles.img} />
            <View style={styles.details}>
              <Text style={styles.productName}>Pizza Mexicaine</Text>
              <Text style={styles.detailsView}>Details...</Text>
            </View>
            <Text style={{ color: Colors.colorRed }}>Format</Text>
          </View>
          <View style={styles.productPriceCommande}>
            <Text style={styles.productPrice}>2000FCFA</Text>
            <TouchableOpacity>
              <Text style={{ color: Colors.colorGreen, fontWeight: "bold" }}>
                Commander
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.commandeRapideView}>
          <View style={styles.productDetails}>
            <Image source={menu[0].img1} style={styles.img} />
            <View style={styles.details}>
              <Text style={styles.productName}>Pizza Mexicaine</Text>
              <Text style={styles.detailsView}>Details...</Text>
            </View>
            <Text style={{ color: Colors.colorRed }}>Format</Text>
          </View>
          <View style={styles.productPriceCommande}>
            <Text style={styles.productPrice}>2000FCFA</Text>
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
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: Colors.colorBlack,
    padding: 30,
  },
  listMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    backgroundColor: Colors.colorBlackAlpha,
    marginBottom: 20,
  },
  itemView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  img: {
    width: 125,
    height: 125,
    borderRadius: 999,
  },
  itemName: {
    color: Colors.colorWhite,
    fontWeight: "bold",
    paddingTop: 5,
  },
  commandeRapideContainer: {
    marginBottom: 50,
  },
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
  details: {
    marginLeft: 15,
  },
  productName: {
    color: Colors.colorWhite,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
  detailsView: {
    color: Colors.colorWhite,
  },
  productPriceCommande: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  productPrice: {
    color: Colors.colorRed,
    position: "relative",
    left: 20,
  },
});

export default Home;
