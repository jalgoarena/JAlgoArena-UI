import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CHECKED_SESSION_STATUS,
    LOGOUT_SUCCESS,
    NAVIGATE_AWAY_FROM_AUTH_FORM,
    FETCH_USERS
} from '../actions/AuthActions';

const defaultStartState = {
    user: null,
    error: null,
    users: null
};

export function updateUserInfo(userAuthState = defaultStartState , action) {
    switch (action.type){

        case LOGIN_SUCCESS:
            return {
                user: action.user,
                error: null
            };

        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return {
                user: null,
                error: action.error
            };

        case CHECKED_SESSION_STATUS:
            if (action.user && action.user.id){
                return {
                    user: action.user,
                    error: null
                };
            }

            return defaultStartState;

        case LOGOUT_SUCCESS:
            return defaultStartState;

        case NAVIGATE_AWAY_FROM_AUTH_FORM:
        case SIGNUP_SUCCESS:
            return Object.assign({}, userAuthState, {
                error: null
            });

        case FETCH_USERS:
            return Object.assign({}, userAuthState, {
                users: action.users
            });

        default:
            return userAuthState;
    }
}