import { SELECT_REPLY } from '../consts/consts';

export default (state = '', action = {}) => {
    switch (action.type) {
        case SELECT_REPLY:
            return action.payload;
        default:
            return state;
    }
};
