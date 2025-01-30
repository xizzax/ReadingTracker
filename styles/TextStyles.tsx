import {StyleSheet} from 'react-native';
import { Colors } from '../constants/Colors';

export const globalTextStyles = StyleSheet.create({
  headerText: {
    fontFamily: 'Rounded Mplus 1c Bold',
    fontSize: 25,
    color: Colors.black,
  },
  subheaderText: {
    fontFamily: 'Rounded Mplus 1c Medium',
    fontSize: 18,
    color: Colors.gray,

  },
  bodyText: {
    fontFamily: 'Rounded Mplus 1c Light',
    fontSize: 16,
    color: Colors.black,
  },
});
