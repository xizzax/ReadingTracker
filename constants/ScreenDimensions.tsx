import { Dimensions } from "react-native";  

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const screenDimensions = {
    width: screenWidth,
    height: screenHeight,
};
