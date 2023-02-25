import "react-native-gesture-handler";
import Home from "./src/screens/Home.screen";
import Profile from "./src/screens/Profile.screen";
import Login from "./src/screens/Login.screen";
import { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "./src/context/user.context";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        {user ? (
          <Drawer.Navigator>
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
