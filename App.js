import React from "react";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { store } from "./redux/store";

export default function App() {
  const routing = useRoute({});

  return (
    // <Provider store={store}>
    <NavigationContainer>{routing}</NavigationContainer>
    // </Provider>
  );
}
