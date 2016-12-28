import fetch from 'isomorphic-fetch';
import {hashHistory} from "react-router";

import {fetchSubmissions} from "./index";
import config from '../config';

const AUTH_SERVER_URL = config.jalgoarenaApiUrl + "/auth";

export const START_SIGNUP = 'START_SIGNUP';
export function startSignup() {
    return {
        type: START_SIGNUP
    };
}

export function attemptSignUp(email, password, username, region, team) {

    const body = {
        username: username,
        email: email,
        password: password,
        region: region,
        team: team
    };

    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    };

    return dispatch => {
        return fetch(`${AUTH_SERVER_URL}/signup`, options)
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

export function attemptLogin(username, password) {

    const body = {
        username: username,
        password: password
    };

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(body)
    };

    return dispatch => {
        return fetch(`${AUTH_SERVER_URL}/api/auth/login`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error){
                    dispatch(loginFail(json.error));
                } else {
                    let token = 'Bearer ' + json.token;
                    localStorage.setItem('jwtToken', token);
                    localStorage.setItem('jwtRefreshToken', json.refreshToken);
                    dispatch(fetchUser(token));
                }
            })
            .catch(error => console.log(error));
    };
}

function fetchUser(token) {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'X-Authorization': token
        }
    };

    return dispatch => {
        return fetch(`${AUTH_SERVER_URL}/api/user`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error){
                    dispatch(loginFail(json.error));
                } else {
                    dispatch(loginSuccess(json));
                }
            })
            .catch(error => console.log(error));
    };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user: Object.assign({}, user, {isAdmin: user.role === 'ADMIN'})
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
                'X-Authorization': token
            },
            method: 'get'
        };

        return fetch(`${AUTH_SERVER_URL}/api/user`, options)
            .then(response => response.json())
            .then(user => {
                dispatch(checkedSessionStatus(user));
                if (user) dispatch(fetchSubmissions(user.id));
            })
            .catch(error => console.log(error));
    };


}

export const FETCH_USERS = 'FETCH_USERS';
export function fetchUsers() {
    return dispatch => {
        let token = localStorage.getItem('jwtToken');

        if (!token || token === '') {
            return;
        }

        const options = {
            headers: {
                'Accept': 'application/json',
                'X-Authorization': token
            },
            method: 'get'
        };

        return fetch(`${AUTH_SERVER_URL}/users`, options)
            .then(response => response.json())
            .then(users => {
                console.log(users);
                dispatch(setUsers(users));
            })
            .catch(error => console.log(error));
    };
}

function setUsers(users) {
    return {
        type: FETCH_USERS,
        users
    }
}

export const CHECKED_SESSION_STATUS = 'CHECKED_SESSION_STATUS';
function checkedSessionStatus(user) {
    return {
        type: CHECKED_SESSION_STATUS,
        user
    };
}

export function attemptLogout(){

    let token = localStorage.getItem('jwtToken');

    if (!token || token === '') {
        return;
    }

    localStorage.removeItem('jwtToken');
    return logoutSuccess();
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
