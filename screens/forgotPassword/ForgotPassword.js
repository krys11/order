import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { onResetPassword } from "../../firebase/Firebase";

//Toast
import Toast from "react-native-toast-message";

//img
import imgLogoDefault from "../../img/logo_default.jpeg";

//Color
import { Colors } from "../../constant/Colors";

const ForgotPassword = () => {
  //variables
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [disableTouchable, setDisableTouchable] = useState();

  //vider les champs
  const cleanVariable = () => {
    setEmail("");
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

  //function de reset mot de passe
  const userPasswordForget = async () => {
    let er;
    setActivityIndicator(true);
    setDisableTouchable(true);
    Keyboard.dismiss();

    try {
      await onResetPassword(email);
      cleanVariable();
      showToastSuccess();
    } catch (error) {
      setActivityIndicator(false);
      setDisableTouchable(false);
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        er = "Email incorrect";
        setErrMsg(er);
      } else if (error.code === "auth/user-not-found") {
        er = "Utilisateur Introuvable";
        setErrMsg(er);
      } else if (error.code === "auth/missing-email") {
        er = "Veillez remplir le champ d'Email";
        setErrMsg(er);
      } else if (error.code === "auth/too-many-requests") {
        er = "Patienter un peu, serveur occuper";
        setErrMsg(er);
      } else if (error.code === "auth/network-request-failed") {
        er = "Vérifier votre connexion internet";
        setErrMsg(er);
      }
    }
  };

  //useEffect
  useEffect(() => {
    if (email.length !== 0) {
      setDisableTouchable(false);
    } else {
      setDisableTouchable(true);
    }
  }, [email]);

  useEffect(() => {
    if (errMsg !== "") {
      showToastError(errMsg);
    }
    setErrMsg("");
  }, [errMsg]);

  //btn option
  const btnReset = !activityIndicator ? (
    <Text style={[styles.textColorWhite, styles.textBold]}>Soumettre</Text>
  ) : (
    <ActivityIndicator animated={activityIndicator} color={Colors.colorWhite} />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Toast />
        <View style={styles.viewImage}>
          <Image source={imgLogoDefault} style={styles.imgLogo} />
        </View>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.containerZone}>
            <Text
              style={[
                styles.textColorWhite,
                styles.textBold,
                styles.textConnectionSize,
              ]}
            >
              Reinitialisation
            </Text>
            <View>
              <View style={styles.inputViewMargin}>
                <Text style={[styles.textColorWhite, styles.textMargin]}>
                  Email
                </Text>

                <TextInput
                  value={email}
                  placeholder="Email"
                  onChangeText={(txt) => setEmail(txt)}
                  style={styles.inputZone}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnRegiste}
              onPress={userPasswordForget}
              disabled={disableTouchable}
            >
              {btnReset}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.textColorRed}>Connectez vous ! </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.textColorWhite}>
              Vous avez besoin d'aide ?{" "}
            </Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: Colors.colorBlack,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  viewImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  imgLogo: {
    height: 150,
    width: 150,
  },
  textColorWhite: {
    color: Colors.colorWhite,
  },
  textColorRed: {
    color: Colors.colorRed,
  },
  textBold: {
    fontWeight: "bold",
  },
  textConnectionSize: {
    fontSize: 30,
  },
  containerZone: {
    backgroundColor: Colors.colorBlackAlpha,
    width: 350,
    height: 250,
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.colorBlack,
  },
  inputViewMargin: {
    marginBottom: 20,
  },
  textMargin: {
    paddingBottom: 5,
  },
  inputZone: {
    backgroundColor: Colors.colorWhite,
    height: 40,
    width: 300,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  btnRegiste: {
    backgroundColor: Colors.colorRed,
    height: 35,
    width: 300,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    position: "relative",
    bottom: 40,
    //justifyContent: "center",
  },
});

export default ForgotPassword;
