import { TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";


export const StopwatchTabBarButton = ({children, onPress, accessibilityState}) => {
    const focused = accessibilityState?.selected;
    return (
        <TouchableOpacity
            style={{
                width: 60,
                height: 60,
                position: 'absolute',
                bottom: 10,
                paddingLeft: 5,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginHorizontal: 10,
                borderRadius: 1000,
                elevation: 5,
                shadowColor: Colors.black,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 2, 
            }}
            onPress={onPress}
            activeOpacity={0.7}>
            {children}
        </TouchableOpacity>
    );
};