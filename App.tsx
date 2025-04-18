import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import AuthStackNavigator from './stacks/AuthStackNavigator';
import HomeStackNavigator from './stacks/HomeStackNavigator';
import {reset, setUserId} from './state/slices/user_data/UserDataSlice';
import {fetchUserData} from './state/slices/user_data/thunks/FetchUserData';
import SetGoalScreen from './screens/home/SetGoalScreen';

function App(): React.JSX.Element {
  const [user, setUser] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  const goal = useSelector((state: any) => state.userDataState.goal);
  const isGoalSet = goal.goalSet;

  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user._user.uid);
    if (user) {
      dispatch(setUserId(user._user.uid));
      dispatch(fetchUserData(user._user.uid));
    } else {
      dispatch(reset());
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('user is: ', user);

    return subscriber;
  }, [user]);

  return <>{user ? <HomeStackNavigator /> : <AuthStackNavigator />}</>;
}

export default App;
