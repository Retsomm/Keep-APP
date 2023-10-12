import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";

const DrawingGrogu = () => {
  const [drawings, setDrawings] = useState([]);
  const [canvasWidth, setCanvasWidth] = useState(
    Dimensions.get("window").width
  );
  const [canvasHeight, setCanvasHeight] = useState(
    Dimensions.get("window").height * 0.4 // 使用視窗高度的一部分，這裡是40%
  );

  useEffect(() => {
    // 監聽窗口大小變化，更新畫布尺寸
    const updateCanvasSize = () => {
      setCanvasWidth(Dimensions.get("window").width - 2);
      setCanvasHeight(Dimensions.get("window").height * 0.4); // 使用視窗高度的一部分，這裡是40%
    };

    Dimensions.addEventListener("change", updateCanvasSize);

    return () => {
      Dimensions.removeEventListener("change", updateCanvasSize);
    };
  }, []);

  // 添加圖片到畫布上的隨機位置
  const addDrawing = () => {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const imageUrl =
      "https://github.com/Retsomm/reactNativeButton/blob/main/src/img/grogu2.png?raw=true"; // 在這裡設置你的圖片位址
    const newDrawing = { x, y, imageUrl };
    setDrawings([...drawings, newDrawing]);
  };

  // 清除畫布上的所有圖片
  const clearDrawings = () => {
    setDrawings([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="新增古古" onPress={addDrawing} />
        <Button title="清除所有古古" onPress={clearDrawings} />
      </View>
      <ScrollView style={{ width: canvasWidth, height: canvasHeight }}>
        <View style={{ width: canvasWidth, height: canvasHeight }}>
          {drawings.map((drawing, index) => (
            <Image
              key={index}
              source={{ uri: drawing.imageUrl }}
              style={{
                width: 100,
                height: 100,
                position: "absolute",
                left: drawing.x,
                top: drawing.y,
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 50,
  },
});

export default DrawingGrogu;
