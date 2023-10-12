import { StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HomeDetailScreen from "./src/screens/HomeDetailScreen";
import ProfileDetailScreen from "./src/screens/ProfileDetailScreen";
import { Ionicons } from "@expo/vector-icons";
import { StoreContext } from "redux-react-hook";
import configureStore from "./src/redux/store";

const store = configureStore();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MyHomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "tomato" },
        headerBackTitle: "back",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="產銷履歷" component={HomeScreen} />
      <Stack.Screen
        name="MarsDetail"
        component={HomeDetailScreen}
        options={{ headerTitle: "履歷詳細內容" }}
      />
    </Stack.Navigator>
  );
}
function MyProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="我的收藏"
      screenOptions={{
        headerStyle: { backgroundColor: "green" },
        headerBackTitle: "detai;",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Keep" component={ProfileScreen} />
      <Stack.Screen
        name="EarthDetail"
        component={ProfileDetailScreen}
        options={{ headerTitle: "back" }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="|Home|"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (route.name == "|Home|") {
              return (
                <Image
                  source={{ uri: "https://freesvg.org/img/Mars.png" }}
                  style={{ width: 30, height: 30 }}
                />
              );
            } else if (route.name == "|Keep|") {
              // iconName = focused ? "ios-options" : "ios-list";
              return (
                <Image
                  source={{
                    uri: "https://freesvg.org/img/The-Earth-Seen-From-Apollo-17-by-Merlin2525.png",
                  }}
                  style={{ width: 30, height: 30 }}
                />
              );
            }
            return <Ionicons name={iconName} size={25} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="|Home|" component={MyHomeStack} />
        <Tab.Screen name="|Keep|" component={MyProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default () => (
  //利用Provider引入store(Provider把store當成參數往下傳)
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);
