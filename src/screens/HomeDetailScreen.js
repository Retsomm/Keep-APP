import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function HomeDetailScreen(props) {
  const passProps = props.route.params.passProps || "nothing get";
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={{ marginLeft: 20, lineHeight: 30, fontSize: 20 }}>
          追蹤碼:{passProps.Tracecode}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          農民經營業者:{passProps.Producer}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          組織代碼:{passProps.OrgID}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          產品名稱:{passProps.ProductName}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          產地:{passProps.Place}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          生產者名稱:{passProps.FarmerName}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          包裝日期:{passProps.PackDate}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          驗證機構:{passProps.CertificationName}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          驗證有效日期:{passProps.ValidDate}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          通路商資訊:{passProps.StoreInfo}
        </Text>
        {/* <Text>詳細栽種流程:{passProps.OperationDetail}</Text>
      <Text>詳細履歷資料:{passProps.ResumeDetail}</Text>
      <Text>詳細加工流程:{passProps.ProcessDetail}</Text>
      <Text>其他驗證資訊{passProps.CertificateDetail}</Text> */}
        <Text style={{ marginLeft: 20, marginRight: 20, lineHeight: 30 }}>
          農產品產地地段地號:{passProps.LandSecNO}
        </Text>
        <Text style={{ marginLeft: 20, marginRight: 20, lineHeight: 30 }}>
          原料追溯碼網址:{passProps.ParentTraceCode}
        </Text>

        <Text style={{ marginLeft: 20, marginRight: 20, lineHeight: 30 }}>
          一籤一碼追溯碼:{passProps.TraceCodelist}
        </Text>
        <Text style={{ marginLeft: 20, lineHeight: 30 }}>
          更新日期:{passProps.Log_UpdateTime}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
  },
});
