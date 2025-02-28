import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import {globalTextStyles} from '../styles/TextStyles';
import {Colors} from '../constants/Colors';
import {Image} from 'react-native';
import {screenDimensions} from '../constants/ScreenDimensions';

type bookTileProps = {
  title: string;
  author: string;
  coverUrl: string;
};

export default function BookTile(props: bookTileProps) {
  fetch(props.coverUrl)
    .then(res => {
      // the request status in in res.status
      // res.status = 404 -> error
      // res.status = 200 -> success
    })
    .catch(e => {
      console.log('eroor: ' + e);
    });

  return (
    <View style={bookTileStyles.container}>
      <View style={bookTileStyles.container2}>
        <View style={bookTileStyles.imageView}>
          <Image
            source={{
              uri: props.coverUrl,
            }}
            style={bookTileStyles.image}
            onError={() => console.error('Failed to load image')}
          />
        </View>
        <View style={bookTileStyles.textContainer}>
          <Text
            style={{
              ...globalTextStyles.bodyText,
              ...bookTileStyles.title,
            }}>
            {props.title}
          </Text>
          <Text
            style={{
              ...globalTextStyles.bodyText,
              ...bookTileStyles.author,
            }}>
            by {props.author}
          </Text>
        </View>
      </View>
    </View>
  );
}

const bookTileStyles = StyleSheet.create({
  container: {
    width: screenDimensions.width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
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
