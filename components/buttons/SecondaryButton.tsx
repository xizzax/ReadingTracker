import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../constants/Colors';
import {screenDimensions} from '../../constants/ScreenDimensions';
import { globalStyleNumerics } from '../../constants/StyleNumerics';

interface SecondaryBtnProps {
  title: string;
  onPressFtn: () => void;
  height?: number | null;
  width?: number | null;
  fontSize?: number | null;
}

export default function SecondaryButton(props: SecondaryBtnProps) {
  return (
    <Pressable onPress={props.onPressFtn}>
      <View style={{
         ...secondaryButtonStyles.background,
                  height: props.height ?? 60,
                  width: props.width ?? screenDimensions.width * 0.85,
      }}>
        <Text style={{...secondaryButtonStyles.text, fontSize: props.fontSize ?? 20}}>{props.title}</Text>
      </View>
    </Pressable>
  );
}

const secondaryButtonStyles = StyleSheet.create({
  background: {
    backgroundColor: Colors.secondary,
    borderRadius: globalStyleNumerics.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.black,
    fontWeight: '600',
  },
});
