import {View, Text, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import Button from '../../components/buttons/Button';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {googleAuth} from '../../firebase/firebase_auth/google/GoogleSignIn';
import {Colors} from '../../constants/Colors';
import {globalTextStyles} from '../../styles/TextStyles';
import {useState} from 'react';

//TODO: android googlre sign in setup (from google sign in library)
//TODO: multiple auth methods for one firebase user
export default function SignInScreen({navigation}: any) {
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  return (
    <SafeAreaView style={signInScreenStyles.container}>
      <View style={{}} />

      <View>
        <Button
          title="Sign In with Google"
          isLoading={loadingGoogle}
          onPressFtn={() => {
            setLoadingGoogle(true);
            googleAuth().finally(() => {
              setLoadingGoogle(false); //TODO: add set loading to sign in screen too
            });
          }}
        />
        <View style={{height: 24}} />
        <Button
          isSecondary={true}
          title="Sign In with Email"
          onPressFtn={() => {
            navigation.navigate('EmailSignIn');
          }}
        />
      </View>
      <View style={signInScreenStyles.bottomText}>
        <Text
          style={{
            ...globalTextStyles.bodyText,
          }}>
          Don't have an account?{' '}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text
            style={{
              ...globalTextStyles.bodyText,
              ...signInScreenStyles.signUpBtn,
            }}>
            Sign Up
          </Text>
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
