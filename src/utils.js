import Validator from 'is_js';
import  { isEmpty } from 'lodash';

export const saveObject = (key, value) => {
    if (window && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
}

export const getObject = (key) => {
  if (window && window.localStorage) {
    return window.localStorage.getItem(key);
  }

  return null;
}

export const removeObject = (key) => {
  if (window && window.localStorage) {
    window.localStorage.removeItem(key);
  }
}

export const isLoggedIn = () => {
  let session = JSON.parse(getObject("session"));
  let hasAccess = session && session.email;

  return hasAccess;
}

export const validateEmail = (email) => {
  let errors = {}
  if(Validator.empty(email)) {
    errors.email = 'Email is required !';
  }

  if(!Validator.empty(email) && !Validator.email(email)) {
      errors.email = 'Invalid email !';
  }
  
  return {
    isValid: isEmpty(errors),
    errors
  }
}