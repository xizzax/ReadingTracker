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

  //TODO: get input values
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
              setLoadingGoogle(false); //TODO: add set loading to sign in screen too
            });
          }}
        />
      </View>

      {/* <Modal
          animationType='fade'
          transparent={true}
          visible={loading}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setLoading(false);
          }}>
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <View
                    style={{
                    width: 100,
                    height: 100,
                    backgroundColor: Colors.lightGray,
                    borderRadius: 10,
                    shadowColor: Colors.black,
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            </View>
          </Modal> */}

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
        />
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
        <TextInputField
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          inputMode="text"
          enterKeyHint="done"
          iconName={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          iconFtn={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        />
      </View>
      <View>
        <Button
          title="Sign Up"
          isSecondary={true}
          isLoading={loadingEmail}
          onPressFtn={() => {
            //TODO: Add validation for email and password
            setLoadingEmail(true);
            emailsignup('mingyu', 'mingyu@svt.com', 'wonwoo').finally(() => {
              setLoadingEmail(false);
            });
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
  googleBtnView: {
    marginVertical: 25,
  },
});
