import React, { useEffect, useState, useLayoutEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "../routes/StackNavigator";
import BottomTabNavigator from "../routes/TabNavigator";
import Screenloader from "./screenLoader/Screenloader";
import { MyContext } from "../context/MyContext";
import { ToastConfig, showToastSuccess } from "../components/Toastcomponent";
import {
  db,
  getUserData,
  updateUserData,
  updateAdminData,
  setCollectionData,
} from "../firebase/Firebase";
import { onSnapshot, collection, arrayUnion } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Entry() {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateVariableUser, setUpdateVariableUser] = useState(false);
  const [badgeCommande, setBadgeCommande] = useState(false);
  const [badgeFacture, setBadgeFacture] = useState(false);
  const [commande, setCommande] = useState([]);
  const [facture, setFacture] = useState([]);
  const [userUID, setUserUID] = useState();
  const [userDATA, setUserDATA] = useState();
  const [menu, setMenu] = useState();

  async function authenticate(userUid) {
    try {
      await AsyncStorage.setItem("USERDATA", userUid);
      setUserUID(userUid);
    } catch (error) {
      console.log("EntryAsyncStorage.setItem::::", error);
    }
  }

  const valueUser = {
    token: authToken,
    isAuthnticated: !!authToken,
    authenticate: authenticate,
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

  async function getLocalUserUid() {
    return await AsyncStorage.getItem("USERDATA");
  }

  async function getDataPayementIsExist() {
    const data = await AsyncStorage.getItem("DATAPAYEMENT");
    const store = JSON.parse(data);
    return store;
  }

  async function removeDataPayementIsExist() {
    await AsyncStorage.removeItem("DATAPAYEMENT");
  }

  // const [menu, setMenu] = useState([
  //   {
  //     id: "1",
  //     title: "Pizza",
  //     img0: logoDefault,
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     title: "Chawarma",
  //     img0: logoDefault,
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: "3",
  //     title: "Chawarma",
  //     img0: logoDefault,
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: "4",
  //     title: "Chawarma",
  //     img0: logoDefault,
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  // ]);

  // const menus = [
  //   {
  //     id: "1",
  //     title: "Pizza",
  //     img0: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     title: "Chawarma",
  //     img0: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  // ];

  // useEffect(() => {
  //   async function saveData() {
  //     try {
  //       await setCollectionData("menus", "6CGuUMuLrcvXoNDh5Rmw", { menus });
  //       console.log("save ok");
  //     } catch (error) {
  //       console.log("errorSaveMenus:::", error);
  //     }
  //   }
  //   saveData();

  //   return () => saveData();
  // }, []);

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

  //check user is connected
  useLayoutEffect(() => {
    async function getUserUid() {
      const userUid = await getLocalUserUid();
      if (userUid) {
        setUserUID(userUid);
      } else {
        setLoading(false);
      }
    }

    getUserUid();

    return () => {
      getUserUid();
    };
  }, []);

  //get all menu and user data
  useLayoutEffect(() => {
    //get user data
    const getDataUser = () => {
      console.log("getDataUser");
      onSnapshot(collection(db, "users"), (querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          for (const key in doc.data()) {
            // console.log(doc.data().userID === userID);
            if (doc.data()[key] === userUID) {
              setUserDATA(doc.data());
              setCommande(doc.data()["commande"]);
              setFacture(doc.data()["facture"]);
              setAuthToken(userUID);
              setLoading(false);
            } else {
              setLoading(false);
            }
          }
        });
      });
    };

    //get all menu
    const getAllMenu = () => {
      if (userUID) {
        console.log("userData");
        //get All Menus
        onSnapshot(collection(db, "menus"), (querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => {
            return [...doc.data().menus];
          });
          setMenu(documents[0]);
          getDataUser(userUID);
        });
      }
    };

    getAllMenu();

    return () => {
      getAllMenu();
    };
  }, [userUID]);

  //save payement data local to get save after reload application in generate facture
  const getDataPayementAsyncLocal = async (ref, status) => {
    const tabFacture = [];
    const tabCommande = [];
    const dataPayement = await getDataPayementIsExist();
    if (dataPayement) {
      tabCommande.unshift(
        {
          date: getDates(),
          heure: getHours(),
          name: dataPayement.name,
          nombres: dataPayement.nombres,
          montant: dataPayement.montant,
          status: status,
          format: dataPayement.format,
        },
        ...dataPayement.commande
      );

      tabFacture.unshift(
        {
          date: getDates(),
          heure: getHours(),
          ref: ref,
          name: dataPayement.name,
          format: dataPayement.format,
          nombres: dataPayement.nombres,
          montant: dataPayement.montant,
          client: dataPayement.client,
          num: dataPayement.num,
        },
        ...dataPayement.facture
      );

      // setCommande((previousCommande) => [
      //   {
      //     date: getDates(),
      //     heure: getHours(),
      //     name: dataPayement.name,
      //     nombres: dataPayement.nombres,
      //     montant: dataPayement.montant,
      //     status: status,
      //     format: dataPayement.format,
      //   },
      //   ...previousCommande,
      // ]);
      // setFacture((previousFacture) => [
      //   {
      //     date: getDates(),
      //     heure: getHours(),
      //     ref: ref,
      //     name: dataPayement.name,
      //     format: dataPayement.format,
      //     nombres: dataPayement.nombres,
      //     montant: dataPayement.montant,
      //     client: dataPayement.client,
      //     num: dataPayement.num,
      //   },
      //   ...previousFacture,
      // ]);

      try {
        await removeDataPayementIsExist();
        setUpdateVariableUser(true);
        try {
          await updateUserData(dataPayement.uid, {
            commande: tabCommande,
            facture: tabFacture,
          });
          setUpdateVariableUser(false);
          setBadgeCommande(true);
          setBadgeFacture(true);
        } catch (error) {
          console.log("errorArrayUnion:::", error);
        }
      } catch (error) {
        setUpdateVariableUser(false);
        console.log("errorRemoveDataPayementAsync", error);
      }
    } else {
      setUpdateVariableUser(false);
    }
  };

  const render = valueUser.isAuthnticated ? (
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
          updateVariableUser,
          setUpdateVariableUser,
          badgeCommande,
          setBadgeCommande,
          badgeFacture,
          setBadgeFacture,
          valueUser,
          userDATA,
          setAuthToken,
          getDataPayementAsyncLocal,
        }}
      >
        <NavigationContainer>
          <>
            {render}
            <ToastConfig />
          </>
        </NavigationContainer>
      </MyContext.Provider>
    );
  }
}
