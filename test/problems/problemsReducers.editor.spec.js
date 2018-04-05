// @flow

import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'
import JudgeResponse from "../../client/problems/domain/JudgeResponse";
import Submission from "../../client/problems/domain/Submission";

let defaultEditorState = {
    sourceCode: null,
    submissionId: null,
    programmingLanguage: 'java'
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
        ).toEqual({submissionId: null, programmingLanguage: "java", sourceCode: "class Solution"});

        expect(
            reducer.editor(Object.assign({}, defaultEditorState, {
                    sourceCode: 'class Solution'
                }),
                {
                    type: types.CHANGE_SOURCE_CODE,
                    sourceCode: 'class Solution2'
                }
            )
        ).toEqual({submissionId: null, programmingLanguage: "java", sourceCode: 'class Solution2'});
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
            ).toEqual({submissionId: null, sourceCode: null, programmingLanguage: "java"});
        });
    });



    it('should handle SUBMISSION_PUBLISHED', () => {
        let submission = new Submission(
            "dummy source code", "user-id", "java", "fib", "submission-id", "token"
        );

        expect(
            reducer.editor(defaultEditorState,
                {
                    type: types.SUBMISSION_PUBLISHED,
                    submissionId: submission.submissionId
                }
            )
        ).toEqual({submissionId: "submission-id", programmingLanguage: "java", sourceCode: null});
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

    it('should handle CHANGE_PROGRAMMING_LANGUAGE', () => {
        expect(
            reducer.editor(defaultEditorState,
                {
                    type: types.CHANGE_PROGRAMMING_LANGUAGE,
                    programmingLanguage: 'kotlin'
                }
            )
        ).toEqual({submissionId: null, "programmingLanguage": "kotlin", "sourceCode": null});

        expect(
            reducer.editor(Object.assign({}, defaultEditorState, {
                    programmingLanguage: 'java',
                    sourceCode: 'someCode'
                }),
                {
                    type: types.CHANGE_PROGRAMMING_LANGUAGE,
                    programmingLanguage: 'kotlin'
                }
            )
        ).toEqual({submissionId: null, "programmingLanguage": "kotlin", "sourceCode": null});
    });
});