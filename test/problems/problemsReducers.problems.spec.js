import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('problems reducer', () => {
    it('should handle PROBLEMS_RECEIVED', () => {
        expect(
            reducer.problems({items: []},
                {
                    type: types.PROBLEMS_RECEIVED,
                    problems: [{problemId: "fib"}]
                }
            )
        ).toEqual({items: [{problemId: "fib"}]});

        expect(
            reducer.problems({items: [{problemId: "fib"}]},
                {
                    type: types.PROBLEMS_RECEIVED,
                    problems: [{problemId: "fib"}, {problemId: "stoi"}]
                }
            )
        ).toEqual({items: [{problemId: "fib"}, {problemId: "stoi"}]});
    });

    it('should handle SET_CURRENT_PROBLEM', () => {
        expect(
            reducer.problems({currentProblemId: null},
                {
                    type: types.SET_CURRENT_PROBLEM,
                    problemId: "fib"
                }
            )
        ).toEqual({currentProblemId: "fib"});

        expect(
            reducer.problems({currentProblemId: "fib"},
                {
                    type: types.SET_CURRENT_PROBLEM,
                    problemId: "stoi"
                }
            )
        ).toEqual({currentProblemId: "stoi"});
    });

    it('should handle SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER', () => {
        expect(
            reducer.problems(null,
                {
                    type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
                    level: 1
                }
            )
        ).toEqual({difficultyFilter: 1});

        expect(
            reducer.problems({difficultyFilter: 1},
                {
                    type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
                    level: 2
                }
            )
        ).toEqual({difficultyFilter: 2});
    });

    it('should handle CHANGE_PROGRAMMING_LANGUAGE', () => {
        expect(
            reducer.problems(null,
                {
                    type: types.HIDE_DONE_PROBLEMS,
                    hideDoneProblems: true
                }
            )
        ).toEqual({doneProblemsFilter: true});

        expect(
            reducer.problems(true,
                {
                    type: types.HIDE_DONE_PROBLEMS,
                    hideDoneProblems: false
                }
            )
        ).toEqual({doneProblemsFilter: false});
    });

    it('should handle FETCH_RAW_PROBLEMS', () => {
        expect(
            reducer.problems({rawItems: []},
                {
                    type: types.FETCH_RAW_PROBLEMS,
                    rawProblems: [{problemId: "fib"}]
                }
            )
        ).toEqual({rawItems: [{problemId: "fib"}]});

        expect(
            reducer.problems({rawItems: [{problemId: "fib"}]},
                {
                    type: types.FETCH_RAW_PROBLEMS,
                    rawProblems: [{problemId: "fib"}, {problemId: "stoi"}]
                }
            )
        ).toEqual({rawItems: [{problemId: "fib"}, {problemId: "stoi"}]});
    });
});