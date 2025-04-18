import {View, Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
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
}

export default function Button(props: btnProps) {
  return (
    <Pressable onPress={props.onPressFtn}>
      <View
        style={{
          ...primaryButtonStyles.background,
          backgroundColor: props.isSecondary ? Colors.secondary : Colors.primary,
          height: props.height ?? 60,
          width: props.width ?? screenDimensions.width * 0.9,
        }}>
        {props.isLoading ? (
          <ActivityIndicator size="large" color={
            props.isSecondary ? Colors.black : Colors.white
          } />
        ) : (
          <Text
            style={{
              ...primaryButtonStyles.text,
              fontSize: props.fontSize ?? 20,
              color: props.isSecondary ? Colors.black : Colors.white,
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
