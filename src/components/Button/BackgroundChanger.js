import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

function BackgroundChanger() {
  const [backgroundColor, setBackgroundColor] = useState('white');

  const changeBackgroundColor = () => {
    //Math.random() 是 JavaScript 中的一個內建函數，它返回一個0到1之間（不包括1）的隨機小數
    //16777215 是十六進制顏色表示法中最大的數字（0xFFFFFF），這代表了白色
    //Math.floor() 函數將其內部的數字向下取整為最接近的整數
    //toString(16) 是 JavaScript 中用於將數字轉換為十六進制字符串的方法
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setBackgroundColor(randomColor);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Button title="Change Background" onPress={changeBackgroundColor} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        color: "#fff"
      },
});

export default BackgroundChanger;
