import types from '../types';
import store from '../store';
import {saveObject} from '../utils';

const {dispatch} = store;

export function login(payload){
    
    let userDetails = {
        ...payload,
    }
    dispatch({
        type: types.AUTH_LOGIN,
        payload:userDetails
    })
    saveObject("session",userDetails)
}