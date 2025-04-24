import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {globalStyleNumerics} from '../../constants/StyleNumerics';

interface btnProps {
  title: string;
  onPressFtn: () => void;
  isSecondary?: boolean;
  height?: number | null;
  width?: number | null;
  fontSize?: number | null;
  isLoading?: boolean;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

export default function Button(props: btnProps) {
  let backgroundColor;
  if (props.backgroundColor) {
    backgroundColor = props.backgroundColor;
  } else {
    if (props.isSecondary) {
      backgroundColor = Colors.secondary;
    } else {
      backgroundColor = Colors.primary;
    }
  }

  let textColor;
  if (props.textColor) {
    textColor = props.textColor;
  } else {
    if (props.isSecondary) {
      textColor = Colors.black;
    } else {
      textColor = Colors.white;
    }
  }

  

  return (
    <Pressable onPress={props.onPressFtn}>
      <View
        style={{
          ...primaryButtonStyles.background,
          backgroundColor: backgroundColor,
          height: props.height ?? 60,
          width: props.width ?? screenDimensions.width * 0.9,
          borderColor: props.borderColor ? props.borderColor : "transparent",
          borderWidth:props.borderColor ? 1 : 0,
        }}>
        {props.isLoading ? (
          <ActivityIndicator
            size="large"
            color={props.isSecondary ? Colors.black : Colors.white}
          />
        ) : (
          <Text
            style={{
              ...primaryButtonStyles.text,
              fontSize: props.fontSize ?? 20,
              color: textColor,
            }}>
            {props.title}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const primaryButtonStyles = StyleSheet.create({
  background: {
    borderRadius: globalStyleNumerics.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
