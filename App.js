import "react-native-gesture-handler";
import Home from "./src/screens/Home.screen";
import Profile from "./src/screens/Profile.screen";
import Login from "./src/screens/Login.screen";
import { useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserContext } from "./src/context/user.context";
// import SideBar from "./src/navigation/SideBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabBar from "./src/navigation/TabBar";
import { TodoListProvider } from "./src/context/todolist.context";
// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
            {/* <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator> */}
            <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
          </TodoListProvider>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
