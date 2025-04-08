import { View, Text, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; //no error

import { Colors } from "react-native/Libraries/NewAppScreen";
import { globalStyleNumerics } from "../../constants/StyleNumerics";
import { signout } from "../../firebase/auth/SignOut";

export default function UserProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                       onPress={() => {
                         console.log('logout goes here');
                         signout();
                       }}>
                       <View style={{
                            backgroundColor: Colors.white,
                            padding: 20,
                            borderRadius: globalStyleNumerics.borderRadius,
                       }}>
                         <Icon
                           name="log-out-outline"
                           size={globalStyleNumerics.iconSize}
                           color={Colors.primary}
                         />
                       </View>
                     </Pressable>
            <Text>User Profile Screen</Text>
        </View>
    );
}
