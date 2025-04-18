import React, {useEffect, useState, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import AuthStackNavigator from './stacks/AuthStackNavigator';
import HomeStackNavigator from './stacks/HomeStackNavigator';
import {reset, setUserId} from './state/slices/user_data/UserDataSlice';
import {fetchUserData} from './state/slices/user_data/thunks/FetchUserData';
import SetGoalScreen from './screens/home/SetGoalScreen';
import AppNavigator from './stacks/AppNavigator';
import {useNavigation} from '@react-navigation/native';

function App(): React.JSX.Element {
  const [user, setUser] = useState(null);
  const listener = useRef(()=>{})
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    listener.current() // getting rid of listener after one call
    setUser(user);
    // console.log(user._user.uid);
    if (user) {
      // dispatch(setUserId(user.uid));
      // dispatch(fetchUserData(user.uid));
      //do nothing
    } else {
      dispatch(reset()); //TODO: move to sign out!
    }
  }

  // auth listener
  useEffect(() => {
    listener.current = auth().onAuthStateChanged(onAuthStateChanged);

    return listener.current;
  }, [user]);

  // return <>{user ? <HomeStackNavigator /> : <AuthStackNavigator />}</>;
  return <AppNavigator />;
}

export default App;
