import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Colors } from '../../constants/Colors';
import { screenDimensions } from '../../constants/ScreenDimensions';

interface primaryBtnProps {
    title: string;
    onPressFtn: ()=>void;
};

export default function PrimaryButton(props:primaryBtnProps){
    return (
        <Pressable onPress={props.onPressFtn}>
            <View style={primaryButtonStyles.background}>
                <Text style={primaryButtonStyles.text}>{props.title}</Text>
            </View>
        </Pressable>
    );
}

const primaryButtonStyles = StyleSheet.create({
background: {
    backgroundColor: Colors.primary,
    width: screenDimensions.width * 0.85,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
},
text: {
    color:Colors.black,
    fontSize: 20,
    fontWeight: "600",
}

});