import {View, Text, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {useSearchQuery} from '../../state/slices/ApiSlice';
import {Colors} from '../../constants/Colors';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import Icon from 'react-native-vector-icons/Ionicons'; //no error
import {globalTextStyles} from '../../styles/TextStyles';

export default function SearchBookScreen() {
  // const {
  //   data: books,
  //   isLoading,
  //   error,
  // } = useSearchQuery('the+eye+of+the+world');

  // if (isLoading) {
  //   console.log('loading...');
  // }
  // if (error) {
  //   console.log('error: ' + error);
  // }

  // console.log(books);

  return (
    <SafeAreaView style={addBookScreenStyles.screen}>
      <View style={addBookScreenStyles.searchHeader}>
        <View style={addBookScreenStyles.searchBar}>
          <TextInput
            placeholder="search query"
            style={addBookScreenStyles.textInput}
          
          />
          <Icon
              name="search-circle-outline"
              size={20}
              color={Colors.black}
              style={{
                paddingTop: 3,
              }}
              onPress={() => console.log('down press')}
            />
        </View>
        <View style={addBookScreenStyles.moreOptionsContainer}>
          <Text style={{...globalTextStyles.bodyText}}>More options </Text>
          <Icon
            name="chevron-down-outline"
            size={20}
            color={Colors.black}
            style={{
              paddingTop: 3,
            }}
            onPress={() => console.log('down press')}
          />
        </View>
      </View>
      <View style={addBookScreenStyles.resultsContainer}>
        <Text>Search up your next read!</Text>
      </View>
    </SafeAreaView>
  );
}

const addBookScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  searchHeader: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '90%',
  },
  resultsContainer: {
    flex: 4,
    width: '90%',
    paddingVertical: 20,
  },
  searchBar:{
    
  },
  textInput: {
    borderColor: Colors.gray,
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Rounded Mplus 1c Medium',
    fontSize: 16,
    borderRadius: globalStyleNumerics.borderRadius,
  },
  moreOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
