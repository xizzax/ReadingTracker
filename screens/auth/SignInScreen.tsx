import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { screenDimensions } from '../../constants/ScreenDimensions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

//TODO: android googlre sign in setup (from google sign in library)
export default function SignInScreen() {

  // Configure google sign in
  GoogleSignin.configure({
    webClientId: '448742658571-9j05dttdtt81u603k6gbic8icf2rq8et.apps.googleusercontent.com',
  });

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryButton title="Sign In With Apple" onPressFtn={() => {}} />
      <View style={styles.secondaryBtnContainer}>
          <SecondaryButton title="Google" onPressFtn={googleauth} width={screenDimensions.width * 0.42}/>
            <View style={{width: 10}}/>
          <SecondaryButton title="Email" onPressFtn={() => {}}  width={screenDimensions.width * 0.42}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  secondaryBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },

});

async function googleauth(){
  console.log("google auth ftn starts here")
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();

  // Try the new style of google-sign in result, from v13+ of that module
  let idToken = signInResult.data?.idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
