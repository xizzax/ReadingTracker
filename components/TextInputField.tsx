import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {Colors} from '../constants/Colors';
import {screenDimensions} from '../constants/ScreenDimensions';
import {globalStyleNumerics} from '../constants/StyleNumerics';
import Icon from 'react-native-vector-icons/Ionicons'; //no error

type textInputFieldProps = {
  autocomplete?: 'email' | 'off' | 'new-password' | 'current-password';
  autoFocus?: boolean;
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always';
  enterKeyHint?: 'done' | 'enter' | 'next' | 'search' | 'send';
  inputMode?: 'none' | 'text' | 'email' | 'search';
  keyboardType?: 'default' | 'email-address';
  multiline?: boolean;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
  scrollEnabled?: boolean;
  secureTextEntry?: boolean;
//   lineBreakStrategyIOS? : "none" | "standard" | "hangul-word" | "push-out";

  iconName?: string;
  iconFtn?: () => void;
};

export default function TextInputField(props: textInputFieldProps) {
  return (
    <View style={textInputFieldStyles.container}>
      <TextInput //TODO: fix the overflow issue
      autoCapitalize="none"
      autoCorrect={false}
      cursorColor={Colors.primary}
      placeholder={props.placeholder}
      placeholderTextColor={Colors.gray}
      textAlign="left"
      style={{
        ...textInputFieldStyles.textInput,
        width: props.iconName
        ? screenDimensions.width * 0.8
        : screenDimensions.width * 0.9,
      }}
      autoComplete={props.autocomplete}
      autoFocus={props.autoFocus}
      clearButtonMode={props.clearButtonMode}
      enterKeyHint={props.enterKeyHint}
      inputMode={props.inputMode}
      keyboardType={props.keyboardType}
      multiline={props.multiline}
      onChangeText={props.onChangeText}
      onSubmitEditing={props.onSubmitEditing}
      secureTextEntry={props.secureTextEntry}
      scrollEnabled={props.scrollEnabled}
      />
      {props.iconName && (
      <Pressable onPress={props.iconFtn}>
        <Icon
        name={props.iconName}
        size={globalStyleNumerics.iconSize - 5}
        color={Colors.gray}
        />
      </Pressable>
      )}
    </View>
  );
}

const textInputFieldStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.gray,
    width: screenDimensions.width * 0.9,
    padding:10,
    height: 60,
    borderRadius: globalStyleNumerics.borderRadius,
    marginVertical: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    height: 60,
    borderRadius: globalStyleNumerics.borderRadius,
    flex: 1,
    paddingRight: 10,

  },
});
