import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//firebase function
import { onRegister } from "../../firebase/Firebase";
//navigation
import { useNavigation } from "@react-navigation/native";
//components
import TextinputComponent from "../../components/TextinputComponent";
//Toast
import Toast from "react-native-toast-message";
//img
import imgLogoDefault from "../../img/logo_default.jpeg";
//Color
import { Colors } from "../../constant/Colors";

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [disableTouchable, setDisableTouchable] = useState();

  //vider les champs
  const cleanVariable = () => {
    setEmail(""), setTel(""), setPassword(""), setPassword2("");
  };

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

  //function Register
  const userRegister = async () => {
    let er;
    Keyboard.dismiss();

    if (password === password2) {
      setActivityIndicator(true);
      setDisableTouchable(true);
      try {
        const UserCredential = await onRegister(email, password);
        if (UserCredential) {
          setActivityIndicator(false);
          setDisableTouchable(true);
          cleanVariable();
          showToastSuccess();
        }
        setLoader(false);
      } catch (error) {
        setActivityIndicator(false);
        setDisableTouchable(false);
        console.log(error.code);
        if (error.code === "auth/wrong-password") {
          er = "Mot de passe incorrect";
          setErrMsg(er);
        } else if (error.code === "auth/weak-password") {
          er = "Votre mot de passe doit depasser de six(6) lettres";
          setErrMsg(er);
        } else if (error.code === "auth/email-already-in-use") {
          er = "Cet email est deja utiliser";
          setErrMsg(er);
        } else if (error.code === "auth/invalid-email") {
          er = "Email incorrect";
          setErrMsg(er);
        } else if (error.code === "auth/too-many-requests") {
          er = "Patienter un peu, serveur occuper";
          setErrMsg(er);
        } else if (error.code === "auth/network-request-failed") {
          er = "Vérifier votre connexion internet";
          setErrMsg(er);
        }
      }
    } else {
      setActivityIndicator(false);
      setDisableTouchable(false);
      er = "Les deux mots de passe doivent etre conforme";
      setErrMsg(er);
    }
  };

  //useEffect
  useEffect(() => {
    if (
      email.length != 0 &&
      tel.length != 0 &&
      password.length &&
      password2.length
    ) {
      setDisableTouchable(false);
    } else {
      setDisableTouchable(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (errMsg !== "") {
      showToastError(errMsg);
    }
    setErrMsg("");
  }, [errMsg]);

  //btn option
  const btnRegister = !activityIndicator ? (
    <Text style={[styles.textColorWhite, styles.textBold]}>S'inscrire</Text>
  ) : (
    <ActivityIndicator animated={activityIndicator} color={Colors.colorWhite} />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewRegister}>
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
                Inscription
              </Text>
              <View>
                <View style={styles.inputViewMargin}>
                  <Text style={[styles.textColorWhite, styles.textMargin]}>
                    Email
                  </Text>

                  <TextinputComponent
                    value={email}
                    placeholder="Email"
                    setValue={setEmail}
                  />
                </View>
                <View style={styles.inputViewMargin}>
                  <Text style={[styles.textColorWhite, styles.textMargin]}>
                    Telephone
                  </Text>

                  <TextinputComponent
                    value={tel}
                    placeholder="Telephone"
                    setValue={setTel}
                  />
                </View>
                <View style={styles.inputViewMargin}>
                  <Text style={[styles.textColorWhite, styles.textMargin]}>
                    Mot de passe
                  </Text>

                  <TextinputComponent
                    value={password}
                    placeholder="Mot de passe"
                    setValue={setPassword}
                    secureTextEntry={true}
                  />
                </View>
                <View>
                  <Text style={[styles.textColorWhite, styles.textMargin]}>
                    Confirmer mot de passe
                  </Text>

                  <TextinputComponent
                    value={password2}
                    placeholder="Confirme mot de passe"
                    setValue={setPassword2}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.btnRegiste}
                onPress={userRegister}
                disabled={disableTouchable}
              >
                {btnRegister}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.footer}>
            <Text style={styles.textColorWhite}>
              Vous avez deja un compte ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.textColorRed}>Connectez vous</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorBlack,
  },
  viewRegister: {
    flex: 1,
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
    height: 500,
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputViewMargin: {
    marginBottom: 20,
  },
  textMargin: {
    paddingBottom: 5,
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
    bottom: 30,
    //justifyContent: "center",
  },
});

export default Register;
