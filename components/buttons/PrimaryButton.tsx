import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../constants/Colors';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {globalStyleNumerics} from '../../constants/StyleNumerics';

interface primaryBtnProps {
  title: string;
  onPressFtn: () => void;
  height?: number | null;
  width?: number | null;
  fontSize?: number | null;
}

export default function PrimaryButton(props: primaryBtnProps) {
  return (
    <Pressable onPress={props.onPressFtn}>
      <View
        style={{
          ...primaryButtonStyles.background,
          height: props.height ?? 60,
          width: props.width ?? screenDimensions.width * 0.9,
        }}>
        <Text
          style={{...primaryButtonStyles.text, fontSize: props.fontSize ?? 20}}>
          {props.title}
        </Text>
      </View>
    </Pressable>
  );
}

const primaryButtonStyles = StyleSheet.create({
  background: {
    backgroundColor: Colors.primary,
    borderRadius: globalStyleNumerics.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: '600',
  },
});
