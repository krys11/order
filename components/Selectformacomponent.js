import React, { useContext } from "react";
import { StyleSheet } from "react-native";
//react_list_select
import { SelectList } from "react-native-dropdown-select-list";
//mycontext
import { MyContext } from "../context/MyContext";
//color
import { Colors } from "../constant/Colors";

const Selectformacomponent = ({
  itemformat,
  setSelectFormat,
  setFixPrice,
  placeholder,
  itemPrice,
}) => {
  const { price } = useContext(MyContext);

  //function select format fix price
  const selectFormatAndAutoPrice = (val) => {
    setSelectFormat(itemformat[val].value);
    setFixPrice(itemPrice[val]);
  };
  return (
    <SelectList
      placeholder={placeholder}
      setSelected={(val) => selectFormatAndAutoPrice(val)}
      data={itemformat}
      dropdownShown={false}
      dropdownTextStyles={{ color: Colors.colorWhite }}
      dropdownStyles={{ height: 110 }}
      boxStyles={{
        height: 45,
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
