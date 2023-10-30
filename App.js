import React, { useEffect, useState, useLayoutEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./routes/StackNavigator";
import BottomTabNavigator from "./routes/TabNavigator";
//contxt
import { MyContext } from "./context/MyContext";
//firebase
import { app, updateUserData } from "./firebase/Firebase";
//firebase auth
import { getAuth } from "firebase/auth";
//img
import logoDefault from "./assets/img/logo_default.jpeg";
//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screenloader from "./screens/screenLoader/Screenloader";
import axios from "axios";
import Instance from "./firebase/Instance";

export default function App() {
  const auth = getAuth(app);
  const [fireBaseDataLogin, setFireBaseDataLogin] = useState();
  const [authToken, setAuthToken] = useState();
  const [localDataLogin, setLocalDataLogin] = useState();
  const [userUID, setUserUID] = useState();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [badgeCommande, setBadgeCommande] = useState(false);
  const [badgeFacture, setBadgeFacture] = useState(false);
  const [loadingLocalAndFirebaseSave, setLoadingLocalAndFirebaseSave] =
    useState(false);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const valueUser = {
    token: authToken,
    isAuthnticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  console.log("app:::", valueUser.token);

  const [menu, setMenu] = useState([
    {
      id: "1",
      title: "Pizza",
      img0: logoDefault,
      format: [
        {
          nom: "Petit",
          price: 1000,
          details: "Petit, Sauce, Pain, Sel, Oignon",
          img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
          img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
          img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
        },
        {
          nom: "Moyen",
          price: 2000,
          details: "Moyen, Sauce, Pain, Sel, Oignon",
          img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
          img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
          img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
        },
        {
          nom: "Lage",
          price: 3000,
          details: "Lage, Sauce, Pain, Sel, Oignon",
          img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
          img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
          img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
        },
      ],
    },
    {
      id: "2",
      title: "Chawarma",
      img0: logoDefault,
      format: [
        {
          nom: "Petit",
          price: 1000,
          details: "Petit, Sauce, Pain, Sel, Oignon",
          img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
          img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
          img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
        },
        {
          nom: "Moyen",
          price: 2000,
          details: "Moyen, Sauce, Pain, Sel, Oignon",
          img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
          img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
          img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
        },
        {
          nom: "Lage",
          price: 3000,
          details: "Lage, Pain, Sel, Oignon",
          img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
          img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
          img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
        },
      ],
    },
  ]);

  const [commande, setCommande] = useState([]);

  const [facture, setFacture] = useState([]);

  useLayoutEffect(() => {
    async function getDataAsyncLocal() {
      console.log("1");
      if (!authToken) {
        const storeToken = await AsyncStorage.getItem("token");

        const res = await Instance.get("/users.json");
        for (const dataUser in res.data) {
          if (res.data[dataUser].id === storeToken) {
            console.log(res.data[dataUser]);
            setLocalDataLogin(res.data[dataUser]);
          }
          // console.log("id::::", res.data[dataUser].id);
        }
        // console.log(res.data);

        if (storeToken) {
          setAuthToken(storeToken);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        const res = await Instance.get("/users.json");
        for (const dataUser in res.data) {
          if (res.data[dataUser].id === authToken) {
            console.log(res.data[dataUser]);
            setLocalDataLogin(res.data[dataUser]);
            setAuthToken(authToken);
          }
        }
      }

      // try {
      //   const storeToken = await AsyncStorage.getItem("userData");
      //   const data = JSON.parse(storeToken);
      //   if (data !== null) {
      //     setUserUID(data.userID);
      //     setLocalDataLogin(data);
      //     setCommande(data.commande);
      //     setFacture(data.facture);
      //     setLoading(false);
      //   } else {
      //     setLoading(false);
      //     //   console.log("else");
      //     //   if (auth.currentUser?.uid) {
      //     //     try {
      //     //       const dataCheck = await getUserData(data.uid);
      //     //       setLocalDataLogin(dataCheck.data());
      //     //       setLoading(true);
      //     //     } catch (error) {
      //     //       console.log("premier use:::", error);
      //     //     }
      //     //   } else {
      //     //     console.log("personne");
      //     //     setLoading(true);
      //     //     if (!data) {
      //     //       setLoading(true);
      //     //     }
      //     //   }
      //   }
      // } catch (error) {
      //   console.log("App::getDataAsyncLocal::", error);
      // }
    }
    getDataAsyncLocal();
  }, [authToken]);

  /*Fetch Value on Document*/
  // const projectID = "order-4b768";
  // const key = "AIzaSyAovnZJ1crT3cKUKD4QF5tzjjh33J-9WxI";
  // const doc = "users";
  // const url = `https://firestore.googleapis.com/v1beta1/projects/${projectID}/databases/(default)/documents/${doc}?key=${key}`;
  // // Use fetch to request the API information
  // axios
  //   .get(url)
  //   .then((response) => console.log(response.data.documents[0].fields))
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // fetch(url)
  //   .then(response => response.json())
  //   .then(json => FireStoreParser(json))
  //   .then(json => console.log(json))

  // useEffect(() => {
  //   async function updateFactureCommande() {
  //     if (update) {
  //       console.log("3");
  //       const updateLocalStorage = {
  //         userID: userUID,
  //         email: localDataLogin.email,
  //         tel: localDataLogin.tel,
  //         name: localDataLogin.name,
  //         commande: commande,
  //         facture: facture,
  //       };

  //       const updateFirebaseStorage = {
  //         commande: commande,
  //         facture: facture,
  //       };

  //       try {
  //         await AsyncStorage.setItem(
  //           "userData",
  //           JSON.stringify(updateLocalStorage)
  //         );
  //         try {
  //           await updateUserData(userUID, updateFirebaseStorage);
  //           setUpdate(false);
  //           setLoadingLocalAndFirebaseSave(false);
  //           setBadgeCommande(true);
  //           setBadgeFacture(true);
  //           Alert.alert(
  //             "Commande",
  //             "Votre commande a été effectuée avec succes",
  //             [{ text: "OK" }]
  //           );
  //         } catch (error) {
  //           setUpdate(false);
  //           setLoadingLocalAndFirebaseSave(false);
  //           console.log("error clg2::::::", error);
  //         }
  //         console.log("save succes");
  //       } catch (error) {
  //         setUpdate(false);
  //         setLoadingLocalAndFirebaseSave(false);
  //         console.log("error clg3::::::", error);
  //       }
  //     }
  //   }

  //   updateFactureCommande();
  // }, [commande, facture]);

  if (loading) {
    return <Screenloader />;
  } else {
    return (
      <MyContext.Provider
        value={{
          auth,
          menu,
          setMenu,
          commande,
          setCommande,
          facture,
          setFacture,
          fireBaseDataLogin,
          setFireBaseDataLogin,
          localDataLogin,
          setLocalDataLogin,
          userUID,
          setUserUID,
          update,
          setUpdate,
          loadingLocalAndFirebaseSave,
          setLoadingLocalAndFirebaseSave,
          badgeCommande,
          setBadgeCommande,
          badgeFacture,
          setBadgeFacture,
          valueUser,
          setAuthToken,
        }}
      >
        <NavigationContainer>
          {/* {localDataLogin ? <BottomTabNavigator /> : <MainStackNavigator />} */}
          {valueUser.isAuthnticated && <BottomTabNavigator />}
          {!valueUser.isAuthnticated && <MainStackNavigator />}
        </NavigationContainer>
      </MyContext.Provider>
    );
  }
}
