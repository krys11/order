import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { onRegister } from "../../firebase/Firebase";
//Toast
import Toast from "react-native-toast-message";

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [desable, setDesable] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  //Toast message
  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Enregistrement reussi, rendez sur la page de connexion 👋",
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

  const userRegister = async () => {
    try {
      const UserCredential = await onRegister(email, password);
      if (UserCredential) {
        showToastSuccess();
      }
      setLoader(false);
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        er = "Mot de passe incorrect";
        setErrMsg(er);
        //showToastError(errMsg);
      } else if (error.code === "auth/weak-password") {
        er = "Votre mot de passe doit depasser de six(6) lettres";
        setErrMsg(er);
        //showToastError(errMsg);
      } else if (error.code === "auth/email-already-in-use") {
        er = "Cet email est deja utiliser";
        setErrMsg(er);
        //showToastError(errMsg);
      } else if (error.code === "auth/invalid-email") {
        er = "Email incorrect";
        setErrMsg(er);
        //showToastError(errMsg);
      } else if (error.code === "auth/too-many-requests") {
        er = "Patienter un peu, serveur occuper";
        setErrMsg(er);
        //showToastError(errMsg);
      }
    }
  };

  //useEffect
  useEffect(() => {
    if (email.length != 0 && password.length > 6) {
      setDesable(false);
    } else {
      setDesable(true);
    }
  }, [email, password]);

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
        <View>
          <Text>Register</Text>
        </View>

        <View>
          <TextInput
            placeholder="Email"
            onChangeText={(txt) => setEmail(txt)}
          />
          <TextInput
            placeholder="Mot de passe"
            onChangeText={(txt) => setPassword(txt)}
          />
          <TouchableOpacity onPress={userRegister}>
            <Text>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Forgotpassword")}>
          <Text>Go Forgot Password</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Register;
