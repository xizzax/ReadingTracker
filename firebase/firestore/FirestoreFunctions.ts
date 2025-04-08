import firestore from '@react-native-firebase/firestore';

export async function getAll(){
    const users = await firestore().collection('user_data').get();
    console.log("users: " + JSON.stringify(users.docs));
}