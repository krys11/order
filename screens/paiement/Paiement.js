import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import { Colors } from "../../constant/Colors";
import { useState } from "react";
import TextinputComponent from "../../components/TextinputComponent";
import TestComponent from "../../components/Testcomponents";
import { KkiapayProvider } from "@kkiapay-org/react-native-sdk";
import Activityindicatorcomponent from "../../components/Activityindicatorcomponent";

export default function Paiement() {
  const [priceTotal, setPriceTotal] = useState();
  const [nombre, setNombre] = useState("0");
  const { menu, updateVariableUser } = useContext(MyContext);
  const { params } = useRoute();

  return (
    <KkiapayProvider>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: Colors.colorGreen,
          padding: 20,
        }}
      >
        <Text>{`${params.title}(${params.item.nom})`}</Text>
        <Text>{params.item.price} FCFA</Text>
        <TextinputComponent
          label="Nombres"
          value={nombre}
          setValue={setNombre}
          textContentType="telephoneNumber"
          keyboardType="numeric"
        />
        <Text>
          Prix Total :{" "}
          {nombre ? `${params.item.price * parseInt(nombre)} FCFA` : "0 FCFA"}
        </Text>
        {updateVariableUser ? (
          <Activityindicatorcomponent />
        ) : (
          <TestComponent
            nombre={nombre}
            itemPrice={params.item.price}
            itemTitle={params.title}
            itemFormat={params.item.nom}
            setNombre={setNombre}
          />
        )}
      </View>
    </KkiapayProvider>
  );
}
