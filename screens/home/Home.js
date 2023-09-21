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

//Color
import { Colors } from "../../constant/Colors";
//context
import { MyContext } from "../../context/MyContext";
//navigation
import { useNavigation } from "@react-navigation/native";
//components
import Comanderapidecomponent from "../../components/Comanderapidecomponent";

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
    <KkiapayProvider>
      <ScrollView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.listMenu}>{itemsMenu}</View>
          <Text style={styles.itemName}>Commande Rapide:</Text>
          <View style={styles.commandeRapideContainer}>
            <Comanderapidecomponent />
            <Comanderapidecomponent />
          </View>
        </View>
      </ScrollView>
    </KkiapayProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorBlack,
  },
  viewContainer: {
    flex: 1,
    padding: 20,
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
  commandeRapideContainer: {},
});
export default Home;
