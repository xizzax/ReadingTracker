import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Colors } from '../../constants/Colors';
import { screenDimensions } from '../../constants/ScreenDimensions';

interface SecondaryBtnProps {
    title: string;
    onPressFtn: () => void;
};

export default function SecondaryButton(props: SecondaryBtnProps) {
    return (
        <Pressable onPress={props.onPressFtn}>
            <View style={secondaryButtonStyles.background}>
                <Text style={secondaryButtonStyles.text}>{props.title}</Text>
            </View>
        </Pressable>
    );
}

const secondaryButtonStyles = StyleSheet.create({
    background: {
        backgroundColor: Colors.secondary,
        width: screenDimensions.width * 0.85,
        height: 60,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: Colors.black, 
        fontSize: 20,
        fontWeight: "600",
    }
});
