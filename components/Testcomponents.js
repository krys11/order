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
      key: "7acd0660528c11eebc8313ef873f17d5",
      sandbox: true,
    });
  };

  return openWidget;
};

export { TestComponent };
