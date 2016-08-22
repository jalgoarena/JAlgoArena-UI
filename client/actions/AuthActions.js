import fetch from 'isomorphic-fetch';
import {hashHistory} from "react-router";

export function attemptSignUp(email, password, username) {

    const body = {
        username: username,
        email: email,
        password: password
    };

    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(body)
    };

    return dispatch => {
        return fetch(`/signup`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error){
                    dispatch(signUpFail(json.error));
                } else {
                    dispatch(signUpSuccess());
                }
            }).catch(error => console.log(error));
    };

}
export const SignUp_Success = 'SignUp_Success';
export function signUpSuccess() {
    hashHistory.push('/login');
    return { type: SignUp_Success };
}

export const SignUp_Fail = 'SignUp_Fail';
export function signUpFail(error) {
    return {
        type: SignUp_Fail,
        error
    };
}

export const Login_Success = 'Login_Success';
export const Login_Fail = 'Login_Fail';

export const Checked_Session_Status = 'Checked_Session_Status';

export const Logout_Success = 'Logout_Success';

export const Navigate_Away_From_Auth_Form = 'Navigate_Away_From_Auth_Form';


export function loginSuccess(user) {
    return {
        type: Login_Success,
        user
    };
}

export function loginFail(error) {
    return {
        type: Login_Fail,
        error
    };
}

export function attemptLogin(email, password) {

    const body = {
        email: email,
        password: password
    };

    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(body)
    };

    return dispatch => {
        return fetch(`/login`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error){
                    dispatch(loginFail(json.error));
                } else {
                    localStorage.setItem('jwtToken', json.token);
                    dispatch(loginSuccess(json.user));
                }
            })
            .catch(error => console.log(error));
    };
}

export function checkedSessionStatus(user) {
    return {
        type: Checked_Session_Status,
        user
    };
}

export function checkSessionStatus() {

    return dispatch => {

        console.log("I'm in");

        let token = localStorage.getItem('jwtToken');

        if (!token || token === '') {
            return;
        }

        const options = {
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'get'
        };

        return fetch(`/user`, options)
            .then(response => response.json())
            .then(json => {
                dispatch(checkedSessionStatus(json))
            })
            .catch(error => console.log(error));
    };

}

export function logoutSuccess() {
    return { type: Logout_Success };
}

export function attemptLogout(){

    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({})
    };

    return dispatch => {

        localStorage.removeItem('jwtToken');

        return fetch(`/logout`, options)
            .then(response => dispatch(logoutSuccess()))
            .catch(error => console.log(error));
    }
}

export function navigatedAwayFromAuthFormPage() {
    return { type: Navigate_Away_From_Auth_Form };
}
