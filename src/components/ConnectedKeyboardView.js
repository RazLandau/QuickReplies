import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {KeyboardRegistry} from 'react-native-keyboard-input';
import store from '../Redux/store';
import KeyboardView from './KeyboardView';
import { KEYBOARD_VIEW } from '../consts/index';

class ConnectedKeyboardView extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  onButtonPress() {
    KeyboardRegistry.onItemSelected(KEYBOARD_VIEW);
  }

  render() {
    return (
        <Provider store={store}>
            <KeyboardView onEditClick={this.props.onEditClick} />
        </Provider>
    );
  }
}

KeyboardRegistry.registerKeyboard(KEYBOARD_VIEW, () => ConnectedKeyboardView);
