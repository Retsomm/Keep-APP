import React from "react";
import { TouchableOpacity, Text } from "react-native";

function MyButton2(props) {
  return (
    <TouchableOpacity onPress={props.myOnPress2}>
      <Text>{props.myTitle2}</Text>
    </TouchableOpacity>
  );
}
export default MyButton2;
