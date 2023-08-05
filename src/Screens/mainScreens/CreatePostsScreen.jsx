import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
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
import { Camera } from "expo-camera";
import { FontAwesome, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [locateName, setLocateName] = useState("");
  const [locate, setLocate] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    let location = await Location.getCurrentPositionAsync();
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLocate(coords);
    setPhoto(photo.uri);
  };

  const sendPost = async () => {
    navigation.navigate("Posts", { photo, name, locate, locateName });
    setPhoto("");
    setLocate(null);
    setName("");
    setLocateName("");
  };

  const deletePhoto = () => {
    setPhoto("");
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={{ height: 240 }} />
          </View>
        )}

        <TouchableOpacity onPress={takePhoto}>
          <View style={styles.circle}>
            <FontAwesome name="camera" size={24} color="#BDBDBD" />
          </View>
        </TouchableOpacity>
      </Camera>
      <Text style={styles.text}>Завантажте фото</Text>
      <View>
        <TextInput
          name={name}
          value={name}
          style={styles.text}
          placeholder="Назва..."
          onFocus={() => {}}
          onChangeText={(e) => setName(e)}
        />
      </View>
      <View>
        <TextInput
          name={locateName}
          value={locateName}
          style={styles.text}
          placeholder="Місцевість..."
          onFocus={() => {}}
          onChangeText={(e) => setLocateName(e)}
        />
      </View>
      <TouchableOpacity
        onPress={sendPost}
        style={{
          backgroundColor: "#F6F6F6",
          paddingVertical: 16,

          borderRadius: 100,

          marginBottom: 120,
        }}
      >
        <Text style={{ color: "#BDBDBD", textAlign: "center" }}>
          Опублікувати
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deletePhoto}>
        <View
          style={{
            width: 70,
            height: 40,
            backgroundColor: "#F6F6F6",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    // fontFamily: "Roboto-Medium",
  },
  camera: {
    marginTop: 32,
    marginBottom: 8,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  circle: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    position: "absolute",
    height: 240,
    width: "100%",
    backgroundColor: "transparent",
  },
  text: {
    color: "#BDBDBD",
    fontSize: 16,
  },
});
