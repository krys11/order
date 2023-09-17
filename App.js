import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./routes/StackNavigator";
import BottomTabNavigator from "./routes/TabNavigator";

//contxt
import { MyContext } from "./context/MyContext";
//firebase
import { auth } from "./firebase/Firebase";
//firebase auth
import { onAuthStateChanged } from "firebase/auth";
//img
import logoDefault from "./img/logo_default.jpeg";

export default function App() {
  const [data, setData] = useState([]);

  const menu = [
    {
      id: "1",
      title: "Pizza",
      img1: logoDefault,
      img2: logoDefault,
      img3: logoDefault,
      img4: "logo_default.jpeg",
      img5: "logo_default.jpeg",
      img6: "logo_default.jpeg",
    },
    {
      id: "2",
      title: "Lait",
      img1: logoDefault,
      img2: logoDefault,
      img3: logoDefault,
    },
    {
      id: "3",
      title: "Fruit",
      img1: logoDefault,
      img2: logoDefault,
      img3: logoDefault,
    },
    {
      id: "4",
      title: "Jus",
      // img1: "./img/logo_default.jpeg",
      // img2: "./img/logo_default.jpeg",
      // img3: "./img/logo_default.jpeg",
      img1: logoDefault,
      img2: logoDefault,
      img3: logoDefault,
    },
    {
      id: "5",
      title: "Sucre",
      img1: logoDefault,
      img2: logoDefault,
      img3: logoDefault,
    },
    {
      id: "6",
      title: "Pain",
      img1: logoDefault,
      img2: logoDefault,
      img3: logoDefault,
    },
  ];

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setData(user);
    });
  });

  return (
    <MyContext.Provider value={{ auth, menu }}>
      <NavigationContainer>
        {data ? <BottomTabNavigator /> : <MainStackNavigator />}
      </NavigationContainer>
    </MyContext.Provider>
  );
}
