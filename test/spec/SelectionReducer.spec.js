import { Reducer } from 'redux-testkit';
import SelectionReducer from '../../src/Redux/SelectionReducer';
import { SELECT_REPLY } from '../../src/consts/index';

describe('selection reducer', () => {

  it('should have initial state', () => {
     expect(SelectionReducer()).toEqual('');
  });

  it('should handle SELECT_REPLY action on initial state', () => {
    const action = { type: SELECT_REPLY, payload: 'messege' };
    const result = 'messege';
    Reducer(SelectionReducer).expect(action).toReturnState(result);

  });

  it('should handle SELECT_REPLY action on existing state', () => {
    const action = { type: SELECT_REPLY, payload: 'newMessege' };
    const state = 'oldMessege';
    const result = 'newMessege';
    Reducer(SelectionReducer).withState(state).expect(action).toReturnState(result);
  });

  it('should return the same state after accpeting a non existing action', () => {
    const action = { type: 'NON_EXISTING' };
    const state = 'messege';
    Reducer(SelectionReducer).withState(state).expect(action).toStayTheSame();
  });

});