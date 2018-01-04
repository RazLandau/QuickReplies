import { Reducer } from 'redux-testkit';
import LibraryReducer from '../../src/Redux/LibraryReducer';
import { SAVE_CHANGES, DEFAULT_LIBRARY, NEW_REPLIES, OLD_REPLIES, NON_EXISTING_ACTION } from '../../src/consts/consts';

describe('library reducer', () => {

  it('should have initial state', () => {
     expect(LibraryReducer()).toEqual(DEFAULT_LIBRARY);
  });

  it('should handle SAVE_CHANGES action on initial state', () => {
    const action = { type: SAVE_CHANGES, payload: NEW_REPLIES };
    const result = NEW_REPLIES;
    Reducer(LibraryReducer).expect(action).toReturnState(result);

  });

  it('should handle SAVE_CHANGES action on existing state', () => {
    const action = { type: SAVE_CHANGES, payload: NEW_REPLIES };
    const state = OLD_REPLIES;
    const result = NEW_REPLIES;
    Reducer(LibraryReducer).withState(state).expect(action).toReturnState(result);
  });

  it('should return the same state after accpeting a non existing action', () => {
    const action = { type: NON_EXISTING_ACTION };
    const state = [];
    Reducer(LibraryReducer).withState(state).expect(action).toStayTheSame();
  });

});