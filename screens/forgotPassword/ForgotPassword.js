import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { onResetPassword } from "../../firebase/Firebase";
//Toast
import Toast from "react-native-toast-message";

const ForgotPassword = () => {
  //variables
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [desable, setDesable] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const userPasswordForget = async () => {
    try {
      await onResetPassword(email);
      showToastSuccess();
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        er = "Email incorrect";
        setErrMsg(er);
        //showToastError(errMsg);
      } else if (error.code === "auth/user-not-found") {
        er = "Utilisateur Introuvable";
        setErrMsg(er);
        //showToastError(errMsg);
      } else if (error.code === "auth/too-many-requests") {
        er = "Patienter un peu, serveur occuper";
        setErrMsg(er);
        //showToastError(errMsg);
      }
    }
  };

  //Toast message
  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Email envoyer, Verifier votre boite de reception email 👋",
      visibilityTime: 5000,
    });
  };

  const showToastError = (msg) => {
    Toast.show({
      type: "error",
      text1: msg + " 👋",
      position: "top",
      visibilityTime: 5000,
    });
  };

  //useEffect
  useEffect(() => {
    if (email.length != 0) {
      setDesable(false);
    } else {
      setDesable(true);
    }
  }, [email]);

  useEffect(() => {
    if (errMsg !== "") {
      showToastError(errMsg);
    }
    setErrMsg("");
  }, [errMsg]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Toast />
        <Text>ForgotPassword</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>GoBack</Text>
        </TouchableOpacity>
        <View>
          <TextInput
            placeholder="Email"
            onChangeText={(txt) => setEmail(txt)}
          />
          <TouchableOpacity onPress={userPasswordForget}>
            <Text>Reinitialiser</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;
