// @flow
type Action = {
    type: string,
    error?: string,
    user?: User,
    users?: Array<User>,
    userUpdated?: User
}

import {fetchSubmissions} from "../../submissions/actions";
import * as types from "../../constants/ActionTypes"
import {setErrorMessage} from "../../common/actions/index";
import User from "../domain/User";
import {push} from "connected-react-router";

export function startSignup(): Action {
    return {
        type: types.SIGNUP_REQUEST
    };
}

export function attemptSignUp(email: string, password: string, username: string, region: string, team: string) {

    const user = new User(
        username,
        password,
        email,
        region,
        team
    );

    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/auth/signup`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error){
                    dispatch(signUpFail(json.message));
                } else {
                    dispatch(signUpSuccess());
                    dispatch(push("/login"));
                }
            })
            .catch((error) => console.log(`[err] POST /api/auth/signup:` + error));
    };
}

function signUpSuccess(): Action {
    return {
        type: types.SIGNUP_SUCCESS
    };
}

function signUpFail(error: string): Action {
    return {
        type: types.SIGNUP_FAIL,
        error
    };
}

export function startLogin(): Action {
    return {
        type: types.LOGIN_REQUEST
    }
}

export function attemptLogin(username: string, password: string) {

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

    return (dispatch: Dispatch) => {
        return fetch(`/api/auth/login`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error){
                    dispatch(loginFail(json.message));
                } else {
                    let token = 'Bearer ' + json.token;
                    localStorage.setItem('jwtToken', token);
                    dispatch(loginSuccess(json.user));
                }
            })
            .catch((error) => console.log(`[err] POST /api/auth/login:` + error));
    };
}

function loginSuccess(user: User): Action {
    return {
        type: types.LOGIN_SUCCESS,
        user
    };
}

function loginFail(error: string): Action {
    return {
        type: types.LOGIN_FAIL,
        error
    };
}

export function checkSessionStatus() {
    return (dispatch: Dispatch) => {

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

        return fetch(`/api/auth/api/user`, options)
            .then(response => response.json())
            .then(json => {
                if (json.username) {
                    dispatch(checkedSessionStatus(json));
                    dispatch(fetchSubmissions(json.id));
                } else {
                    localStorage.removeItem('jwtToken');
                }
            })
            .catch((error) => console.log(`[err] GET /api/auth/api/user:` + error));
    };
}


function checkedSessionStatus(user): Action {
    return {
        type: types.CHECKED_SESSION_STATUS,
        user
    };
}

export function fetchUsers() {
    return (dispatch: Dispatch) => {
        const options = {
            headers: {
                'Accept': 'application/json'
            },
            method: 'get'
        };

        return fetch(`/api/auth/users`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Auth Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(setUsers(json))
                }
            })
            .catch((error) => console.log(`[err] GET /api/auth/users:` + error));
    };
}

function setUsers(users): Action {
    return {
        type: types.FETCH_USERS,
        users
    }
}

export function attemptLogout(): Action {

    let token = localStorage.getItem('jwtToken');

    if (token) {
        localStorage.removeItem('jwtToken');
    }

    return logoutSuccess();
}

function logoutSuccess(): Action {
    return {
        type: types.LOGOUT_SUCCESS
    };
}

export function navigatedAwayFromAuthFormPage(): Action {
    return {
        type: types.NAVIGATE_AWAY_FROM_AUTH_FORM
    };
}

export function updateUser(user: User) {

    let token = localStorage.getItem('jwtToken');

    if (!token || token === '') {
        return;
    }

    const options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(user)
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/auth/api/users`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Auth Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(userUpdated(json));
                    dispatch(fetchUsers());
                }
            })
            .catch((error) => console.log(`[err] PUT /api/auth/api/users:` + error));
    };
}

function userUpdated(userUpdated: User): Action {
    return {
        type: types.USER_UPDATED,
        userUpdated
    }
}
