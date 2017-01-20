import * as types from "../../constants/ActionTypes";

const defaultStartState = {
    user: null,
    error: null,
    users: null
};

export function userAuthSession(userAuthSession = defaultStartState , action) {
    switch (action.type){

        case types.LOGIN_SUCCESS:

            return Object.assign({}, userAuthSession, {
                user: action.user,
                error: null
            });

        case types.LOGIN_FAIL:
        case types.SIGNUP_FAIL:
            return Object.assign({}, userAuthSession, {
                user: null,
                error: action.error
            });

        case types.CHECKED_SESSION_STATUS:
            if (action.user && action.user.id){
                return Object.assign({}, userAuthSession, {
                    user: action.user,
                    error: null
                });
            }

            return defaultStartState;

        case types.LOGOUT_SUCCESS:
            return defaultStartState;

        case types.NAVIGATE_AWAY_FROM_AUTH_FORM:
        case types.SIGNUP_SUCCESS:
            return Object.assign({}, userAuthSession, {
                error: null
            });

        case types.FETCH_USERS:
            return Object.assign({}, userAuthSession, {
                users: action.users
            });

        default:
            return userAuthSession;
    }
}

export function userUpdated(userUpdated = null , action) {
    switch (action.type) {
        case types.USER_UPDATED:
            return action.userUpdated;
        default:
            return userUpdated;
    }
}
