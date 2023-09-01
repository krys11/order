import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { onLogin } from "../../firebase/Firebase";

//Toast
import Toast from "react-native-toast-message";
//Context
import { MyContext } from "../../context/MyContext";

const Login = () => {
  //variables
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { auth, setChangeStat } = useContext(MyContext);
  const navigation = useNavigation();

  //useEffect
  useEffect(() => {
    if (auth.currentUser) {
      setChangeStat(true);
    } else {
      setChangeStat(false);
    }
  }, []);

  const changeEmail = (txt) => {
    setEmail(txt);
  };

  const changePassword = (txt) => {
    setPassword(txt);
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "Connecter 👋",
    });
  };

  const userLogin = async () => {
    try {
      const UserCredential = await onLogin(email, password);
      // dataNavBottomNav.setSeeNavIconBottom(true);
      if (UserCredential) {
        console.log("Login:::: ", UserCredential);
        showToast();
        // setLoginData(data);
        // setLoader(false);
        // setSeeNavIconBottom(true);
        // presentToast("Login success", 5000, "bottom", "success");
      } //else {
      //         try {
      //           await onSendEmailVerification(UserCredential.user);
      //           setLoginData(data);
      //           setLoader(false);
      //           presentToast(
      //             "Check for mail to confirme your Email for continious",
      //             5000,
      //             "bottom",
      //             "danger"
      //           );
      //         } catch (error) {
      //           setLoader(false);
      //           presentToast("Wait 10 second", 5000, "bottom", "danger");
      //         }
      //       }
    } catch (error) {
      console.log(error.message);
      // setLoader(false);
      // presentToast(`${error.message}`, 5000, "bottom", "danger");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Toast />
        <Text>Login</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Go Register</Text>
        </TouchableOpacity>

        <View>
          <TextInput
            placeholder="Email"
            onChangeText={(txt) => changeEmail(txt)}
          />
          <TextInput
            placeholder="Mot de passe"
            onChangeText={(txt) => changePassword(txt)}
          />
          <TouchableOpacity onPress={userLogin}>
            <Text>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Login;
