import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
//mycontext
import React, {
  useContext,
  Fragment,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
//Kkiapay
import { KkiapayProvider } from "@kkiapay-org/react-native-sdk";
//Color
import { Colors } from "../../../constant/Colors";
//context
import { MyContext } from "../../../context/MyContext";
//navigation
import { useNavigation } from "@react-navigation/native";
//components
import { ToastConfig } from "../../../components/Toastcomponent";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/Firebase";
import { ActivityIndicator } from "react-native-paper";
import Lottiecomponents from "../../../components/Lottiecomponents";
import Screenloader from "../../screenLoader/Screenloader";

const HomeAdmin = ({ route }) => {
  const { menu, valueUser } = useContext(MyContext);
  const navigation = useNavigation();
  const [datas, setDatas] = useState();
  // const commanderecue = datas ? datas["commanderecue"] : "";

  // console.log("commanderecue:::", commanderecue[0]);

  const sendNotification = async (index) => {
    const message = {
      to: datas["commanderecue"][index].notifiactionToken,
      sound: "default",
      title: "Chawarma",
      body: "Votre commande est prête passez prendre tant que c'est encore toute chaude",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  useLayoutEffect(() => {
    const unsub = onSnapshot(collection(db, "admin"), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setDatas(documents[0]);
    });

    return () => unsub();
  }, []);

  const ViewUser = datas ? (
    datas["commanderecue"].map((data, i) => {
      const commanderecue = datas["commanderecue"];
      return (
        <TouchableOpacity key={i}>
          <Text>Commande: {i + 1}</Text>
          <Text>date: {commanderecue[i].facture.client}</Text>
          <Text>date: {commanderecue[i].facture.date}</Text>
          <Text>
            format: {commanderecue[i].facture.name}(
            {commanderecue[i].facture.format}){" "}
          </Text>
          <Text>heure: {commanderecue[i].facture.heure}</Text>
          <Text>montant: {commanderecue[i].facture.montant}</Text>
          <Text>name: {commanderecue[i].facture.name}</Text>
          <Text>nombres: {commanderecue[i].facture.nombres}</Text>
          <Button
            title="Commande Terminée"
            onPress={async () => await sendNotification(i)}
          />
          <Text>------------------</Text>
        </TouchableOpacity>
      );
    })
  ) : (
    <Text>Pas de commande</Text>
  );

  if (datas) {
    return (
      <View style={{ marginTop: 50 }}>
        <Text>Commande des Users</Text>
        <ScrollView>{ViewUser}</ScrollView>
      </View>
    );
  } else {
    return <Screenloader />;
  }
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: Colors.colorWhite,
    padding: 10,
  },
  viewContainer: {
    padding: 10,
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
    width: 150,
    height: 150,
    borderRadius: 999,
  },
  itemName: {
    color: Colors.colorWhite,
    fontWeight: "bold",
    paddingTop: 5,
  },
  commandeRapideContainer: {},
});
export default HomeAdmin;
