import types from '../types';
import store from '../store';
import {saveObject} from '../utils';

const {dispatch} = store;

export function login(payload){
    dispatch({
        type: types.AUTH_LOGIN,
    });
    let userDetails = {
        ...payload,
        accessToken:'J9lLEuCKtQiYUAKp3Tw7yUDc2k1D43dTb1K/Vya8TfiKuWI64gbRSn6rC2KdpUXbaUscT4GvqefdM7IQZSUr22cJ5rjkGB56asN+T9QVf4bKDdYW9ljmiNvlgdcZG0MO93oKp8dhGpwPfrxa3vKARggK6C/wRTmILXZPw7mbwklYxU+Q/TNYCHejhelyAPZUKC0dLHati3nRDEEdqxZXwV0mQFQ1rblesxku+Y0ypUi8yjmpzd/yJizWEeV8uej0+w6yOtwr/u0RZSCxxuI0kVylBvW42HGoMsGrkUH+JeMUOnsijICfVok0JN39MDPC/I80HKjhAMyJfYWikJ1kViDwlwRQZ+j0j2BUsPa5lhOIFdm3bt2Ot2F9nmTUGg7in9OgnSCvndRiYn+5NipHfzu06XDvUPwB8psH9cxH+XY1W36CLHv69RLGDf53FNsFiYfszjbAf3I='
    }
    saveObject("session",userDetails)
}