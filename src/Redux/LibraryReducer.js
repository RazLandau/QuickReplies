import { DEFAULT_LIBRARY, SAVE_CHANGES } from '../consts';

export default (state = DEFAULT_LIBRARY, action) => {
    switch (action.type) {
        case SAVE_CHANGES:
            return action.payload;
        default:
            return state;
    }
};
