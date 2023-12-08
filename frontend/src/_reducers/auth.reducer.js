
let token = '';
let _id = '';
let score = 0;
let error = null;
let success = null;
let message = null;

const initialState = _id ? { loggedIn: true, _id, token, score, error, success, message } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        loggingIn: true,
        _id: action._id,
        token: action.token
      };
    case 'LOGIN_FAIL':
      return {
        _id: null,
        loggingIn: false
      };
    case 'LOGOUT_SUCCESS':
      return {
        _id: null,
        token: null,
        loggingIn: null
      };
    case 'SCORE_GET':
      return {
        ...state,
        score: action.score,
        success: action.success,
        message: action.message
      };
    case 'SCORE_GENERATE_SUCCESS':
      return {
        ...state,
        score: action.score,
        success: action.success,
        message: action.message
      };
    case 'SCORE_GET_ERROR':
      return {
        error: action.error,
        message: action.message
      };
    default:
      return state
  }
}