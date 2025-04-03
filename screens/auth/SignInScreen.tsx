import {View, Text, Button, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {googleauth} from '../../firebase/firebase_auth/google/GoogleSignIn';
import {Colors} from '../../constants/Colors';
import { globalTextStyles } from '../../styles/TextStyles';

//TODO: android googlre sign in setup (from google sign in library)
//TODO: multiple auth methods for one firebase user
export default function SignInScreen({navigation}: any) {
  return (
    <SafeAreaView style={signInScreenStyles.container}>
      <View style={{}} />

      <View>
        <PrimaryButton title="Sign In with Google" onPressFtn={googleauth} />
        <View style={{height: 24}} />
        <SecondaryButton
          title="Sign In with Email"
          onPressFtn={() => {
            navigation.navigate('EmailSignIn');
          }}
        />
      </View>
      <View style={signInScreenStyles.bottomText}>
        <Text style={{
          ...globalTextStyles.bodyText,
        }}>Don't have an account? </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('SignUp');
          }
        }>
          <Text style={{
            ...globalTextStyles.bodyText,
            ...signInScreenStyles.signUpBtn,
          
          }}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const signInScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  signUpBtn: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});
