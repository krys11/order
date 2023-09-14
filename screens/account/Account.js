import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { onSignOut } from "../../firebase/Firebase";
import { MyContext } from "../../context/MyContext";

const Account = () => {
  const { setChangeStat } = useContext(MyContext);

  const logOut = async () => {
    try {
      await onSignOut();
      setChangeStat(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Account</Text>
        </View>
        <TouchableOpacity onPress={() => logOut()}>
          <Text>Se Deconnecter</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Account;
