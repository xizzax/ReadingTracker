import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../components/buttons/Button';
import {globalTextStyles} from '../../styles/TextStyles';
import TextInputField from '../../components/TextInputField';
import {useState} from 'react';
import {emailSignIn} from '../../firebase/auth/email/EmailSignIn';
import { useDispatch } from 'react-redux';
import { setUserData, setUserId } from '../../state/slices/user_data/UserDataSlice';
import auth from '@react-native-firebase/auth';
import { fetchUserDataFirestore } from '../../firebase/firestore/FirestoreFunctions';


export default function EmailSignInScreen({navigation}: any) {
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    // Check if email and password are not empty
    if (email === '' || password === '') {
      console.error('Email and password cannot be empty');
      return;
    }
    setLoading(true);
    await emailSignIn(email, password)
    .then(async()=>{
      const userid = auth().currentUser?.uid;
      dispatch(setUserId(userid));
      const userData = await fetchUserDataFirestore(userid!);
      dispatch(setUserData(userData));
      navigation.replace("HomeStack");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <SafeAreaView style={signInScreenStyles.container}>
      <View>
        <Text style={{...globalTextStyles.headerText}}>
          Sign In with Email Address
        </Text>
      </View>
      <View>
        <TextInputField
          placeholder="Email"
          clearButtonMode="while-editing"
          inputMode="email"
          keyboardType="email-address"
          enterKeyHint="next"
          // iconName="mail-outline"
          multiline={false}
          onChangeText={text => setEmail(text)}
        />
        <TextInputField
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          inputMode="text"
          enterKeyHint="next"
          iconName={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
          iconFtn={() => setPasswordVisible(!passwordVisible)}
          multiline={false}
          scrollEnabled={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View>
        <Button
          title="Sign In"
          isLoading={loading}
          onPressFtn={() => {
            handleSubmit();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const signInScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
