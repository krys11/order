import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./routes/StackNavigator";
import BottomTabNavigator from "./routes/TabNavigator";
import DrawerNavigator from "./routes/DrawerNavigator";
import { MyContext } from "./context/MyContext";
import { auth } from "./firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [authCurrentExist, setAuthCurrentExist] = useState();
  const [user, setUser] = useState();
  const [data, setData] = useState();
  const [changeStat, setChangeStat] = useState(auth.currentUser ? true : false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setData(user);
    });
  });

  return (
    <MyContext.Provider value={{ auth, setChangeStat }}>
      <NavigationContainer>
        {user ? <DrawerNavigator /> : <MainStackNavigator />}
      </NavigationContainer>
    </MyContext.Provider>
  );
}
