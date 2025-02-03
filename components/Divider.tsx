import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { screenDimensions } from "../constants/ScreenDimensions";

export default function Divider() {
  return (
    <View style={styles.divider}>
        <Text> </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.lightGray,
    height: screenDimensions.height * 0.025,
  },
});