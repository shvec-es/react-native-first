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

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Мій профіль</Text>
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
    // fontFamily: "Roboto-Medium",
  },
});
