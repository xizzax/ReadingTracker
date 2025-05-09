import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors} from '../constants/Colors';
import {globalTextStyles} from '../styles/TextStyles';
import {screenDimensions} from '../constants/ScreenDimensions';
import React, {useState} from 'react';
import Button from './buttons/Button';
import TextButton from './buttons/TextButton';
import {globalStyleNumerics} from '../constants/StyleNumerics';
import {Dropdown} from 'react-native-element-dropdown';
import TextInputField from './TextInputField';
import { useDispatch } from 'react-redux';
import { updateFinishedBooks, updateReadingProgress } from '../state/slices/user_data/UserDataSlice';

interface ReadingNowBookProps {
  isbn: string;
  title: string;
  author: string;
  progress: number;
  coverUrl: string;
  totalPages: number;
  readPages: number;
}

export default function ReadingNowBook(props: ReadingNowBookProps) {
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [progressType, setProgressType] = useState('pages');
  const [pagesRead, setPagesRead] = useState(props.readPages);
  
  const [alreadyFinishedVisible, setAlreadyFinishedVisible] = useState(false);
  const [finishedBook, setFinishedBook] = useState(false);
  const [review, setReview] = useState('');

  const dispatch = useDispatch();

  const updateProgress = (isbn: string, pagesRead: number) => {
    console.log("isbn: ", isbn);
    console.log(pagesRead);
    dispatch(updateReadingProgress({isbn, pagesRead}));
  }

  const bookFinished = (isbn: string, review: string) => {
    // console.log("isbn: ", isbn);
    // console.log("finished");
    // console.log("review", review);
    dispatch(updateFinishedBooks({isbn, review}));
  }

  return (
    <Pressable onPress={() => setProgressModalVisible(true)}>

      {/* progress update modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={progressModalVisible}
        onRequestClose={() => {
          setProgressModalVisible(false);
          setAlreadyFinishedVisible(false);
        }}>
        <Pressable
          style={{flex: 1}}
          onPress={() => {
            setProgressModalVisible(false);
            setAlreadyFinishedVisible(false);
          }}>
          <View style={readingNowBookStyles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={readingNowBookStyles.modal}>
                <Text style={globalTextStyles.subheaderText}>
                  Update reading progress:
                </Text>
                <View style={readingNowBookStyles.updateProgressView}>
                  <View style={readingNowBookStyles.progressInputContainer}>
                    <TextInput
                      style={readingNowBookStyles.progressInput}
                      keyboardType="number-pad"
                      cursorColor={Colors.primary}
                      placeholder={props.readPages.toString()}
                      placeholderTextColor={Colors.gray}
                      textAlign="center"
                      onChangeText={(text)=>{
                        if(progressType === 'percent'){
                          setPagesRead((props.totalPages * parseFloat(text)) / 100);
                        }else{
                          setPagesRead(parseInt(text));
                        }
                      }}
                    />
                  </View>
                  <Text style={globalTextStyles.subheaderText}> / </Text>
                  <View style={readingNowBookStyles.progressInputContainer}>
                    <TextInput
                      style={readingNowBookStyles.progressInput}
                      cursorColor={Colors.primary}
                      placeholderTextColor={Colors.gray}
                      textAlign="center"
                      editable={false}
                      value={props.totalPages.toString()}
                    />
                  </View>
                  <Dropdown
                    style={readingNowBookStyles.dropdown}
                    containerStyle={readingNowBookStyles.dropdownListContainer}
                    data={[
                      {
                        label: 'pages',
                        value: 'pages',
                      },
                      {
                        label: '%',
                        value: 'percent',
                      },
                    ]}
                    placeholder="pages"
                    labelField="label"
                    valueField="value"
                    onChange={item => setProgressType(item.value)}
                  />
                </View>
                <TextButton
                  title="I already finished it"
                  onPressFtn={() => {
                    setFinishedBook(true);
                    setAlreadyFinishedVisible(true);
                  }}
                />
                {alreadyFinishedVisible && (
                  <View style={readingNowBookStyles.updateProgressView}>
                   <TextInputField
                      placeholder="Enter your review here..."
                      width={screenDimensions.width * 0.75}
                      height={200}
                      borderRadius={20}
                      multiline={true}
                      enterKeyHint='done'
                      onChangeText={text => setReview(text)}
                      onSubmitEditing={() => {
                        // console.log(review)
                      }}
                    />
                  </View>
                )}
                <View style={readingNowBookStyles.saveBtnContainer}>
                  <Button
                    title="Save"
                    width={150}
                    height={50}
                    onPressFtn={() => {
                      if(finishedBook){
                        bookFinished(props.isbn, review);
                      }
                      else{
                        updateProgress(props.isbn, pagesRead);
                      }
                      setProgressModalVisible(false);
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Pressable>
      </Modal>
      {/* -------------------------------------- */}
      <View style={readingNowBookStyles.container}>
        <View style={readingNowBookStyles.container2}>
          <View style={readingNowBookStyles.imageView}>
            <Image
              source={{
                uri: props.coverUrl,
              }}
              style={readingNowBookStyles.image}
            />
          </View>
          <View style={readingNowBookStyles.textContainer}>
            {/* TODO: make this clickable for notes */}
            <Text
              style={{
                ...globalTextStyles.bodyText,
                ...readingNowBookStyles.title,
              }}>
              {props.title}
            </Text>
            <Text
              style={{
                ...globalTextStyles.bodyText,
                ...readingNowBookStyles.author,
              }}>
              by {props.author}
            </Text>
          </View>
        </View>
        <View>
          <AnimatedCircularProgress
            // make this clickable to update progress
            size={75}
            width={7}
            fill={props.progress}
            rotation={0}
            lineCap="round"
            tintColor={Colors.primary}
            backgroundColor={Colors.lightGray}>
            {fill => <Text>{props.progress.toFixed(0)}%</Text>}
          </AnimatedCircularProgress>
        </View>
      </View>
    </Pressable>
  );
}

const readingNowBookStyles = StyleSheet.create({
  container: {
    width: screenDimensions.width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenDimensions.width * 0.5,
  },
  imageView: {
    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // Shadow for Android (elevation)
    elevation: 5,
  },
  image: {
    height: 112,
    width: 75,
    borderRadius: 10,
  },
  textContainer: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: Colors.gray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  updateProgressView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressInputContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    width: '30%',
    padding: 10,
    height: 30,
    borderRadius: globalStyleNumerics.borderRadius,
    marginVertical: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressInput: {
    fontSize: 16,
    height: 60,
    borderRadius: globalStyleNumerics.borderRadius,
    flex: 1,
    paddingRight: 10,
  },
  saveBtnContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    marginLeft: 5,
    borderWidth: 1,
    borderColor: Colors.gray,
    width: '30%',
    height: 30,
    borderRadius: globalStyleNumerics.borderRadius,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dropdownListContainer: {
    borderRadius: 10,
    paddingHorizontal: 2,
  },
});
