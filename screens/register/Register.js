import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//firebase function
import { onRegister, setUserCollection } from "../../firebase/Firebase";
//navigation
import { useNavigation } from "@react-navigation/native";
//components
import TextinputComponent from "../../components/TextinputComponent";
//Toast
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
//img
import imgLogoDefault from "../../assets/img/logo_default.jpeg";
//Color
import { Colors } from "../../constant/Colors";
//react native paper
import {
  TextInput,
  Button,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
//lottie animmation
import LottieView from "lottie-react-native";

//costum config Toast
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

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
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
          try {
            await setUserCollection(UserCredential.user.uid, {
              email,
              tel,
              name,
            });
            setActivityIndicator(false);
            setDisableTouchable(true);
            cleanVariable();
            showToastSuccess();
          } catch (error) {
            console.log("Register:::::", error);
          }
        } else {
          return;
        }
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
      name.length !== 0 &&
      email.length !== 0 &&
      tel.length !== 0 &&
      password.length !== 0 &&
      password2.length !== 0
    ) {
      setDisableTouchable(false);
    } else {
      setDisableTouchable(true);
    }
  }, [email, password, name]);

  useEffect(() => {
    if (errMsg !== "") {
      showToastError(errMsg);
    }
    setErrMsg("");
  }, [errMsg]);

  //btnSinscrire
  const btnSinscrire = activityIndicator ? (
    <ActivityIndicator animating={true} size="small" color={MD2Colors.white} />
  ) : (
    <Button
      icon="lock-outline"
      mode="contained"
      style={styles.largeur}
      onPress={userRegister}
      buttonColor={Colors.colorBlack}
    >
      Inscription
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
          label="Prénom"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="flat"
          style={styles.textinput}
          textColor={Colors.colorBlack}
          outlineColor={Colors.colorBlack}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="flat"
          style={styles.textinput}
          // secureTextEntry={true}
          textColor={Colors.colorBlack}
          outlineColor={Colors.colorBlack}
        />
        <TextInput
          label="Téléphone"
          value={tel}
          onChangeText={(text) => setTel(text)}
          mode="flat"
          style={styles.textinput}
          textColor={Colors.colorBlack}
          outlineColor={Colors.colorBlack}
        />
        <TextInput
          label="Créer un mot de passe"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="flat"
          style={styles.textinput}
          secureTextEntry={true}
          textColor={Colors.colorBlack}
          outlineColor={Colors.colorBlack}
        />
        <TextInput
          label="Confimer votre mot de passe"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          mode="flat"
          style={styles.textinput}
          secureTextEntry={true}
          textColor={Colors.colorBlack}
          outlineColor={Colors.colorBlack}
        />

        {btnSinscrire}
        {/* <Text
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
              Prénom
            </Text>

            <TextinputComponent
              value={name}
              placeholder="Prénom"
              setValue={setName}
            />
          </View>
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
          {btnSeConnecter}
        </TouchableOpacity> */}
      </View>

      {/* <View style={styles.footer}>
        <Text style={styles.textColorWhite}>Vous avez deja un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textColorRed}>Connectez vous</Text>
        </TouchableOpacity>
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
    height: 550,
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

export default Register;
