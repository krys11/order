// In your component -- TestComponent
import { useKkiapay } from "@kkiapay-org/react-native-sdk";
import { useContext, useEffect } from "react";
import { Alert, Button, View } from "react-native";
import { MyContext } from "../context/MyContext";

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
  } = useContext(MyContext);

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

  const genererCommandeAndFacture = (ref) => {
    // setUpdateVariableUser(true);
    setCommande((previousCommande) => [
      {
        date: getDates(),
        heure: getHours(),
        name: itemTitle,
        nombres: quantity,
        montant: priceFinale(),
        status: "Confirmer",
        format: selectFormat,
      },
      ...previousCommande,
    ]);
    setFacture((previousFacture) => [
      {
        date: getDates(),
        heure: getHours(),
        ref: ref,
        name: itemTitle,
        format: selectFormat,
        nombres: quantity,
        montant: priceFinale(),
        client: localDataLogin.name,
        num: "+22998521478",
      },
      ...previousFacture,
    ]);
    setSelectFormat("");
    setFixPrice("");
    setQuantity("");
  };

  useEffect(() => {
    addSuccessListener((data) => {
      if (data?.transactionId) {
        genererCommandeAndFacture(data.transactionId);
        console.log("succes: ", data);
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

  const openWidgetisValid = () => {
    if (selectFormat) {
      if (parseInt(quantity) > 0) {
        openWidget();
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
