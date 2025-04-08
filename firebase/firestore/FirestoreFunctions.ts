import firestore from '@react-native-firebase/firestore';

export async function makeNewDocumentForUser(userId: string) {
  await firestore()
    .collection('user_data')
    .doc(userId)
    .set({
        //TODO: add empty data model here??
        goal: {
            frequency: "daily", // can be:  "daily", "weekly", "monthly"
            time_in_seconds: 0,
        },
        currently_reading: [],
        read: [],
        reading_history: []
    })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch(error => {
      console.error('Error writing document: ', error);
    });
}
