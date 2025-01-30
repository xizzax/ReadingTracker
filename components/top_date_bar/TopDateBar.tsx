import {StyleSheet, View} from 'react-native';
import BoxTopDateBar from './BoxTopDateBar';

export default function TopDateBar() {
  // get 5 dates before and 3 dates after (total 9)- make array?
  // each into 1 box
  // need date and day
  // pressable to select
  return (
    <View style={topDateBarStyles.barContainer} >
      <BoxTopDateBar isSelected={false} day={"Mon"}/>
      <BoxTopDateBar isSelected={true} day={"Tue"}/>
      <BoxTopDateBar isSelected={false} day={"Wed"}/>
    </View>
  );
}

const topDateBarStyles = StyleSheet.create({
  barContainer: {
    flexDirection:"row",
    columnGap: 5
  },
});
