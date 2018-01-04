import { createStore, applyMiddleware, combineReducers } from 'redux';
import { FlushThunks } from 'redux-testkit';

import store from '../../src/Redux/store';
import * as reducers from '../../src/Redux/reducers';
import * as actions from '../../src/Redux/actions';
import { DEFAULT_LIBRARY, OLD_MESSAGE, NEW_MESSAGE, OLD_REPLIES, NEW_REPLIES, DEFAULT_MESSAGE } from '../../src/consts/consts';
import { saveChanges } from '../../src/Redux/actions';

const driver =  {
  given: {
    defaultStore: () => store,
  },
  when: {
    selectReply: (store, reply) => store.dispatch(actions.selectReply(reply)),
    saveChanges: (store, newReplies) => store.dispatch(actions.saveChanges(newReplies))

  },
  get: {
    message: (store) => store.getState().message,
    replies: (store) => store.getState().replies
  }
}

describe('store integration', () => {

  let defaultStore;

  beforeEach(() => {
    defaultStore = driver.given.defaultStore();
  });

  it('should given empty message', () => {
    expect(driver.get.message(defaultStore)).toEqual(DEFAULT_MESSAGE);
  });

  it('should given default replies', () => {
    expect(driver.get.replies(defaultStore)).toEqual(DEFAULT_LIBRARY);
  });

  it('should change message', () => {
    driver.when.selectReply(defaultStore, NEW_MESSAGE);
    expect(driver.get.message(defaultStore)).toEqual(NEW_MESSAGE);
  });

  it('should change replies', () => {
    driver.when.saveChanges(defaultStore, NEW_REPLIES);
    expect(driver.get.replies(defaultStore)).toEqual(NEW_REPLIES);
  });

});

