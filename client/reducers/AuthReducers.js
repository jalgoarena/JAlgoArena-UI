import {
    SignUp_Success,
    SignUp_Fail,
    Login_Success,
    Login_Fail,
    Checked_Session_Status,
    Logout_Success,
    Navigate_Away_From_Auth_Form
} from '../actions/AuthActions';

const defaultStartState = {
    user: null,
    error: null
};

export function updateUserInfo(userAuthState = defaultStartState , action) {
    switch (action.type){

        case Login_Success:
            return {
                user: action.user,
                error: null
            };

        case Login_Fail:
        case SignUp_Fail:
            return {
                user: null,
                error: action.error
            };

        case Checked_Session_Status:
            if (action.user && action.user.id){
                return {
                    user: action.user,
                    error: null
                };
            }

            return defaultStartState;

        case Logout_Success:
            return defaultStartState;

        case Navigate_Away_From_Auth_Form:
        case SignUp_Success:
            return Object.assign({}, userAuthState, {
                error: null
            });

        default:
            return userAuthState;
    }
}