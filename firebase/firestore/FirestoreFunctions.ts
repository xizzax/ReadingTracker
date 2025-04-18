import firestore from '@react-native-firebase/firestore';


export async function makeNewDocumentForUser(userId: string) {
  await firestore()
    .collection('user_data')
    .doc(userId)
    .set({
      //TODO: add empty data model here??
      goal: {
        frequency: 'daily', // can be:  "daily", "weekly", "monthly"
        time_in_seconds: 0,
        goal_set: false,
      },
      currently_reading: [],
      read: [],
      reading_history: [],
    })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch(error => {
      console.error('Error writing document: ', error);
    });
}

export async function setGoalFirestore(
  userId: string,
  goalSet: boolean,
  time_in_seconds: number,
) {
  console.log((userId));
  
  await firestore().collection('user_data').doc(userId).update(
    {
      goal: {
        goal_set: goalSet,
        time_in_seconds: time_in_seconds,
      }
    }
  ).catch(e => {
    console.log(e);
    
  });
}
