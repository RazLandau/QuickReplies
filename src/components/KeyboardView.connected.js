import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {KeyboardRegistry} from 'react-native-keyboard-input';
import store from '../Redux/store';
import KeyboardView from './KeyboardView';
import { KEYBOARD_VIEW } from '../consts/consts';

class ConnectedKeyboardView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Provider store={store}>
            <KeyboardView />
        </Provider>
    );
  }
}

KeyboardRegistry.registerKeyboard(KEYBOARD_VIEW, () => ConnectedKeyboardView);
