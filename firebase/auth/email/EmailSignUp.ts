import auth from '@react-native-firebase/auth';
import { makeNewDocumentForUser } from '../../firestore/FirestoreFunctions';

export async function emailSignUp(
  name: string,
  email: string,
  password: string,
) {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      await auth().currentUser?.updateProfile({
        displayName: name
      });
      await makeNewDocumentForUser(auth().currentUser?.uid as string);
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}
