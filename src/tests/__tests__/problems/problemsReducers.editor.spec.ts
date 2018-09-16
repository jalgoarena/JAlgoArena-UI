import * as reducer from '../../../client/problems/reducers/index';
import * as types from '../../../client/constants/ActionTypes'
import {Submission} from "../../../client/problems/domain/Submission";
import {StatusCode} from "../../../client/submissions/domain/StatusCode";

let defaultEditorState = {
    sourceCode: null,
    submissionId: null
};

describe('editor reducer', () => {
    it('should handle CHANGE_SOURCE_CODE', () => {
        expect(
            reducer.editor(defaultEditorState,
                {
                    type: types.CHANGE_SOURCE_CODE,
                    sourceCode: 'class Solution'
                }
            )
        ).toEqual({submissionId: null, sourceCode: "class Solution"});

        expect(
            reducer.editor(Object.assign({}, defaultEditorState, {
                    sourceCode: 'class Solution'
                }),
                {
                    type: types.CHANGE_SOURCE_CODE,
                    sourceCode: 'class Solution2'
                }
            )
        ).toEqual({submissionId: null, sourceCode: 'class Solution2'});
    });

    let actionsCleaningSourceCode = [
        types.SET_CURRENT_PROBLEM,
        types.PROBLEM_REFRESH
    ];

    actionsCleaningSourceCode.forEach(actionType => {
        it(`should handle ${actionType}`, () => {
            expect(
                reducer.editor(Object.assign({}, defaultEditorState, {
                        sourceCode: 'class Solution'
                    }),
                    {
                        type: actionType
                    }
                )
            ).toEqual({submissionId: null, sourceCode: null});
        });
    });



    it('should handle SUBMISSION_PUBLISHED', () => {
        let submission = new Submission(
            "dummy source code", "user-id", "fib", "submission-id", StatusCode.Accepted, "token"
        );

        expect(
            reducer.editor(defaultEditorState,
                {
                    type: types.SUBMISSION_PUBLISHED,
                    submissionId: submission.submissionId
                }
            )
        ).toEqual({submissionId: "submission-id", sourceCode: null});
    });

    let actionsResettingResult = [
        types.SET_CURRENT_PROBLEM,
        types.PROBLEM_REFRESH
    ];

    actionsResettingResult.forEach(actionType => {
        it(`should handle ${actionType}`, () => {
            expect(
                reducer.editor(Object.assign({}, defaultEditorState, {
                        submissionId: "submission-id"
                    }),
                    {
                        type: actionType
                    }
                )
            ).toEqual(defaultEditorState);
        });
    });
});