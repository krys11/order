// In your component -- TestComponent
import React, { useContext, useEffect } from "react";
import { useKkiapay } from "@kkiapay-org/react-native-sdk";
import { Alert, Button, View } from "react-native";
import { MyContext } from "../context/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TestComponent = ({
  nombre,
  itemPrice,
  itemTitle,
  itemFormat,
  setNombre,
}) => {
  const { openKkiapayWidget, addSuccessListener, addFailedListener } =
    useKkiapay();
  const { localDataLogin, getDataPayementAsyncLocal } = useContext(MyContext);

  // function ok() {
  //   console.log("c'est bon pour la translaction");
  //   genererCommandeAndFacture();
  // }

  const priceFinale = () => {
    if (nombre && itemPrice) {
      return parseInt(nombre) * parseInt(itemPrice);
    } else {
      return 0;
    }
  };

  const saveLocalDataAsync = async () => {
    const detailPayement = {
      name: itemTitle,
      nombres: nombre,
      montant: priceFinale(),
      format: itemFormat,
      client: localDataLogin.name,
      num: localDataLogin.tel,
    };

    try {
      await AsyncStorage.setItem(
        "DATAPAYEMENT",
        JSON.stringify(detailPayement)
      );
      setNombre("");
      openWidget();
    } catch (error) {
      console.log("errorSaveDataPayementTestComponents", error);
    }
  };

  // const genererCommandeAndFacture = (ref) => {
  //   // setUpdateVariableUser(true);
  //   setCommande((previousCommande) => [
  //     {
  //       date: getDates(),
  //       heure: getHours(),
  //       name: itemTitle,
  //       nombres: quantity,
  //       montant: priceFinale(),
  //       status: "Confirmer",
  //       format: selectFormat,
  //     },
  //     ...previousCommande,
  //   ]);
  //   setFacture((previousFacture) => [
  //     {
  //       date: getDates(),
  //       heure: getHours(),
  //       ref: ref,
  //       name: itemTitle,
  //       format: selectFormat,
  //       nombres: quantity,
  //       montant: priceFinale(),
  //       client: localDataLogin.name,
  //       num: "+22998521478",
  //     },
  //     ...previousFacture,
  //   ]);
  //   setSelectFormat("");
  //   setFixPrice("");
  //   setQuantity("");
  // };

  useEffect(() => {
    addSuccessListener((data) => {
      if (data?.transactionId) {
        // genererCommandeAndFacture(data.transactionId);
        console.log("succes: ", data);
        getDataPayementAsyncLocal(data.transactionId, "Confirmer");
      }
    });
  }, []);

  useEffect(() => {
    addFailedListener((data) => {
      console.log("failed: ", data);
    });
  }, []);

  // useEffect(() => {
  //   async function updateFactureCommande() {
  //     if (updateVariableUser) {
  //       console.log("enter3");
  //       const updateLocalStorage = {
  //         userID: valueUser.token,
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
  //         await saveLocalData(updateLocalStorage);
  //         try {
  //           await updateUserData(valueUser.token, updateFirebaseStorage);
  //           setUpdateVariableUser(false);
  //           setBadgeCommande(true);
  //           setBadgeFacture(true);
  //           Alert.alert(
  //             "Commande",
  //             "Votre commande a été effectuée avec succes",
  //             [{ text: "OK" }]
  //           );
  //         } catch (error) {
  //           console.log("errorUseEffectApp2::::", error);
  //           setUpdateVariableUser(false);
  //         }
  //         console.log("save succes");
  //       } catch (error) {
  //         console.log("errorUseEffectApp1::::", error);
  //         setUpdateVariableUser(false);
  //         setUpdate(false);
  //       }
  //     }
  //   }

  //   updateFactureCommande();
  // }, [commande, facture]);

  const openWidget = () => {
    openKkiapayWidget({
      amount: 100,
      key: "3425dc6035d711eca8f5b92f2997955b",
      sandbox: true,
    });
  };

  const openWidgetisValid = async () => {
    if (parseInt(nombre) > 0) {
      await saveLocalDataAsync();
    } else {
      Alert.alert("Quantité", "Veillez définir un nombre", [{ text: "OK" }]);
    }
  };

  return (
    <View>
      <Button title="Pay now" onPress={() => openWidgetisValid()} />
    </View>
  );
};

export default TestComponent;
