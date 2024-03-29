import React from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constant/Colors";

export default function IconComponent() {
  const navigation = useNavigation();
  return (
    <IconButton
      icon="arrow-left-bold"
      iconColor={Colors.colorBlack}
      size={35}
      onPress={() => navigation.goBack()}
    />
  );
}
