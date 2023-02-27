import "react-native-gesture-handler";
import Home from "./src/screens/Home.screen";
import Profile from "./src/screens/Profile.screen";
import Login from "./src/screens/Login.screen";
import { useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "./src/context/user.context";
import SideBar from "./src/navigation/SideBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
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
          <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
