import firestore from '@react-native-firebase/firestore';

export async function makeNewDocumentForUser(userId: string) {
  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${date.getFullYear()}`;

  await firestore()
    .collection('user_data')
    .doc(userId)
    .set({
      goal: {
        frequency: 'daily', // can be:  "daily", "weekly", "monthly"
        time_in_seconds: 0,
        goal_set: false,
      },
      currently_reading: [],
      read: [],
      reading_history: [
        {
          date: formattedDate,
          goalTime: 0,
          readingTime: 0,
          breakdown: [],
        },
      ],
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

  await firestore()
    .collection('user_data')
    .doc(userId)
    .update({
      goal: {
        goal_set: goalSet,
        time_in_seconds: time_in_seconds,
      },
    })
    .catch(e => {
      console.log("errorrrrr: ", e);
    });
}

export async function fetchUserDataFirestore(userId: string) {
  const userData = await firestore().collection('user_data').doc(userId).get();
  console.log(userData.data());
  return userData.data();
}

export async function addTodaytoReadingHistoryFirestore(
  userId: string,
  date: string,
  goalTime: number,
  readingTime: number,
) {
  await firestore()
    .collection('user_data')
    .doc(userId)
    .update({
      reading_history: firestore.FieldValue.arrayUnion({
        date: date,
        goal_time: goalTime,
        reading_time: readingTime,
        breakdown: [],
      }),
    });
}

export async function checkTodaysReadingHistoryFirestore(userId: string){
  await firestore().collection('user_data').doc(userId).get().then(
    (doc)=>{
     const readingHistory = doc.get("reading_history") || [];
     console.log("reading history: ", readingHistory);
     console.log("type of reading history: ", typeof readingHistory);
     const today = new Date();
     const todayFormatted = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

     // Filter history for today's entry
     const todaysEntry = readingHistory.find((entry: any) => {
       const entryDate = entry.date;
       return entryDate === todayFormatted;
     });

     console.log("Today's Reading Entry:", todaysEntry);
     return todaysEntry;
    }
  ).catch((error) => {
    console.log("Error getting document:", error);
  });
}

