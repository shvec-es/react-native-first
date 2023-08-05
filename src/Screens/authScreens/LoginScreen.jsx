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
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
  });
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [dimensions, setDimensions] = useState(
  //   Dimensions.get("window").width - 20 * 2
  // );
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const onLogin = () => {
    console.log({ email, password });
    setEmail("");
    setPassword("");
  };

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width - 20 * 2;
  //     console.log(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => Dimensions.removeEventListener("change", onChange);
  // }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      onLayout={onLayoutRootView}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../../assets/images/book-group.png")}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 0 : 132,
              // width: dimensions,
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Увійти</Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  name={email}
                  value={email}
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={emailHandler}
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  name={password}
                  value={password}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Пароль"
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={passwordHandler}
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={() => {
                  setIsShowKeyboard(false);
                  Keyboard.dismiss();
                  onLogin();
                }}
              >
                <Text
                  style={{ color: Platform.OS === "ios" ? "orange" : "white" }}
                >
                  Увійти
                </Text>
              </TouchableOpacity>
              <Text style={styles.link}>
                Немає акаунту?{" "}
                <Text onPress={() => navigation.navigate("Registration")}>
                  Зареєструватися
                </Text>
              </Text>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    paddingTop: 32,
    paddingHorizontal: 16,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    alignItems: "center",
    marginBottom: 33,
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  input: {
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    height: 50,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  btn: {
    height: 40,
    borderWidth: 1,
    borderRadius: 100,
    marginTop: 44,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto-Regular",
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#FF6C00",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
  link: {
    textAlign: "center",
    marginTop: 16,
    color: "#1B4371",
  },
});
