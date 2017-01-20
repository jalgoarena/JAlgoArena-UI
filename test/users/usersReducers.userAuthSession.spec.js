import * as reducer from '../../client/users/reducers';
import * as types from '../../client/constants/ActionTypes';

describe('userAuthSession reducer', () => {
    it('should handle LOGIN_SUCCESS', () => {
        expect(
            reducer.userAuthSession({
                    user: null,
                    error: null,
                    users: null
                },
                {
                    type: types.LOGIN_SUCCESS,
                    user: { username: "julia" }
                }
            )
        ).toEqual({
            user: { username: "julia" },
            error: null,
            users: null
        });

        expect(
            reducer.userAuthSession({
                    user: null,
                    error: "Error",
                    users: null
                },
                {
                    type: types.LOGIN_SUCCESS,
                    user: { username: "julia" }
                }
            )
        ).toEqual({
            user: { username: "julia" },
            error: null,
            users: null
        });
    });

    [types.LOGIN_FAIL, types.SIGNUP_FAIL].forEach(actionType => {
        it(`should handle ${actionType}`, () => {
            expect(
                reducer.userAuthSession({
                        user: null,
                        error: null,
                        users: null
                    },
                    {
                        type: actionType,
                        error: { message: "error" }
                    }
                )
            ).toEqual({
                user: null,
                error: { message: "error" },
                users: null
            });

            expect(
                reducer.userAuthSession({
                        user: { username: "julia" },
                        error: null,
                        users: null
                    },
                    {
                        type: actionType,
                        error: { message: "error" }
                    }
                )
            ).toEqual({
                user: null,
                error: { message: "error" },
                users: null
            });
        });
    });

    it("should handle CHECKED_SESSION_STATUS", () => {
        expect(
            reducer.userAuthSession({
                    user: null,
                    error: null,
                    users: null
                },
                {
                    type: types.CHECKED_SESSION_STATUS,
                    user: { username: "julia", id: "0-0" }
                }
            )
        ).toEqual({
            user: { username: "julia", id: "0-0" },
            error: null,
            users: null
        });

        expect(
            reducer.userAuthSession({
                    user: null,
                    error: { message: "error" },
                    users: null
                },
                {
                    type: types.CHECKED_SESSION_STATUS,
                    user: { username: "julia", id: "0-0" }
                }
            )
        ).toEqual({
            user: { username: "julia", id: "0-0" },
            error: null,
            users: null
        });

        expect(
            reducer.userAuthSession({
                    user: null,
                    error: { message: "error" },
                    users: null
                },
                {
                    type: types.CHECKED_SESSION_STATUS,
                    user: { username: "julia" }
                }
            )
        ).toEqual({
            user: null,
            error: null,
            users: null
        });
    });

    it("should handle LOGOUT_SUCCESS", () => {
        expect(
            reducer.userAuthSession({
                    user: { username: "julia", id: "0-0" },
                    error: { message: "error" },
                    users: [{ username: "julia", id: "0-0" }]
                },
                {
                    type: types.LOGOUT_SUCCESS
                }
            )
        ).toEqual({
            user: null,
            error: null,
            users: null
        });
    });

    [types.NAVIGATE_AWAY_FROM_AUTH_FORM, types.SIGNUP_SUCCESS].forEach(actionType => {
        expect(
            reducer.userAuthSession({
                    user: null,
                    error: { message: "error" },
                    users: null
                },
                {
                    type: actionType
                }
            )
        ).toEqual({
            user: null,
            error: null,
            users: null
        });
    });

    it("should handle FETCH_USERS", () => {
        expect(
            reducer.userAuthSession({
                    user: null,
                    error: null,
                    users: null
                },
                {
                    type: types.FETCH_USERS,
                    users: [{ username: "julia", id: "0-0" }]
                }
            )
        ).toEqual({
            user: null,
            error: null,
            users: [{ username: "julia", id: "0-0" }]
        });
    });
});