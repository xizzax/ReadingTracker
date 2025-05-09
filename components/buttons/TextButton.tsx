import {Pressable, StyleSheet, Text} from 'react-native';
import {globalTextStyles} from '../../styles/TextStyles';
import { Colors } from '../../constants/Colors';

interface textBtnProps {
  title: string;
  fontSize?: number | null;
  onPressFtn: () => void;
}

export default function TextButton(props: textBtnProps) {
  return (
    <Pressable onPress={props.onPressFtn}>
      <Text
        style={{
          ...globalTextStyles.bodyText,
         ...textBtnStyles.btnStyle,
          fontSize: props.fontSize ?? 16,
        }}>
        {props.title}
      </Text>
    </Pressable>
  );
}

const textBtnStyles = StyleSheet.create({
  btnStyle: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});
