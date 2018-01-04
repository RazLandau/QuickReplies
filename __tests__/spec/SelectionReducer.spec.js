import { Reducer } from 'redux-testkit';
import SelectionReducer from '../../src/Redux/SelectionReducer';
import { SELECT_REPLY, NEW_MESSAGE, OLD_MESSAGE, NON_EXISTING_ACTION } from '../../src/consts/consts';
import * as actions from '../../src/Redux/actions';

describe('selection reducer', () => {

  it('should have initial state', () => {
     expect(SelectionReducer()).toEqual('');
  });

  it('should handle SELECT_REPLY action on initial state', () => {
    const action = { type: SELECT_REPLY, payload: NEW_MESSAGE };
    const result = NEW_MESSAGE;
    Reducer(SelectionReducer).expect(action).toReturnState(result);

  });

  it('should handle SELECT_REPLY action on existing state', () => {
    const action = { type: SELECT_REPLY, payload: NEW_MESSAGE };
    const state = OLD_MESSAGE;
    const result = NEW_MESSAGE;
    Reducer(SelectionReducer).withState(state).expect(action).toReturnState(result);
  });

  it('should return the same state after accpeting a non existing action', () => {
    const action = { type: NON_EXISTING_ACTION };
    const state = OLD_MESSAGE;
    Reducer(SelectionReducer).withState(state).expect(action).toStayTheSame();
  });

});

