import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Button from '../../components/buttons/Button';
import {googleAuth} from '../../firebase/auth/google/GoogleSignIn';
import {globalTextStyles} from '../../styles/TextStyles';
import {useState} from 'react';
import TextButton from '../../components/buttons/TextButton';
import { useDispatch } from 'react-redux';
import { setUserData, setUserId } from '../../state/slices/user_data/UserDataSlice';
import { fetchUserDataFirestore } from '../../firebase/firestore/FirestoreFunctions';
import auth from '@react-native-firebase/auth';


//TODO: android googlre sign in setup (from google sign in library)
//TODO: multiple auth methods for one firebase user
export default function SignInScreen({navigation}: any) {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={signInScreenStyles.container}>
      <View style={{}} />

      <View>
        <Button
          title="Sign In with Google"
          isLoading={loadingGoogle}
          onPressFtn={async () => {
            setLoadingGoogle(true);
            googleAuth()
            .then(async ()=>{
              const userid = auth().currentUser?.uid;
              dispatch(setUserId(userid));
              const userData = await fetchUserDataFirestore(userid!);
              dispatch(setUserData(userData));
              navigation.replace("HomeStack");
            })
            .finally(() => {
              setLoadingGoogle(false); 
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
          Don't have an account?
        </Text>
        <TextButton
          title="Sign Up"
          onPressFtn={() => {
            navigation.navigate('SignUp');
          }}
        />

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
  
});
