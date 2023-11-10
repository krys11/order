import React, { useEffect, useState, useLayoutEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "../routes/StackNavigator";
import BottomTabNavigator from "../routes/TabNavigator";
import Screenloader from "./screenLoader/Screenloader";
import { MyContext } from "../context/MyContext";
import { ToastConfig, showToastSuccess } from "../components/Toastcomponent";
import {
  app,
  db,
  getUserData,
  updateUserData,
  updateAdminData,
} from "../firebase/Firebase";
import { onSnapshot, collection, arrayUnion } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Entry() {
  const [authToken, setAuthToken] = useState(null);
  const [authTokenAdmin, setAuthTokenAdmin] = useState(null);
  const [localDataLogin, setLocalDataLogin] = useState();
  const [localDataAdminLogin, setLocalDataAdminLogin] = useState();
  const [loading, setLoading] = useState(true);
  const [updateVariableUser, setUpdateVariableUser] = useState(false);
  const [badgeCommande, setBadgeCommande] = useState(false);
  const [badgeFacture, setBadgeFacture] = useState(false);
  const [commande, setCommande] = useState([]);
  const [facture, setFacture] = useState([]);
  const [menu, setMenu] = useState();

  const valueUser = {
    token: authToken,
    isAuthnticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  const valueAdmin = {
    token: authTokenAdmin,
    isAuthnticated: !!authTokenAdmin,
    authenticate: authenticateAdmin,
    logout: logout,
  };

  const getDates = () => {
    const dateAll = new Date();
    const date = `${dateAll.getDate()}`.padStart(2, 0);
    const monthe = `${dateAll.getMonth() + 1}`.padStart(2, 0);
    const year = `${dateAll.getFullYear()}`;

    return `${date}/${monthe}/${year}`;
  };

  const getHours = () => {
    const dateAll = new Date();
    const hours = `${dateAll.getHours()}`.padStart(2, 0);
    const minutes = `${dateAll.getMinutes()}`.padStart(2, 0);
    const seconds = `${dateAll.getSeconds()}`.padStart(2, 0);

    return `${hours}:${minutes}:${seconds}`;
  };

  async function getLocalUserData() {
    const data = await AsyncStorage.getItem("USERDATA");
    const store = JSON.parse(data);
    return store;
  }

  async function getLocalAdminData() {
    const data = await AsyncStorage.getItem("ADMINDATA");
    const store = JSON.parse(data);
    return store;
  }

  async function getDataPayementIsExist() {
    const data = await AsyncStorage.getItem("DATAPAYEMENT");
    const store = JSON.parse(data);
    return store;
  }

  async function removeDataPayementIsExist() {
    await AsyncStorage.removeItem("DATAPAYEMENT");
  }

  async function saveLocalData(data) {
    return await AsyncStorage.setItem("USERDATA", JSON.stringify(data));
  }

  async function authenticate(uid) {
    const dataUser = await getUserData(uid);
    const data = {
      ...dataUser.data(),
      userID: uid,
    };
    await saveLocalData(data);
    setLocalDataLogin(data);
    setAuthToken(data.userID);
  }

  async function authenticateAdmin(uid) {
    // const dataUser = await getUserData(uid);
    // const data = {
    //   ...dataUser.data(),
    //   userID: uid,
    // };
    // await saveLocalData(data);
    // setLocalDataLogin(data);
    setAuthTokenAdmin(uid);
    setLoading(false);
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem("USERDATA");
      try {
        await AsyncStorage.removeItem("DATAPAYEMENT");
        setAuthToken(null);
      } catch (error) {
        console.log("AccountError2", error);
      }
    } catch (error) {
      console.log("AccountError1", error);
    }
  }

  //get All Menus
  useLayoutEffect(() => {
    const unsub = onSnapshot(collection(db, "menus"), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return [...doc.data().menus];
      });
      setMenu(documents[0]);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  //check user is connected
  useLayoutEffect(() => {
    async function getDataUserAsyncLocal() {
      const storeData = await getLocalUserData();
      if (storeData) {
        // console.log("useLayoutEffect::::Apps", storeData);
        setLocalDataLogin(storeData);
        setCommande(storeData.commande);
        setFacture(storeData.facture);
        setAuthToken(storeData.userID);
        // setLoading(false);
      } else {
        setLoading(false);
      }
    }
    async function getDataAdminAsyncLocal() {
      const storeData = await getLocalAdminData();
      if (storeData) {
        // console.log("useLayoutEffect::::Apps", storeData);
        setLocalDataAdminLogin(storeData);
        // setCommande(storeData.commande);
        // setFacture(storeData.facture);
        setAuthTokenAdmin(storeData.userID);
        // setLoading(false);
      } else {
        setLoading(false);
      }
    }
    getDataUserAsyncLocal();
    // getDataAdminAsyncLocal();

    return () => {
      getDataUserAsyncLocal();
      // getDataAdminAsyncLocal();
    };
  }, [authToken, authTokenAdmin]);

  //save payement data local to get save after reload application in generate facture
  const getDataPayementAsyncLocal = async (ref, status) => {
    const dataPayement = await getDataPayementIsExist();
    if (dataPayement) {
      setCommande((previousCommande) => [
        {
          date: getDates(),
          heure: getHours(),
          name: dataPayement.name,
          nombres: dataPayement.nombres,
          montant: dataPayement.montant,
          status: status,
          format: dataPayement.format,
        },
        ...previousCommande,
      ]);
      setFacture((previousFacture) => [
        {
          date: getDates(),
          heure: getHours(),
          ref: ref,
          name: dataPayement.name,
          format: dataPayement.format,
          nombres: dataPayement.nombres,
          montant: dataPayement.montant,
          client: localDataLogin.name,
          num: dataPayement.num,
        },
        ...previousFacture,
      ]);
      try {
        await removeDataPayementIsExist();
        setUpdateVariableUser(true);
      } catch (error) {
        setUpdateVariableUser(false);
        console.log("errorRemoveDataPayementAsync", error);
      }
    } else {
      setUpdateVariableUser(false);
    }
  };

  //update facture in commande after payement confirm
  useEffect(() => {
    const updateFactureCommande = async () => {
      if (updateVariableUser) {
        console.log("3");
        const updateLocalStorage = {
          userID: valueUser.token,
          email: localDataLogin.email,
          tel: localDataLogin.tel,
          name: localDataLogin.name,
          commande: commande,
          facture: facture,
        };

        const updateFirebaseStorage = {
          commande: commande,
          facture: facture,
        };

        const updateFirebaseDataAdmin = {
          facture: facture[0],
          notifiactionToken: localDataLogin.notifiactionToken,
          check: 1,
        };

        try {
          await saveLocalData(updateLocalStorage);
          try {
            await updateUserData(valueUser.token, updateFirebaseStorage);
            try {
              await updateAdminData("wF9wyzb9EQVm5k3N1KNrjhXXNJZ2", {
                commanderecue: arrayUnion(updateFirebaseDataAdmin),
              });
              setUpdateVariableUser(false);
              setBadgeCommande(true);
              setBadgeFacture(true);
              showToastSuccess("Commande effectuée avec succes");
            } catch (error) {
              console.log("errorUseEffectApp3::::", error);
              setUpdateVariableUser(false);
            }
          } catch (error) {
            console.log("errorUseEffectApp2::::", error);
            setUpdateVariableUser(false);
          }
          console.log("save succes");
        } catch (error) {
          console.log("errorUseEffectApp1::::", error);
          setUpdateVariableUser(false);
        }
      }
    };

    updateFactureCommande();

    return () => {
      updateFactureCommande();
    };
  });

  const render =
    valueAdmin.isAuthnticated || valueUser.isAuthnticated ? (
      <BottomTabNavigator />
    ) : (
      <MainStackNavigator />
    );

  if (loading) {
    return <Screenloader />;
  } else {
    return (
      <MyContext.Provider
        value={{
          menu,
          commande,
          facture,
          localDataLogin,
          updateVariableUser,
          setUpdateVariableUser,
          badgeCommande,
          setBadgeCommande,
          badgeFacture,
          setBadgeFacture,
          valueUser,
          valueAdmin,
          setAuthToken,
          getDataPayementAsyncLocal,
        }}
      >
        <NavigationContainer>
          {render}
          <ToastConfig />
        </NavigationContainer>
      </MyContext.Provider>
    );
  }
}
