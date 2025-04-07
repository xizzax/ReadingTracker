import {SafeAreaView, View, Text, StyleSheet, TextInput} from 'react-native';
import Button from '../../components/buttons/Button';
import {googleAuth} from '../../firebase/firebase_auth/google/GoogleSignIn';
import {Colors} from '../../constants/Colors';
import {globalTextStyles} from '../../styles/TextStyles';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import TextInputField from '../../components/TextInputField';
import {useState} from 'react';
import {emailSignIn} from '../../firebase/firebase_auth/email/EmailSignIn';

export default function EmailSignInScreen() {
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
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/wrong-password') {
          console.error('Wrong password');
        } else if (error.code === 'auth/user-not-found') {
          console.error('User not found');
        } else if (error.code === 'auth/invalid-email') {
          console.error('Invalid email');
        } else {
          console.error('something went wrong. try again');
          console.error(error);
        }
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
        {/* <TextInputField
          placeholder="Name"
          autoFocus={true}
          clearButtonMode="while-editing"
          inputMode="text"
          enterKeyHint="next"
          iconName="person-circle-outline"
        /> */}
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
        {/* <TextInputField
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          inputMode="text"
          enterKeyHint="done"
          iconName={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          iconFtn={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        /> */}
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
