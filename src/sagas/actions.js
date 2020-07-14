// General
export const SAGA_LOADING = 'general/LOADING';

// Notifications
export const SAGA_ERROR = 'notify/ERROR';
export const SAGA_SUCCESS = 'notify/SUCCESS';


// Notifications
export const Error = errorMessage => ({ type: SAGA_ERROR, errorMessage });
export const Success = successMessage => ({ type: SAGA_SUCCESS, successMessage });

// General
export const setLoading = isloading => ({ type: SAGA_LOADING, isloading });
