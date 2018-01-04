import { SELECT_REPLY, SAVE_CHANGES } from '../consts/consts';

export function selectReply(payload) {
    return { type: SELECT_REPLY, payload };
}

export function saveChanges(payload){
    return { type: SAVE_CHANGES, payload };
}
