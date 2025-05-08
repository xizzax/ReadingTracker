import {Image, StyleSheet, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors} from '../constants/Colors';
import {globalTextStyles} from '../styles/TextStyles';
import {screenDimensions} from '../constants/ScreenDimensions';

interface ReadingNowBookProps {
  title: string;
  author: string;
  progress: number;
  coverUrl: string;
}

export default function ReadingNowBook(props: ReadingNowBookProps) {
  return (
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
});
