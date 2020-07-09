const SET_MOBILE_OPEN = 'GENERAL/SET_MOBILE_OPEN';
const SET_LOADING = 'GENERAL/SET_LOADING';
const FOCUS_SEARCH = 'GENERAL/FOCUS_SEARCH';
const PAYMENT_FIELDS = 'GENERAL/PAYMENT_FIELDS';
const IS_ADMIN = 'GENERAL/IS_ADMIN';

const initialState = {
  loadingAPI: false,
  mobileOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return { ...state, loadingAPI: action.isloading };
    }
    case SET_MOBILE_OPEN: {
      return { ...state, mobileOpen: action.isOpen };
    }
    case '@@router/LOCATION_CHANGE': {
      window.scrollTo(0, 0);
      return state;
    }
    default:
      return state;
  }
};

export const loading = (isloading) => ({
  type: SET_LOADING,
  isloading,
});

export const setMobileOpen = (isOpen) => ({
  type: SET_MOBILE_OPEN,
  isOpen,
});

export const changePaymentField = (name, value) => ({
  type: PAYMENT_FIELDS,
  payload: { name, value },
});

export const focusSearch = (focus) => ({
  type: FOCUS_SEARCH,
  focus,
});

export const setIsAdmin = (is) => ({
  type: IS_ADMIN,
  is,
});
