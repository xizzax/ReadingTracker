import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { screenDimensions } from '../../constants/ScreenDimensions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleauth } from '../../firebase/firebase_auth/google/GoogleSignIn';

//TODO: android googlre sign in setup (from google sign in library)
export default function SignInScreen() {


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


