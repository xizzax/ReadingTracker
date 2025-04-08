import auth from '@react-native-firebase/auth';

export async function emailSignIn(email: string, password: string) {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      console.log('User account signed in!');
      console.log(auth().currentUser?.uid);
      //TODO: fetch users document
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
