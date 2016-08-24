import fetch from 'isomorphic-fetch';
import {hashHistory} from "react-router";

import {fetchSubmissions} from "./index";

export const START_SIGNUP = 'START_SIGNUP';
export function startSignup() {
    return {
        type: START_SIGNUP
    };
}

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

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
function signUpSuccess() {
    hashHistory.push('/login');
    return {
        type: SIGNUP_SUCCESS
    };
}

export const SIGNUP_FAIL = 'SIGNUP_FAIL';
function signUpFail(error) {
    return {
        type: SIGNUP_FAIL,
        error
    };
}

export const START_LOGIN = 'START_LOGIN';
export function startLogin() {
    return {
        type: START_LOGIN
    }
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

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user
    };
}

export const LOGIN_FAIL = 'LOGIN_FAIL';
function loginFail(error) {
    return {
        type: LOGIN_FAIL,
        error
    };
}


export function checkSessionStatus() {
    return dispatch => {

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
            .then(user => {
                dispatch(checkedSessionStatus(user));
                if (user) dispatch(fetchSubmissions(user.id));
            })
            .catch(error => console.log(error));
    };


}

export const CHECKED_SESSION_STATUS = 'CHECKED_SESSION_STATUS';
function checkedSessionStatus(user) {
    return {
        type: CHECKED_SESSION_STATUS,
        user
    };
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

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    };
}

export const NAVIGATE_AWAY_FROM_AUTH_FORM = 'NAVIGATE_AWAY_FROM_AUTH_FORM';
export function navigatedAwayFromAuthFormPage() {
    return {
        type: NAVIGATE_AWAY_FROM_AUTH_FORM
    };
}
