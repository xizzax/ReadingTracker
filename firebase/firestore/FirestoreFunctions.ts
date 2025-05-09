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
      console.log('error: ', e);
    });
}

export async function fetchUserDataFirestore(userId: string) {
  const userData = await firestore().collection('user_data').doc(userId).get();
  // console.log("user_data: ", userData.data());
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

export async function checkTodaysReadingHistoryFirestore(
  userId: string,
): Promise<any | false> {
  try {
    const doc = await firestore().collection('user_data').doc(userId).get();
    const readingHistory = doc.get('reading_history');
    // console.log("reading history: ", readingHistory);

    const today = new Date();
    const todayFormatted = `${String(today.getDate()).padStart(
      2,
      '0',
    )}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

    // Filter history for today's entry
    const todaysEntry = readingHistory.find((entry: any) => {
      const entryDate = entry.date;
      return entryDate === todayFormatted;
    });
    return todaysEntry;
  } catch (error) {
    console.log('Error getting document:', error);
    return false;
  }
}

export async function updateTodaysReadingTimeFirestore(
  userId: string,
  readingTime: number,
) {
  const docRef = firestore().collection('user_data').doc(userId);
  console.log('doc ref gotten');
  await docRef
    .get()
    .then(async doc => {
      const readingHistory = doc.get('reading_history') || [];
      const today = new Date();
      const todayFormatted = `${String(today.getDate()).padStart(
        2,
        '0',
      )}-${String(today.getMonth() + 1).padStart(
        2,
        '0',
      )}-${today.getFullYear()}`;

      const index = readingHistory.findIndex(
        (entry: any) => entry.date === todayFormatted,
      );
      if (index !== -1) {
        // Update readingTime for today's entry
        readingHistory[index].reading_time = readingTime;
      }

      await docRef.update({
        reading_history: readingHistory,
      });
    })
    .catch(e => console.log("error getting today's reading time", e));
}

export async function getTodaysReadingTimeFirestore(userId: string) {
  const docRef = firestore().collection('user_data').doc(userId);
  await docRef
    .get()
    .then(async doc => {
      const readingHistory = doc.get('reading_history') || [];
      const today = new Date();
      const todayFormatted = `${String(today.getDate()).padStart(
        2,
        '0',
      )}-${String(today.getMonth() + 1).padStart(
        2,
        '0',
      )}-${today.getFullYear()}`;

      const index = readingHistory.findIndex(
        (entry: any) => entry.date === todayFormatted,
      );
      if (index !== -1) {
        // Update readingTime for today's entry
        return readingHistory[index].reading_time;
      }
    })
    .catch(e => console.log("error getting today's reading time", e));
}

export async function updateReadingProgressFirestore(
  userId: string,
  isbn: string,
  pagesRead: number,
) {
  const docRef = firestore().collection('user_data').doc(userId);
  console.log('doc ref gotten');
  await docRef
    .get()
    .then(async doc => {
      const currentlyReading = doc.get('currently_reading') || [];
      const index = currentlyReading.findIndex(
        (book: any) => book.isbn === isbn,
      );
      if (index !== -1) {
        // Update readingTime for today's entry
        currentlyReading[index].read_pages = pagesRead;
      }

      await docRef.update({
        currently_reading: currentlyReading,
      });
    })
    .then(() =>
      console.log('reading progress updated in firestore successfully'),
    )
    .catch(e => console.log('error updating reading progress', e));
}

export async function updateReadBooksFirestore (
  userId: string,
  isbn: string,
  startDate: string,
  endDate: string,
  timeRead: number,
  review: string,
  readPages: number,
  totalPages: number
){
  const docRef = firestore().collection('user_data').doc(userId);

  // remove book from currently reading
  await docRef.update({
    currently_reading: firestore.FieldValue.arrayRemove({
      isbn: isbn,
      read_pages: readPages,
      start_date: startDate,
      time_read: timeRead,
      total_pages: totalPages,
    }),
  });

  await docRef.update({
    finished_books: firestore.FieldValue.arrayUnion({
      isbn: isbn,
      start_date: startDate,
      end_date: endDate,
      time_read: timeRead,
      review: review,
    }),
  });
}
