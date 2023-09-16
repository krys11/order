import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { onSignOut } from "../../firebase/Firebase";

//Toast
import Toast from "react-native-toast-message";

//context
import { MyContext } from "../../context/MyContext";

//color
import { Colors } from "../../constant/Colors";

const Account = () => {
  const { menu } = useContext(MyContext);

  const [newPassword, setNewPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [disableTouchable, setDisableTouchable] = useState();

  const ChangePassword = async () => {
    console.log("first");
    // setActivityIndicator(true);
    // setDisableTouchable(true);
  };

  const logOut = async () => {
    try {
      await onSignOut();
    } catch (error) {
      let er;
      console.log(error);
      if (error.code === "auth/network-request-failed") {
        er = "Vérifier votre connexion internet";
        setErrMsg(er);
      }
    }
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

  //useEffect
  useEffect(() => {
    if (newPassword.length != 0) {
      setDisableTouchable(false);
    } else {
      setDisableTouchable(true);
    }
  }, [newPassword]);

  useEffect(() => {
    if (errMsg !== "") {
      showToastError(errMsg);
    }
    setErrMsg("");
  }, [errMsg]);

  const btnChangePassword = !activityIndicator ? (
    <Text style={{ color: Colors.colorWhite }}>Changer Mot de Passe</Text>
  ) : (
    <ActivityIndicator animated={activityIndicator} color={Colors.colorWhite} />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Toast />
        <View style={styles.userDetailsView}>
          <Image
            source={menu[0].img1}
            resizeMode="cover"
            style={styles.imgAccount}
          />
          <Text style={{ color: Colors.colorWhite, marginVertical: 10 }}>
            Nom Prenom
          </Text>
          <Text style={{ color: Colors.colorWhite }}>Telephone</Text>
        </View>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.passwordChangeView}>
            <TextInput
              value={newPassword}
              style={styles.inputZone}
              placeholder="Votre nouveau mot de passe"
              onChangeText={(txt) => setNewPassword(txt)}
            />
            <TouchableOpacity
              style={styles.btnChangePassword}
              onPress={ChangePassword}
              disabled={disableTouchable}
            >
              {btnChangePassword}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.listParams}>
          <TouchableOpacity>
            <Text style={{ color: Colors.colorWhite, marginBottom: 70 }}>
              A propos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLOgout} onPress={() => logOut()}>
            <Text style={{ color: Colors.colorWhite }}>Se Deconnecter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: Colors.colorBlack,
    padding: 20,
  },
  userDetailsView: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.colorWhite,
    padding: 15,
  },
  imgAccount: {
    width: 125,
    height: 125,
    borderRadius: 999,
  },
  passwordChangeView: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    backgroundColor: Colors.colorBlackAlpha,
    marginVertical: 35,
  },
  inputZone: {
    backgroundColor: Colors.colorWhite,
    height: 40,
    width: 300,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.colorBlack,
  },
  btnChangePassword: {
    backgroundColor: Colors.colorRed,
    height: 35,
    width: 300,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  listParams: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "relative",
    bottom: 30,
  },
  btnLOgout: {
    backgroundColor: Colors.colorRed,
    height: 35,
    width: 300,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Account;
