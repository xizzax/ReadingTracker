import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  LayoutAnimation,
  Pressable,
  ScrollView,
} from 'react-native';
import {useSearchBooksQuery} from '../../state/slices/ApiSlice';
import {Colors} from '../../constants/Colors';
import {globalStyleNumerics} from '../../constants/StyleNumerics';
import Icon from 'react-native-vector-icons/Ionicons'; //no error
import {globalTextStyles} from '../../styles/TextStyles';
import {useState} from 'react';
import Button from '../../components/buttons/Button';
import {screenDimensions} from '../../constants/ScreenDimensions';
import BookTile from '../../components/BookTile';

export default function SearchBookScreen() {
  //---------------------------------------
  //search handling
  //---------------------------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [triggerSearch, {data: books, isLoading, error}] = useSearchBooksQuery();

  const handleSubmit = (query: string) => {
    const formattedQuery = query.toLowerCase().split(' ').join('+');
    triggerSearch(formattedQuery);
    setSearched(true);
  };

  return (
    <SafeAreaView style={addBookScreenStyles.screen}>
      <View style={addBookScreenStyles.searchHeader}>
        <View style={addBookScreenStyles.searchBar}>
          <TextInput //TODO: change to text input component
            placeholder="Search books"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSubmit(searchQuery)}
            style={addBookScreenStyles.textInput}
          />
          <Button
            onPressFtn={() => handleSubmit(searchQuery)}
            title="Search"
            height={36}
            width={screenDimensions.width * 0.25}
            fontSize={14}
          />
        </View>
      </View>
      <View style={addBookScreenStyles.resultsContainer}>
        {searched && (
          <ScrollView>
            {books?.map((book, index) => (
              <BookTile
                key={index}
                title={book.title}
                // subtitle={book.subtitle}
                author={book.authors}
                // genres={book.genres}
                coverUrl={book.coverUrl}
                // isbn={book.isbn}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const addBookScreenStyles = StyleSheet.create({
  screen: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  searchHeader: {
    width: '90%',
    flexGrow: 1,
  },
  resultsContainer: {
    // flex: 4,
    width: '90%',
    paddingVertical: 20,
  },
  searchBar: {
    alignItems: 'flex-end',
    // borderColor: "red",
    // borderWidth: 2,
  },
  textInput: {
    borderColor: Colors.gray,
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,

    fontFamily: 'Rounded Mplus 1c Medium',
    fontSize: 16,
    borderRadius: globalStyleNumerics.borderRadius,
    width: '100%',
    marginVertical: 5,
  },
  moreOptionsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
