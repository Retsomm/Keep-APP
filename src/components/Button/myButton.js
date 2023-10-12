import React from "react";
import { TouchableOpacity, Text } from "react-native";

const MyButton = (props) => (
  <TouchableOpacity onPress={props.myOnPress}>
    <Text>{props.myTitle}</Text>
  </TouchableOpacity>
);

export default MyButton;
