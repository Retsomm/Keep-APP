import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as StorageHelper from "../helpers/StorageHelper";

export default function HomeScreen(props) {
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState(""); // 儲存關鍵字狀態

  useEffect(() => {
    fetchData();
  }, [dataSource]);

  useEffect(() => {
    const getALL = dataSource.filter((a) => a.addToMyLists === true);
    saveToStorage(getALL);
  }, [dataSource]);

  const saveToStorage = async (getMyBooks) => {
    try {
      await StorageHelper.setMySetting("myList", JSON.stringify(getMyBooks));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchData = () => {
    const REQUEST_URL =
      "https://data.moa.gov.tw/Service/OpenData/Resume/ResumeData_Plus.aspx";

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        const uniqueCases = {};

        const filteredData = responseData.filter((cases) => {
          // 用於篩選API的重複資料
          if (
            !uniqueCases[cases.Tracecode] &&
            (cases.Tracecode.includes(searchText) ||
              cases.ProductName.includes(searchText))
          ) {
            uniqueCases[cases.Tracecode] = true;
            return true;
          }
          return false;
        });
        setDataSource(filteredData);
      })
      .catch((err) => {
        console.log("err 是", err);
      });
  };
  const showNoticeDetail = (cases) => {
    props.navigation.push("MarsDetail", { passProps: cases });
  };
  const pressRow = (cases) => {
    const newDatas = dataSource.map((a) => {
      if (a.Tracecode === cases.Tracecode) {
        return { ...a, addToMyLists: !a.addToMyLists };
      }
      return a;
    });
    setDataSource(newDatas);
  };
  const renderBook = (cases) => {
    if (
      (!cases.Tracecode || !cases.Tracecode.includes(searchText)) &&
      (!cases.ProductName || !cases.ProductName.includes(searchText))
    ) {
      return null; // 如果不包含关键字，不渲染在屏幕上
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TouchableOpacity onPress={() => showNoticeDetail(cases)}>
          <View>
            <View style={styles.MainView}>
              <TouchableOpacity onPress={() => pressRow(cases)}>
                {cases.addToMyLists === true ? (
                  <Image
                    style={styles.imageCheck}
                    source={require("../img/square_check.png")}
                  />
                ) : (
                  <Image
                    style={styles.imageCheck}
                    source={require("../img/square_non_check.png")}
                  />
                )}
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                <Text style={{ color: "black", fontSize: 15, marginTop: 8 }}>
                  追蹤碼：{cases.Tracecode}
                </Text>
                <Text style={{ color: "black", fontSize: 15, marginTop: 8 }}>
                  產品名稱：{cases.ProductName}
                </Text>
              </View>
              <Image source={require("../img/arrow-point-to-right.png")} />
            </View>
            <View style={styles.seperator} />
          </View>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View>
      {/*  輸入框 */}
      <TextInput
        style={styles.searchInput}
        placeholder="輸入追蹤碼、產品名稱搜尋"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={dataSource}
        renderItem={(cases) => renderBook(cases.item)}
        keyExtractor={(cases) => cases.Tracecode.toString()}
        style={{ backgroundColor: "white" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  MainView: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 8,
    marginLeft: 10,
  },
  seperator: {
    height: 1,
    backgroundColor: "#dddddd",
  },
  thumbnail: {
    width: 50,
    height: 60,
    marginRight: 10,
  },
  imageCheck: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
});
