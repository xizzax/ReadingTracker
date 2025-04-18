import auth from '@react-native-firebase/auth';

export async function signout() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}
