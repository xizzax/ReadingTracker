import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function emailSignIn(email: string, password: string) {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      console.log("user id: ", auth().currentUser?.uid);
      const userData = await firestore()
        .collection('user_data')
        .doc(auth().currentUser?.uid)
        .get(); //TODO: use this to populate user data later
      console.log('User data: ', userData.id);
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
