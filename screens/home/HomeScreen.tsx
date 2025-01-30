
import { Text, View, SafeAreaView } from "react-native"
import TopDateBar from "../../components/top_date_bar/TopDateBar";

export default function HomeScreen(){
    return (
        <SafeAreaView>
            <View style={{padding: 20}}>
                <Text>Hello</Text>
                <TopDateBar />
            </View>
        </SafeAreaView>
    );
}

