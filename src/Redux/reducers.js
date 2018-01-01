// import { combineReducers } from 'redux';
// import { SELECT_REPLY } from './actions';

// function SelectReply(state = 'placeholder', action) {
//     switch (action.type) {
//         case SELECT_REPLY:
//         {
//             const text = state.replies[action.id].description;
//             return { ...state, text };
//         }
//         default:
//             return state;
//     }
// }

// const MainScreen = combineReducers({
//     SelectReply,
// });

// export default MainScreen;

import { combineReducers } from 'redux';
import SelectionReducer from './SelectionReducer';
import LibraryReducer from './LibraryReducer';

export default combineReducers({
    replies: LibraryReducer,
    message: SelectionReducer
});

