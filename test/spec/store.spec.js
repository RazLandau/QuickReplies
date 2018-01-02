import { createStore, applyMiddleware, combineReducers } from 'redux';
import { FlushThunks } from 'redux-testkit';

import store from '../../src/Redux/store';
import * as reducers from '../../src/Redux/reducers';
import * as actions from '../../src/Redux/actions';
import { DEFAULT_LIBRARY } from '../../src/consts/index';

describe('store integration', () => {

  let mainStore;

  beforeEach(() => {
    mainStore = store;
  });

  it('should select replies', () => {
    expect(messegeSelector(store.getState())).toEqual('');
    mainStore.dispatch(actions.selectReply('message1'));
    expect(messegeSelector(store.getState())).toEqual('message1');
    store.dispatch(actions.selectReply('message2'));
    expect(messegeSelector(store.getState())).toEqual('message2');
  });

  it('should edit replies', async () => {
    expect(repliesSelector(store.getState())).toEqual(DEFAULT_LIBRARY);
    mainStore.dispatch(actions.saveChanges(['library1']));
    expect(repliesSelector(store.getState())).toEqual(['library1']);
    store.dispatch(actions.saveChanges(['library2']));
    expect(repliesSelector(store.getState())).toEqual(['library2']);
  });

});

messegeSelector = (state) => state.message;
repliesSelector = (state) => state.replies;