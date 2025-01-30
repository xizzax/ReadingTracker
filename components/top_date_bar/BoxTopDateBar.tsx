import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../../constants/Colors';

interface boxTopDateBarProps {
  isSelected: boolean;
  date?: number | string, //TODO: check into this
  day : string,
}

export default function BoxTopDateBar(props: boxTopDateBarProps) {
  return (
    <View
      style={{
        ...boxTopDateBarStyles.box,
        borderWidth: props.isSelected ? 3 : 0,
      }}>
      <Text style={boxTopDateBarStyles.text}>{props.day.toUpperCase()}</Text>
      <Text style={boxTopDateBarStyles.text}>30</Text>
    </View>
  );
}
const boxTopDateBarStyles = StyleSheet.create({
  box: {
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.gray,
    fontWeight: "600"
  }
});
