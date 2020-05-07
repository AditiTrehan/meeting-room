import types from '../types';

let initialState = {
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.AUTH_LOGIN:
            let updatedUser = { ...action.payload };
            return { ...state,user: updatedUser };
        default:
            return state
    }
}