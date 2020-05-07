export const saveObject = (key, value) => {
    if (window && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }