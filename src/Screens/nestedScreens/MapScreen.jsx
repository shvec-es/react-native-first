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
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const location = route.params.item.locate;
  return (
    <View>
      <MapView
        style={{ height: 300 }}
        initialRegion={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker title="I am here" coordinate={location} description="Hello" />
      </MapView>
    </View>
  );
}
