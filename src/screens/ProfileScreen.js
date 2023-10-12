import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as StorageHelper from "../helpers/StorageHelper";

export default function ProfileScreen(props) {
  const [myBookCount, setMyBookCount] = useState(0);
  const [myBookListName, setMyBookListName] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      loadStorage();
    });
    return unsubscribe;
  }, [myBookCount]);

  const loadStorage = async () => {
    let bookGet = await StorageHelper.getMySetting("myList");
    //法二
    let a = JSON.parse(bookGet);
    setMyBookCount(a.length);
    setMyBookListName(a);
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginLeft: 20, lineHeight: 30 }}>
        我收藏了{myBookCount}個產銷履歷
      </Text>
      {/* 法二渲染 */}
      {myBookListName.map((product, index) => {
        return (
          <Text
            style={{ marginLeft: 20, marginRight: 20, lineHeight: 30 }}
            key={index}
          >
            追蹤碼{product.Tracecode + "的" + product.ProductName}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    // alignItems: "center",
    justifyContent: "center",
  },
});
