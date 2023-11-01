// In your component -- TestComponent
import { useKkiapay } from "@kkiapay-org/react-native-sdk";
import { useContext, useEffect } from "react";
import { Alert, Button, View } from "react-native";
import { MyContext } from "../context/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TestComponent = ({
  itemTitle,
  quantity,
  fixPrice,
  selectFormat,
  setSelectFormat,
  setFixPrice,
  setQuantity,
}) => {
  const { openKkiapayWidget, addSuccessListener, addFailedListener } =
    useKkiapay();
  const {
    setCommande,
    valueUser,
    commande,
    facture,
    setFacture,
    setUpdateVariableUser,
    localDataLogin,
    setBadgeCommande,
    setBadgeFacture,
    updateVariableUser,
    getDataPayementAsyncLocal,
  } = useContext(MyContext);

  function ok() {
    console.log("c'est bon pour la translaction");
    genererCommandeAndFacture();
  }

  const priceFinale = () => {
    if (fixPrice && quantity) {
      return fixPrice * parseInt(quantity);
    } else {
      return 0;
    }
  };

  const saveLocalDataAsync = async () => {
    const detailPayement = {
      name: itemTitle,
      nombres: quantity,
      montant: priceFinale(),
      format: selectFormat,
      client: localDataLogin.name,
      num: localDataLogin.tel,
    };

    try {
      await AsyncStorage.setItem(
        "DATAPAYEMENT",
        JSON.stringify(detailPayement)
      );
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
    if (selectFormat) {
      if (parseInt(quantity) > 0) {
        await saveLocalDataAsync();
      } else {
        Alert.alert("Quantité", "Veillez définir un nombre", [{ text: "OK" }]);
      }
    } else {
      Alert.alert("Format", "Veillez selectionner un format", [{ text: "OK" }]);
    }
  };

  return (
    <View>
      <Button title="Pay now" onPress={() => openWidgetisValid()} />
    </View>
  );
};

export default TestComponent;
