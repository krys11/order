// In your component -- TestComponent
import { useKkiapay } from "@kkiapay-org/react-native-sdk";
import { useContext, useEffect } from "react";
import { Button, View } from "react-native";
import { MyContext } from "../context/MyContext";

const TestComponent = ({ genererCommandeAndFacture }) => {
  const { openKkiapayWidget, addSuccessListener, addFailedListener } =
    useKkiapay();

  useEffect(() => {
    addSuccessListener((data) => {
      console.log("succes: ", data);
    });
  }, []);

  useEffect(() => {
    addFailedListener((data) => {
      console.log("failed: ", data);
    });
  }, []);

  const openWidget = () => {
    openKkiapayWidget({
      amount: 100,
      key: "3425dc6035d711eca8f5b92f2997955b",
      sandbox: true,
    });
  };

  return (
    <View>
      <Button title="Pay now" onPress={openWidget} />
    </View>
  );
};

export default TestComponent;
