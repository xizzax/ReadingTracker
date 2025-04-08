import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { makeNewDocumentForUser } from '../../firestore/FirestoreFunctions';

export async function googleAuth() {
  // Configure google sign in
  GoogleSignin.configure({
    webClientId:
      '448742658571-9j05dttdtt81u603k6gbic8icf2rq8et.apps.googleusercontent.com',
  });

  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();

  // Try the new style of google-sign in result, from v13+ of that module
  let idToken = signInResult.data?.idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    signInResult.data.idToken,
  );

  // Sign-in the user with the credential
  await auth().signInWithCredential(googleCredential);

  await makeNewDocumentForUser(
    auth().currentUser?.uid as string
  );

  return;
}
