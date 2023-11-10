import { View, Keyboard, Alert, Platform } from "react-native";
import React, { useState, useEffect } from "react";
//firebase function
import { onRegister, setCollectionData } from "../../firebase/Firebase";
//navigation
import { useNavigation } from "@react-navigation/native";
//components
import TextinputComponent from "../../components/TextinputComponent";
import Lottiecomponents from "../../components/Lottiecomponents";
import Btncomponents from "../../components/Btncomponents";
import Activityindicatorcomponent from "../../components/Activityindicatorcomponent";
import IconComponent from "../../components/IconComponent";
import {
  ToastConfig,
  showToastError,
  showToastSuccess,
} from "../../components/Toastcomponent";
//globales styles
import { GlobaleStyles } from "../../globaleStyles/GlobaleStyles";
//KeyboardAwareScrollView
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Notification
import * as Notification from "expo-notifications";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [tokenNotification, setTokenNotification] = useState();

  async function configurePushNotification() {
    const { status } = await Notification.getPermissionsAsync();
    let persmission = status;

    if (persmission !== "granted") {
      const { status } = await Notification.requestPermissionsAsync();
      persmission = status;
    }

    if (persmission !== "granted") {
      Alert.alert(
        "Notification Persmission",
        "Nous avons besoin des notifications pour cette App"
      );
      return;
    }
    const tokenData = await Notification.getExpoPushTokenAsync();
    // console.log(tokenData);
    setTokenNotification(tokenData.data);

    if (Platform.OS === "ios") {
      Notification.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notification.AndroidImportance.DEFAULT,
      });
    }
  }

  useEffect(() => {
    const getPermission = async () => await configurePushNotification();
    getPermission();
  }, []);

  //vider les champs
  const cleanVariable = () => {
    setName(""), setEmail(""), setTel(""), setPassword(""), setPassword2("");
  };

  //function Register
  const userRegister = async () => {
    let er;
    Keyboard.dismiss();
    setActivityIndicator(true);

    if (
      name.length !== 0 &&
      email.length !== 0 &&
      tel.length !== 0 &&
      password.length !== 0 &&
      password2.length !== 0
    ) {
      if (password === password2) {
        if (!tokenNotification) {
          await configurePushNotification();
        } else {
          try {
            const UserCredential = await onRegister(email.trim(), password);
            const dataUser = {
              userID: UserCredential.user.uid,
              name: name.trim(),
              email: email.trim(),
              tel: tel.trim(),
              commande: [],
              facture: [],
              notifiactionToken: tokenNotification,
            };
            try {
              await setCollectionData(
                "users",
                UserCredential.user.uid,
                dataUser
              );
              setActivityIndicator(false);
              cleanVariable();
              showToastSuccess("Compte Créé avec succes👋");
            } catch (error) {
              setActivityIndicator(false);
              console.log("errorRegister2::::", error);
            }
          } catch (error) {
            setActivityIndicator(false);
            console.log("errorRegister1::::", error.code);
            if (error.code === "auth/wrong-password") {
              er = "Mot de passe incorrect";
              setErrMsg(er);
            } else if (error.code === "auth/weak-password") {
              er = "Le mot de passe doit depasser de 6 lettres";
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
            } else if (error.code === "ERR_BAD_REQUEST") {
              er = "Vérifier vos informations de connexion";
              setErrMsg(er);
            }
          }
        }
      } else {
        setActivityIndicator(false);
        er = "Les deux mots de passe doivent etre conforme";
        setErrMsg(er);
      }
    } else {
      setActivityIndicator(false);
      er = "Veillez remplire tous les champs";
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

  //btnSinscrire
  const btnSinscrire = activityIndicator ? (
    <Activityindicatorcomponent />
  ) : (
    <Btncomponents onPress={userRegister}>Inscription</Btncomponents>
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <Lottiecomponents />
      <View style={{ marginVertical: 150 }}>
        <View style={GlobaleStyles.container}>
          <View style={[GlobaleStyles.section, { height: 450 }]}>
            <TextinputComponent
              label="Prénom"
              value={name}
              setValue={setName}
            />
            <TextinputComponent
              label="Email"
              value={email}
              setValue={setEmail}
            />
            <TextinputComponent
              label="Téléphone"
              value={tel}
              setValue={setTel}
            />
            <TextinputComponent
              label="Créer un mot de passe"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />
            <TextinputComponent
              label="Confimer votre mot de passe"
              value={password2}
              setValue={setPassword2}
              secureTextEntry={true}
            />

            {btnSinscrire}
          </View>

          <Btncomponents
            onPress={() => navigation.navigate("Login")}
            mode="contained-tonal"
            style={GlobaleStyles.btncustom}
          >
            Se Connecter
          </Btncomponents>
          <IconComponent />
        </View>
      </View>
      <ToastConfig />
    </KeyboardAwareScrollView>
  );
};

export default Register;
