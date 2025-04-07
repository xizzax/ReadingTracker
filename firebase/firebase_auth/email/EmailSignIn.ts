import auth from '@react-native-firebase/auth';
export async function emailSignIn(email: string, password: string) {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account signed in!');
      console.log(auth().currentUser?.uid);
    })
    .catch(error => {
      if (error.code === 'auth/wrong-password') {
        console.log('Wrong password');
      }
      if (error.code === 'auth/user-not-found') {
        console.log('User not found');
      }
      console.error(error);
    });
}
