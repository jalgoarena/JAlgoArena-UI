import fetch from 'isomorphic-fetch';
import {hashHistory} from "react-router";

import config from '../../config';
import {fetchSubmissions} from "../../actions";
import * as types from "../../constants/ActionTypes"

const AUTH_SERVER_URL = config.jalgoarenaApiUrl + "/auth";


export function startSignup() {
    return {
        type: types.START_SIGNUP
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
                    dispatch(signUpFail(json));
                } else {
                    dispatch(signUpSuccess());
                }
            });
    };
}

function signUpSuccess() {
    hashHistory.push('/login');
    return {
        type: types.SIGNUP_SUCCESS
    };
}

function signUpFail(error) {
    return {
        type: types.SIGNUP_FAIL,
        error
    };
}

export function startLogin() {
    return {
        type: types.START_LOGIN
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
        return fetch(`${AUTH_SERVER_URL}/login`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error){
                    dispatch(loginFail(json));
                } else {
                    let token = 'Bearer ' + json.token;
                    localStorage.setItem('jwtToken', token);
                    dispatch(loginSuccess(json.user));
                }
            });
    };
}

function loginSuccess(user) {
    return {
        type: types.LOGIN_SUCCESS,
        user
    };
}

function loginFail(error) {
    return {
        type: types.LOGIN_FAIL,
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
            .then(json => {
                if (json.username) {
                    dispatch(checkedSessionStatus(json));
                    dispatch(fetchSubmissions(json.id));
                } else {
                    localStorage.removeItem('jwtToken');
                }
            });
    };
}


function checkedSessionStatus(user) {
    return {
        type: types.CHECKED_SESSION_STATUS,
        user
    };
}

export function fetchUsers() {
    return dispatch => {
        const options = {
            headers: {
                'Accept': 'application/json'
            },
            method: 'get'
        };

        return fetch(`${AUTH_SERVER_URL}/users`, options)
            .then(response => response.json())
            .then(users => {
                dispatch(setUsers(users));
            });
    };
}

function setUsers(users) {
    return {
        type: types.FETCH_USERS,
        users
    }
}

export function attemptLogout(){

    let token = localStorage.getItem('jwtToken');

    if (!token || token === '') {
        return;
    }

    localStorage.removeItem('jwtToken');
    return logoutSuccess();
}

function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS
    };
}

export function navigatedAwayFromAuthFormPage() {
    return {
        type: types.NAVIGATE_AWAY_FROM_AUTH_FORM
    };
}
