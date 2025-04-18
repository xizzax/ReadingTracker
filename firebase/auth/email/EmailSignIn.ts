import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../../state/slices/user_data/UserDataSlice';
import { fetchUserData } from '../../../state/slices/user_data/thunks/FetchUserData';

export async function emailSignIn(email: string, password: string) {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
    })
    .catch(error => {
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
}
