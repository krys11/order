import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
//navigation
import { useNavigation } from "@react-navigation/native";
//firebase function
import { onLogin } from "../../firebase/Firebase";
//components
import TextinputComponent from "../../components/TextinputComponent";
//img
import imgLogoDefault from "../../assets/img/logo_default.jpeg";
//Toast
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
//Color
import { Colors } from "../../constant/Colors";
//context
import { MyContext } from "../../context/MyContext";
//Firestore
import { getUserData } from "../../firebase/Firebase";
//react native paper
import {
  TextInput,
  Button,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
//lottie animmation
import LottieView from "lottie-react-native";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: Colors.colorBlack,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: Colors.colorWhite,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: Colors.colorBlack,
      }}
      text1Style={{
        fontSize: 15,
        color: Colors.colorWhite,
      }}
      text2Style={{
        fontSize: 15,
        color: Colors.colorWhite,
      }}
    />
  ),
};

const Login = () => {
  const { setDataLogin } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [disableTouchable, setDisableTouchable] = useState(false);

  //vider les champs
  const cleanVariable = () => {
    setEmail(""), setPassword("");
  };

  //navigation
  const navigation = useNavigation();

  //Toast message
  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "Connecter 👋",
      visibilityTime: 5000,
    });
  };

  //notification
  const showToastError = (msg) => {
    Toast.show({
      type: "error",
      text1: msg + " 👋",
      position: "top",
      visibilityTime: 5000,
    });
  };

  //save user UID LOCAL
  const saveUserUIDLocal = async (useruid) => {
    try {
      await AsyncStorage.setItem("userUid", useruid);
    } catch (error) {
      console.log("AsynLogin::::::", error);
    }
  };

  //function login
  const userLogin = async () => {
    let er;
    Keyboard.dismiss();
    setActivityIndicator(true);

    if (email.length != 0 && password.length) {
      try {
        const UserCredential = await onLogin(email, password);
        if (UserCredential) {
          try {
            await saveUserUIDLocal(UserCredential.user.uid);
            try {
              const dataCheck = await getUserData(UserCredential.user.uid);
              console.log("Login:::: ", UserCredential);
              setDataLogin(dataCheck.data());
              setActivityIndicator(false);
              cleanVariable();
              showToastSuccess();
            } catch (error) {
              console.log("LoginErrorgetUserData:::::::::", error);
            }
          } catch (error) {
            console.log("LoginErrorAsyncSave::::::::", error);
          }
        }
      } catch (error) {
        setActivityIndicator(false);
        console.log(error.code);
        if (error.code === "auth/wrong-password") {
          er = "Mot de passe incorrect";
          setErrMsg(er);
        } else if (error.code === "auth/user-not-found") {
          er = "Utilisateur introuvable";
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
      er = "Veillez remplire les deux champs";
      setErrMsg(er);
    }
  };

  //useEffect
  useEffect(() => {
    if (errMsg !== "") {
      showToastError(errMsg);
    }
    setErrMsg("");
  }, [errMsg]);

  //btnSeConnecter
  const btnSeConnecter = activityIndicator ? (
    <ActivityIndicator animating={true} size="small" color={MD2Colors.white} />
  ) : (
    <Button
      icon="lock-outline"
      mode="contained"
      style={styles.largeur}
      onPress={userLogin}
      buttonColor={Colors.colorBlack}
    >
      Se connecter
    </Button>
  );

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        resizeMode="cover"
        source={require("../../assets/lotties/Burger_and_hot_dog.json")}
        style={styles.lottie}
      />
      <View style={styles.section}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="flat"
          style={styles.textinput}
          textColor={Colors.colorBlack}
          outlineColor={Colors.colorBlack}
        />

        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="flat"
          style={styles.textinput}
          secureTextEntry={true}
          textColor={Colors.colorBlack}
          outlineColor={Colors.colorBlack}
        />
        {btnSeConnecter}
      </View>
      {/* <View style={styles.viewLogin}>
        <View style={styles.viewImage}>
          <Image source={imgLogoDefault} style={styles.imgLogo} />
        </View>
        <KeyboardAvoidingView behavior="height">
          <View style={styles.containerZone}>
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
              <View>
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
            </View>
            <TouchableOpacity
              style={styles.btnConnect}
              onPress={userLogin}
              disabled={disableTouchable}
            >
              {btnLogin}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <View style={styles.footerRegsiter}>
            <Text style={styles.textColorWhite}>
              Vous n'avez pas de compte ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.textColorRed}>Creer un compte</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Forgotpassword")}
            style={styles.footerPassword}
          >
            <Text style={styles.textColorWhite}>Mot de passe oublier</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  section: {
    width: 300,
    height: 250,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textinput: {
    width: "90%",
    marginBottom: 10,
  },
  activity: {
    color: "red",
    backgroundColor: "red",
  },
});

export default Login;
