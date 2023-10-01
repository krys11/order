import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
//mycontext
import React, { useContext, Fragment } from "react";
//Kkiapay
import { KkiapayProvider } from "@kkiapay-org/react-native-sdk";
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

  //item and click view details
  const itemsMenu = menu.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.itemView}
        key={index}
        onPress={() => navigation.navigate("Product Details", { id: item.id })}
      >
        <Image source={item.img0} resizeMode="cover" style={styles.img} />
        <Text style={styles.itemName}>{item.title}</Text>
      </TouchableOpacity>
    );
  });

  //item and click view details
  const itemsCommandeRapide = menu.map((item, index) => {
    const itemformat = [
      { key: "0", value: item.format[0].nom },
      { key: "1", value: item.format[1].nom },
      { key: "2", value: item.format[2].nom },
    ];
    const itemPrice = [
      item.format[0].price,
      item.format[1].price,
      item.format[2].price,
    ];

    return (
      <Fragment key={index}>
        <Comanderapidecomponent
          item={item}
          itemformat={itemformat}
          itemPrice={itemPrice}
        />
      </Fragment>
    );
  });

  return (
    <KkiapayProvider>
      <ScrollView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.listMenu}>{itemsMenu}</View>
          <Text style={styles.itemName}>Commande Rapide:</Text>
          <View style={styles.commandeRapideContainer}>
            {itemsCommandeRapide}
          </View>
        </View>
      </ScrollView>
    </KkiapayProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: Colors.colorBlack,
    padding: 20,
  },
  viewContainer: {
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
