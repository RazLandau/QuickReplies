import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Platform,
  TextInput,
  Button,
} from 'react-native';
import { Icon } from 'react-native-elements'
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';
import { connect } from 'react-redux';
import * as actions from '../Redux/actions';
import { EDIT_SCREEN } from '../consts/index';
import '../components/ConnectedKeyboardView';
import { KEYBOARD_VIEW, EDIT_BUTTON } from '../consts/index';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customKeyboard: {
        component: undefined,
      },
    };
  }

  goToEditScreen = () => this.props.navigator.showKeyboardView({
    screen: EDIT_SCREEN,
    title: 'Quick Replies'
  })

  resetKeyboardView = () => this.setState({
    customKeyboard: {}
  })

  showKeyboardView = (component) => this.setState({
    customKeyboard: {
      component,
    },
  })

  sendMessage = () => this.props.selectReply('');

  keyboardAccessoryViewContent = () =>
      <View blurType="xlight" style={styles.blurContainer}>
        <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
        <View style={styles.inputContainer}>
          <Icon
          //raised
          //color='#517fa4'
          name='near-me'
          onPress={() => this.showKeyboardView(KEYBOARD_VIEW)}
          />
          <TextInput
            maxHeight={200}
            style={styles.textInput}
            ref={(r) => {
              this.textInputRef = r;
            }}
            placeholder={'Message'}
            onFocus={() => this.resetKeyboardView()}
          />
          <Icon
          name='send'
          onPress={this.sendMessage}
          />
        </View>
      </View>

  onKeyboardItemSelected = (keyboardId, params) => {
    switch(params.item){
      case EDIT_BUTTON:
        this.props.navigator.showModal({
          screen: EDIT_SCREEN,
          title: 'Quick Replies'
        });
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <View contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.welcome}>{this.props.message}</Text>
        </View>
        <KeyboardAccessoryView
          renderContent={this.keyboardAccessoryViewContent}
          kbInputRef={this.textInputRef}
          kbComponent={this.state.customKeyboard.component}
          onItemSelected={this.onKeyboardItemSelected}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {
    justifyContent: 'center',
    padding: 15,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  blurContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
    }),
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 0.5 / PixelRatio.get(),
    borderRadius: 18,
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
});

const mapStateToProps = state =>
  ({ message: state.message });

export default connect(mapStateToProps, actions)(MainScreen);