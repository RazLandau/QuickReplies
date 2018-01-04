import { createStore, applyMiddleware , compose} from 'redux';
import reducers from './reducers';

const composeEnhancers =
  typeof global.window === 'object' &&
  global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      name: 'quick-replies'
    }) : compose;

    const enhancer = composeEnhancers();

export default createStore(reducers, {}, enhancer);
