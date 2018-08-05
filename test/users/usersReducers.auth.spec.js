// @flow

import * as reducer from '../../client/users/reducers';
import * as types from '../../client/constants/ActionTypes';
import User from "../../client/users/domain/User";

const defaultStartState = {
    user: null,
    error: null,
    users: null
};

describe('auth reducer', () => {
    it('should handle LOGIN_SUCCESS', () => {
        expect(
            reducer.auth(defaultStartState,
                {
                    type: types.LOGIN_SUCCESS,
                    user: USER_JULIA
                }
            )
        ).toEqual(Object.assign({}, defaultStartState, {
            user: USER_JULIA
        }));

        expect(
            reducer.auth(Object.assign({}, defaultStartState, {
                    error: "Error"
                }),
                {
                    type: types.LOGIN_SUCCESS,
                    user: USER_JULIA
                }
            )
        ).toEqual(Object.assign({}, defaultStartState, {
            user: USER_JULIA
        }));
    });

    [types.LOGIN_FAIL, types.SIGNUP_FAIL].forEach(actionType => {
        it(`should handle ${actionType}`, () => {
            expect(
                reducer.auth(defaultStartState,
                    {
                        type: actionType,
                        error: "error"
                    }
                )
            ).toEqual(Object.assign({}, defaultStartState, {
                error: "error"
            }));

            expect(
                reducer.auth(Object.assign({}, defaultStartState, {
                        user: USER_JULIA
                    }),
                    {
                        type: actionType,
                        error: "error"
                    }
                )
            ).toEqual(Object.assign({}, defaultStartState, {
                error: "error"
            }));
        });
    });

    it("should handle CHECKED_SESSION_STATUS", () => {
        expect(
            reducer.auth(defaultStartState,
                {
                    type: types.CHECKED_SESSION_STATUS,
                    user: USER_JULIA
                }
            )
        ).toEqual(Object.assign({}, defaultStartState, {
            user: USER_JULIA
        }));

        expect(
            reducer.auth(Object.assign({}, defaultStartState, {
                    error: "error"
                }),
                {
                    type: types.CHECKED_SESSION_STATUS,
                    user: USER_JULIA
                }
            )
        ).toEqual(Object.assign({}, defaultStartState, {
            user: USER_JULIA
        }));

        expect(
            reducer.auth(Object.assign({}, defaultStartState, {
                    error: "error"
                }),
                {
                    type: types.CHECKED_SESSION_STATUS,
                    user: USER_JULIA
                }
            )
        ).toEqual(Object.assign({}, defaultStartState, {
            user: USER_JULIA
        }));
    });

    it("should handle LOGOUT_SUCCESS", () => {
        expect(
            reducer.auth(Object.assign({}, defaultStartState, {
                    user: USER_JULIA,
                    error: "error",
                    users: [USER_MIKOLAJ, USER_JULIA]
                }),
                {
                    type: types.LOGOUT_SUCCESS
                }
            )
        ).toEqual(defaultStartState);
    });

    [types.NAVIGATE_AWAY_FROM_AUTH_FORM, types.SIGNUP_SUCCESS].forEach(actionType => {
        expect(
            reducer.auth(Object.assign({}, defaultStartState, {
                    error: "error"
                }),
                {
                    type: actionType
                }
            )
        ).toEqual(defaultStartState);
    });

    it("should handle FETCH_USERS", () => {
        expect(
            reducer.auth(defaultStartState,
                {
                    type: types.FETCH_USERS,
                    users: [USER_JULIA]
                }
            )
        ).toEqual(Object.assign({}, defaultStartState, {
           users: [USER_JULIA]
        }));
    });
});

let USER_JULIA = new User("julia", "password", "email", "region", "team", "julia", "spolnik", "USER", "0");
let USER_MIKOLAJ = new User("mikolaj", "password", "email", "region", "team", "mikolaj", "spolnik", "USER", "1");