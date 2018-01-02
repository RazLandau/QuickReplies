import { Reducer } from 'redux-testkit';
import LibraryReducer from '../../src/Redux/LibraryReducer';
import { SAVE_CHANGES, DEFAULT_LIBRARY } from '../../src/consts/index';

describe('library reducer', () => {

  it('should have initial state', () => {
     expect(LibraryReducer()).toEqual(DEFAULT_LIBRARY);
  });

  it('should handle SAVE_CHANGES action on initial state', () => {
    const action = { type: SAVE_CHANGES, payload: [] };
    const result = [];
    Reducer(LibraryReducer).expect(action).toReturnState(result);

  });

  it('should handle SAVE_CHANGES action on existing state', () => {
    const action = { type: SAVE_CHANGES, payload: ['newArray'] };
    const state = ['oldArray'];
    const result = ['newArray'];
    Reducer(LibraryReducer).withState(state).expect(action).toReturnState(result);
  });

  it('should return the same state after accpeting a non existing action', () => {
    const action = { type: 'NON_EXISTING' };
    const state = [];
    Reducer(LibraryReducer).withState(state).expect(action).toStayTheSame();
  });

});