import auth from '@react-native-firebase/auth';
import {makeNewDocumentForUser} from '../../firestore/FirestoreFunctions';
import {Alert} from 'react-native';

export async function emailSignUp(
  name: string,
  email: string,
  password: string,
) {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      await auth().currentUser?.updateProfile({
        displayName: name,
      });
      await makeNewDocumentForUser(auth().currentUser?.uid as string);
    })
    .catch(error => {
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
    });
}
