import {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import Button from '../../components/buttons/Button';
import TextInputField from '../../components/TextInputField';
import {globalTextStyles} from '../../styles/TextStyles';
import {StyleSheet} from 'react-native';
import {googleauth} from '../../firebase/firebase_auth/google/GoogleSignIn';
import {Colors} from '../../constants/Colors';
import {emailsignup} from '../../firebase/firebase_auth/email/EmailSignUp';

export default function EmailSignUpScreen({navigation}: any) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  //inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Please fill in all fields!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
      return;
    }
    setLoadingEmail(true);
    emailsignup(name, email, password)
      .catch(error => {
        //TODO: check this catch thing again 
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
          return;
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
          return;
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert('Password must be at least 6 characters');
          return;
        }
        console.error(error);
      })
      .finally(() => {
        setLoadingEmail(false); //DONE: add set loading to sign in screen too
      });
  };

  //DONE: get input values
  return (
    <SafeAreaView style={signInScreenStyles.container}>
      <View>
        <Text style={{...globalTextStyles.headerText}}>Sign Up</Text>
      </View>
      <View style={signInScreenStyles.googleBtnView}>
        <Button
          title="Sign Up with Google"
          isLoading={loadingGoogle}
          onPressFtn={() => {
            setLoadingGoogle(true);
            googleauth().finally(() => {
              setLoadingGoogle(false); //DONE: add set loading to sign in screen too
            });
          }}
        />
      </View>

      {/* Divider */}
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.gray,
            marginHorizontal: 10,
          }}
        />
        <View>
          <Text
            style={{textAlign: 'center', ...globalTextStyles.subheaderText}}>
            or with email
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.gray,
            marginHorizontal: 10,
          }}
        />
      </View>
      {/* Divider end */}

      <View>
        <TextInputField
          placeholder="Name"
          autoFocus={true}
          clearButtonMode="while-editing"
          inputMode="text"
          enterKeyHint="next"
          onChangeText={text => setName(text)}
        />
        <TextInputField
          placeholder="Email"
          clearButtonMode="while-editing"
          inputMode="email"
          keyboardType="email-address"
          enterKeyHint="next"
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
          onChangeText={text => setPassword(text)}
        />
        <TextInputField
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          inputMode="text"
          enterKeyHint="done"
          iconName={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          iconFtn={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>
      <View>
        <Button
          title="Sign Up"
          isSecondary={true}
          isLoading={loadingEmail}
          onPressFtn={handleSubmit}
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
  googleBtnView: {
    marginVertical: 25,
  },
});
