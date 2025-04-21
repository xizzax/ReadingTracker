import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import Button from '../../components/buttons/Button';
import React, {useEffect, useState, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import { screenDimensions } from '../../constants/ScreenDimensions';
import { useDispatch } from 'react-redux';
import { setUserData, setUserId } from '../../state/slices/user_data/UserDataSlice';
import { fetchUserDataFirestore } from '../../firebase/firestore/FirestoreFunctions';



export default function WelcomeScreen({navigation}:any) {

  //TODO: move this logic to splash screen
  const [user, setUser] = useState(null);
  const listener = useRef(() => {});
  const dispatch = useDispatch();

  async function onAuthStateChanged(user) {
    listener.current(); // getting rid of listener after one call
    setUser(user);
    if(user){
      console.log("currently logged in : ", user.uid);
      dispatch(setUserId(user.uid));
      const userData = await fetchUserDataFirestore(user.uid);
     dispatch(setUserData(userData));
      navigation.replace('HomeStack');

    }
  }
  // auth listener
  useEffect(() => {
    listener.current = auth().onAuthStateChanged(onAuthStateChanged);
    return listener.current;
  }, []);

  


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
