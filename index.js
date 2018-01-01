import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import MainScreen from './src/screens/MainScreen';
import EditScreen from './src/screens/EditScreen';
import store from './src/Redux/store';
import { MAIN_SCREEN, EDIT_SCREEN, TITLE } from './src/consts/index';

export function registerScreens() {
  Navigation.registerComponent(MAIN_SCREEN, () => MainScreen, store, Provider);
  Navigation.registerComponent(EDIT_SCREEN, () => EditScreen, store, Provider);
}

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: MAIN_SCREEN,
    title: TITLE
  }
});
