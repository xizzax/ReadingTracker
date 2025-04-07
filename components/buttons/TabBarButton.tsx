import {TouchableOpacity} from 'react-native';
import {Colors} from '../../constants/Colors';

export const TabBarButton = ({children, onPress, accessibilityState}) => {
  const focused = accessibilityState?.selected;
  return (
    <TouchableOpacity
      style={{
        width: 60,
        height: 60,
        // backgroundColor: focused ? Colors.primary : Colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        borderRadius: 1000,
      }}
      onPress={onPress}
      activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
};
