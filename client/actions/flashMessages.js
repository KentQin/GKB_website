import {ADD_FLASH_MESSAGE} from './types';
import shortid from 'shortid';

export default (state = [], action = {} ) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.gernerate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        default: return state;
    }
}