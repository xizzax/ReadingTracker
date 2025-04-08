import { Button, Text, View } from "react-native";

export default function SetGoalScreen({navigation}) {
  return (
   <View>
        <Text>Set Goal Screen</Text>
        <Button
            title="Go to Home"
            onPress={() => navigation.navigate('HomeStackBottomTabNavigator')}
        />
        </View>

  );
}
