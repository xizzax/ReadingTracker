import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; //no error
import auth from '@react-native-firebase/auth';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import {signout} from '../../firebase/auth/SignOut';
import SettingsButton from '../../components/buttons/SettingsButton';
import {globalTextStyles} from '../../styles/TextStyles';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {reset} from '../../state/slices/user_data/UserDataSlice';
import {Colors} from '../../constants/Colors';
import {screenDimensions} from '../../constants/ScreenDimensions';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Button from '../../components/buttons/Button';

export default function UserProfileScreen({navigation}: any) {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('Display Name');
  const [email, setEmail] = useState('name@email.com');

  useEffect(() => {
    const getUserDetails = () => {
      const user = auth().currentUser;
      if (user) {
        setUserName(user.displayName!);
        setEmail(user.email!);
      }
    };

    getUserDetails();
  }, [userName, email]);

  // appTheme modal
  const [appThemeModalVisible, setAppThemeModalVisible] = useState(false);

  return (
    <SafeAreaView style={userProfileScreenStyles.main}>
      <View style={userProfileScreenStyles.container}>
        {/* ------------------------------------------------ */}
        {/* modals */}
        {/* ------------------------------------------------ */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={appThemeModalVisible}
          onRequestClose={() => {
            setAppThemeModalVisible(false);
          }}>
          <Pressable
            style={{flex: 1}}
            onPress={() => {
              setAppThemeModalVisible(false);
            }}>
            <View style={userProfileScreenStyles.appThemeModalContainer}>
              <TouchableWithoutFeedback>
                <View style={userProfileScreenStyles.appThemeModal}>
                  <Button
                    title="Use System Theme"
                    width={screenDimensions.width * 0.75}
                    onPressFtn={() => {
                      //TODO: add logic here
                    }}
                  />
                  <View style={{height: 10}} />
                  <Button
                    title="Use Light Theme"
                    backgroundColor={Colors.white}
                    textColor={Colors.black}
                    borderColor={Colors.black}
                    width={screenDimensions.width * 0.75}
                    onPressFtn={() => {
                      //TODO: add logic here
                    }}
                  />
                  <View style={{height: 10}} />

                  <Button
                    title="Use Dark Theme"
                    backgroundColor={Colors.black}
                    textColor={Colors.white}
                    width={screenDimensions.width * 0.75}
                    onPressFtn={() => {
                      //TODO: add logic here
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Pressable>
        </Modal>

        <View style={userProfileScreenStyles.header}>
          <View>
            <Text style={globalTextStyles.headerText}>{userName}</Text>
            <Text style={globalTextStyles.subheaderText}>{email}</Text>
          </View>
          <Pressable
            onPress={() => {
              //TODO: implement edit options
            }}>
            <Icon
              name="create-outline"
              size={globalStyleNumerics.iconSize}
              color={Colors.primary}
            />
          </Pressable>
        </View>

        <View style={userProfileScreenStyles.btnContainer}>
          <SettingsButton
            title="Change Goal"
            onPressFtn={() => {
              //TODO: implement changing goal
            }}
          />
          <SettingsButton
            title="App Theme"
            onPressFtn={() => {
              setAppThemeModalVisible(true);
            }}
          />
          <SettingsButton
            title="Invite a Friend"
            onPressFtn={() => {
              ///TODO: invite a friend
            }}
          />
        </View>

        <View style={userProfileScreenStyles.logoutContainer}>
          <SettingsButton
            title="Logout"
            onPressFtn={async () => {
              await signout().then(() => {
                dispatch(reset());
                //timeout for half second to let state reset
                setTimeout(() => {
                  navigation.replace('AuthStack');
                }, 500);
              });
            }}
            color="red"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const userProfileScreenStyles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 70,
  },
  appThemeModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appThemeModal: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
