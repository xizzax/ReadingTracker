import {StyleSheet, Text, View, Pressable} from 'react-native';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import {Colors} from '../../constants/Colors';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {globalTextStyles} from '../../styles/TextStyles';

interface settingsBtnProps {
  title: string;
  onPressFtn: () => void;
  color?: string;
}

export default function SettingsButton(props: settingsBtnProps) {
  return (
    <Pressable onPress={props.onPressFtn}>
      <View
        style={{
          ...settingsBtnStyles.btnContainer,
          borderColor: props.color ? props.color : Colors.black,
        }}>
        <Text
          style={{
            ...globalTextStyles.bodyText,
            color: props.color ? props.color : Colors.black,
            fontWeight: '400',
          }}>
          {props.title}
        </Text>
      </View>
    </Pressable>
  );
}

const settingsBtnStyles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 10,
paddingHorizontal: 15,
    marginVertical: 5,
    borderWidth: 0.5,
    width: screenDimensions.width * 0.9,
    backgroundColor: Colors.white,
    borderRadius: globalStyleNumerics.borderRadius,
  },
});
