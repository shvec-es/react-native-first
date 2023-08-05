import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../nestedScreens/PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedStack = createStackNavigator();

export default function Home() {
  return (
    <NestedStack.Navigator initialRouteName="Posts">
      <NestedStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <NestedStack.Screen name="Comments" component={CommentsScreen} />
      <NestedStack.Screen name="Map" component={MapScreen} />
    </NestedStack.Navigator>
  );
}
