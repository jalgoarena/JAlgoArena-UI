import {  SignUp_Success, SignUp_Fail,
    Login_Success, Login_Fail,
    Checked_Session_Status,
    Logout_Success,
    Navigate_Away_From_Auth_Form } from '../actions/AuthActions';

const defaultStartState = {
    isLoggedIn: false,
    userObject: null,
    error: null
};

export function updateUserInfo(userAuthState = defaultStartState , action) {
    switch (action.type){

        case Login_Success:
        case SignUp_Success:
            return Object.assign({}, userAuthState, {
                isLoggedIn: true,
                userObject: action.userObject,
                error: null
            });

        case Login_Fail:
        case SignUp_Fail:
            return Object.assign({}, userAuthState, {
                isLoggedIn: false,
                error: action.error
            });

        case Checked_Session_Status:
            if (action.result.isLoggedIn){
                return Object.assign({}, userAuthState, {
                    isLoggedIn: true,
                    userObject: action.result.userObject,
                    error: null
                });
            }

            return  Object.assign({}, defaultStartState);

        case Logout_Success:
            return Object.assign({}, defaultStartState);

        case Navigate_Away_From_Auth_Form:
            return Object.assign({}, userAuthState, {
                error: null
            });

        default:
            return userAuthState;
    }
}