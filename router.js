import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";

import RegistrationScreen from "./src/Screens/authScreens/RegistrationScreen.jsx";
import LoginScreen from "./src/Screens/authScreens/LoginScreen.jsx";
import PostsScreen from "./src/Screens/nestedScreens/PostsScreen.jsx";
import CreatePostsScreen from "./src/Screens/mainScreens/CreatePostsScreen.jsx";
import ProfileScreen from "./src/Screens/mainScreens/ProfileScreen.jsx";
import Home from "./src/Screens/mainScreens/Home.jsx";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <MainStack.Screen name="Home" component={PostsScreen} />
      </MainStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderColor: "tomato",
          borderWidth: 1,
        },
        tabBarActiveBackgroundColor: "rgba(255, 108, 0, 1)",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
      }}
    >
      <MainTab.Screen
        options={{
          title: "Публікації",
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title="Press me"
              color="#fff"
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </Button>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <MainTab.Screen
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="plus" size={24} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
