import React, {useEffect, useState, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import AppNavigator from './stacks/AppNavigator';
import {useDispatch} from 'react-redux';
import {setUserData, setUserId} from './state/slices/user_data/UserDataSlice';
import {fetchUserDataFirestore} from './firebase/firestore/FirestoreFunctions';
import {Text} from 'react-native';

function App(): React.JSX.Element {
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  // const listener = useRef(() => {});
  // const dispatch = useDispatch();
  // function onAuthStateChanged(user) {
  //   listener.current(); // getting rid of listener after one call
  //   setUser(user);
  // }
  // // auth listener
  // useEffect(() => {
  //   listener.current = auth().onAuthStateChanged(onAuthStateChanged);
  //   return listener.current;
  // }, []);

  // useEffect(() => {
  //   //function to get data
  //   const getData = async (userid: string) => {
  //     console.log('user is logged in!', userid);
  //     dispatch(setUserId(userid));
  //     const userData = await fetchUserDataFirestore(userid);
  //     dispatch(setUserData(userData));
  //   };

  //   if (user) {
  //     getData(user.uid);
  //     setLoading(false);
  //   } else {
  //     console.log('user is not logged in!');
  //     setLoading(false);
  //   }
  // }, [user]);

  return <AppNavigator />;
}

export default App;

