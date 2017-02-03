import * as reducer from '../../client/common/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('errorMessage reducer', () => {

    let actionsToShowModalWindow = [
            types.SIGNUP_REQUEST,
            types.LOGIN_REQUEST,
            types.JUDGE_REQUEST,
            types.FETCH_PROBLEMS_REQUEST
    ];

    actionsToShowModalWindow.forEach(actionType => {
        it(`should handle ${actionType}`, () => {
            expect(
                reducer.showModal(false,
                    {
                        type: actionType
                    }
                )
            ).toEqual(true);
        });
    });

    let actionsToHideModalWindow = [
        types.SET_CURRENT_PROBLEM,
        types.FETCH_PROBLEMS_SUCCESS,
        types.JUDGE_RESULT_RECEIVED,
        types.FETCH_SUBMISSIONS,
        types.FETCH_RANKING,
        types.CHECKED_SESSION_STATUS,
        types.LOGIN_FAIL,
        types.LOGIN_SUCCESS,
        types.LOGOUT_SUCCESS,
        types.SIGNUP_FAIL,
        types.SIGNUP_SUCCESS,
        types.CLOSE_WORK_IN_PROGRESS_WINDOW,
        types.SET_ERROR_MESSAGE
    ];

    actionsToHideModalWindow.forEach(actionType => {
        it(`should handle ${actionType}`, () => {
            expect(
                reducer.showModal(true,
                    {
                        type: actionType
                    }
                )
            ).toEqual(false);
        });
    });

    it("should handle any action with error", () => {
        expect(
            reducer.showModal(true,
                {
                    type: "ANY",
                    error: "bad request"
                }
            )
        ).toEqual(false);
    });
});