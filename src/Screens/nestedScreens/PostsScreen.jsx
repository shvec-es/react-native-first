import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Button,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params && route.params.photo) {
      setPosts((prevPosts) => [route.params, ...prevPosts]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image source={{ uri: item.photo }} style={{ height: 240 }} />
            <Text>{item.name}</Text>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
                <Feather name="message-circle" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Map", { item })}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text>{item.locateName}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
    // fontFamily: "Roboto-Medium",
  },
});
