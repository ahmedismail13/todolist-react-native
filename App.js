import "react-native-gesture-handler";
import Home from "./src/screens/Home.screen";
import Profile from "./src/screens/Profile.screen";
import Login from "./src/screens/Login.screen";
import { useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserContext } from "./src/context/user.context";
import SideBar from "./src/navigation/SideBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabBar from "./src/navigation/TabBar";
import { TodoListProvider } from "./src/context/todolist.context";
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const LoginStack = createNativeStackNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const userInStorage = await AsyncStorage.getItem("currentUser");
      if (userInStorage !== null) {
        const userData = JSON.parse(userInStorage);
        setUser(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        {user ? (
          <TodoListProvider>
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
                drawerStyle: { width: "100%" },
                swipeEdgeWidth: 0,
              }}
              drawerContent={(props) => <SideBar {...props} />}
            >
              <Drawer.Screen name="TabNav" component={TabStack} />
            </Drawer.Navigator>
          </TodoListProvider>
        ) : (
          <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={Login} />
          </LoginStack.Navigator>
        )}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
