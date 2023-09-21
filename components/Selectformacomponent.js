import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { Colors } from "../constant/Colors";

const Selectformacomponent = ({ format, setSelectFormat, setFixPrice }) => {
  const { price } = useContext(MyContext);

  //function select format fix price
  const selectFormatAndAutoPrice = (val) => {
    setSelectFormat(format[val].value);
    setFixPrice(price[val]);
  };
  return (
    <SelectList
      placeholder="Format"
      setSelected={(val) => selectFormatAndAutoPrice(val)}
      data={format}
      dropdownShown={false}
      dropdownTextStyles={{ color: Colors.colorRed }}
      boxStyles={{
        width: 85,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.colorRed,
        backgroundColor: Colors.colorRed,
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default Selectformacomponent;
