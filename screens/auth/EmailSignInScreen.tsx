import {SafeAreaView, View, Text, StyleSheet, TextInput} from 'react-native';
import Button from '../../components/buttons/Button';
import {googleauth} from '../../firebase/firebase_auth/google/GoogleSignIn';
import {Colors} from '../../constants/Colors';
import {globalTextStyles} from '../../styles/TextStyles';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import TextInputField from '../../components/TextInputField';
import {useState} from 'react';

export default function EmailSignInScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);

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
        <Button title="Sign In" onPressFtn={() => {
          //TODO: email sign in
        }} />
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
