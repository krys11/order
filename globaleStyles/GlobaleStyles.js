import { StyleSheet } from "react-native";
//color
import { Colors } from "../constant/Colors";

const GlobaleStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  section: {
    width: 300,
    height: 150,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  btncustom: {
    marginTop: 5,
    backgroundColor: Colors.colorWhiteFade,
    height: 50,
    justifyContent: "center",
  },
});

export { GlobaleStyles };
