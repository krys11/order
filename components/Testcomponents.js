// In your component -- TestComponent
import { useKkiapay } from "@kkiapay-org/react-native-sdk";
import { useEffect } from "react";
import { Button, View } from "react-native";

const TestComponent = () => {
  const { openKkiapayWidget, addSuccessListener } = useKkiapay();

  useEffect(() => {
    addSuccessListener((data) => {
      console.log("transactionId: ", data);
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
