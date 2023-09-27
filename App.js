import React, { useEffect, useState, useLayoutEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./routes/StackNavigator";
import BottomTabNavigator from "./routes/TabNavigator";
//contxt
import { MyContext } from "./context/MyContext";
//firebase
import { app, getUserData } from "./firebase/Firebase";
//firebase auth
import { getAuth, onAuthStateChanged } from "firebase/auth";
//img
import logoDefault from "./img/logo_default.jpeg";
//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screenloader from "./screens/screenLoader/Screenloader";

export default function App() {
  const auth = getAuth(app);
  const [data, setData] = useState();
  const [dataLogin, setDataLogin] = useState();
  const [userUID, setUserUID] = useState();
  const [loading, setLoading] = useState();
  // console.log("app::::::::::::", userUID);

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
    console.log("1");
    async function getDataAsyncLocal() {
      try {
        const nameLocalAsyncVariable = await AsyncStorage.getItem("userUid");
        if (nameLocalAsyncVariable !== null) {
          setUserUID(`${nameLocalAsyncVariable}`);
        } else {
          if (auth.currentUser?.uid) {
            try {
              const dataCheck = await getUserData(data.uid);
              setDataLogin(dataCheck.data());
              setLoading(true);
            } catch (error) {
              console.log("premier use:::", error);
            }
          } else {
            console.log("personne");
            setLoading(true);
            // if (!data) {
            //   setLoading(true);
            // }
          }
        }
      } catch (error) {
        console.log("AsynApp::::::", error);
      }
    }

    getDataAsyncLocal();
  }, []);

  useLayoutEffect(() => {
    console.log("2");
    async function checkData() {
      if (userUID) {
        try {
          const dataCheck = await getUserData(userUID);
          // console.log("datacheck::::", dataCheck.data());
          setDataLogin(dataCheck.data());
          setLoading(true);
        } catch (error) {
          console.log("second use:::", error);
        }
      } else {
        return;
      }
    }

    checkData();
  }, [userUID]);

  // useEffect(() => {
  //   console.log("3");
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setData(user);
  //     } else {
  //       if (!data) {
  //         setLoading(true);
  //       }
  //     }
  //   });
  // });

  if (!loading) {
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
          dataLogin,
          setDataLogin,
          userUID,
          setUserUID,
        }}
      >
        <NavigationContainer>
          {dataLogin ? <BottomTabNavigator /> : <MainStackNavigator />}
        </NavigationContainer>
      </MyContext.Provider>
    );
  }
}
