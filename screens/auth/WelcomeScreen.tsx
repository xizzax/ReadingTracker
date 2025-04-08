import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import Button from '../../components/buttons/Button';
import { screenDimensions } from '../../constants/ScreenDimensions';


export default function WelcomeScreen({navigation}:any) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={welcomeScreenStyles.screen}>

        <View style={welcomeScreenStyles.image}>
          <Image source={require('../../assets/images/CatBookDoodle.jpg')} />
        </View>

        <View style={welcomeScreenStyles.textContainer}>
          <Text style={welcomeScreenStyles.header}>Let's make reaching your reading goal easier</Text>
          <Text style={welcomeScreenStyles.text}>
            Track your reading, record your thoughts and mark your favorite
            quotes
          </Text>
        </View>

        <View style={welcomeScreenStyles.buttonContainer}>
          <View style={{marginBottom: 10}}>
            <Button title='Start Reading' onPressFtn={()=>{
              // console.log("Start Reading Button Pressed"); //TODO: functionality to go to next screen
              navigation.navigate('SignIn');
            }}/>
          </View>
         
        </View>

      </View>
    </SafeAreaView>
  );
}

const welcomeScreenStyles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    height: screenDimensions.height * 0.25,
  },
  textContainer: {
    paddingRight: 30,
  },
  header: {
    fontSize: 30, // TODO: convert these to global styles
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    marginTop: 15,
  },
  buttonContainer: {},
});
