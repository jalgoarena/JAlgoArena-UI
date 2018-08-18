import * as types from "../../../client/constants/ActionTypes";
import * as actions from "../../../client/problems/actions/index";

jest.mock('sockjs-client');

describe("actions", () => {
    it("creates an action to start judge", () => {
        const expectedAction = {
            type: types.JUDGE_REQUEST
        };

        expect(actions.startJudge()).toEqual(expectedAction);
    });

    it("creates an action to change source code", () => {
        const sourceCode = "class Solution";

        const expectedAction = {
            type: types.CHANGE_SOURCE_CODE,
            sourceCode
        };

        expect(actions.changeSourceCode(sourceCode)).toEqual(expectedAction);
    });

    it("creates an action to refresh problems", () => {
        const expectedAction = {
            type: types.PROBLEM_REFRESH
        };

        expect(actions.problemRefresh()).toEqual(expectedAction);
    });

    it("creates an action to set current problem id", () => {
        const problemId = "fib";

        const expectedAction = {
            type: types.SET_CURRENT_PROBLEM,
            problemId
        };

        expect(actions.setCurrentProblem(problemId)).toEqual(expectedAction);
    });

    it("creates an action to set problems difficulty visibility filter", () => {
        const easy = 1;

        const expectedAction = {
            type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
            level: easy
        };

        expect(actions.setProblemsDifficultyVisibilityFilter(easy)).toEqual(expectedAction);
    });

    it("creates an action to hide already done problem", () => {
        const hideDoneProblems = true;

        const expectedAction = {
            type: types.HIDE_DONE_PROBLEMS,
            hideDoneProblems
        };

        expect(actions.hideDoneProblems(hideDoneProblems)).toEqual(expectedAction);
    });

    it("creates an action to start fetching problems", () => {
        const expectedAction = {
            type: types.FETCH_PROBLEMS_REQUEST
        };

        expect(actions.startFetchingProblems()).toEqual(expectedAction);
    });
});
