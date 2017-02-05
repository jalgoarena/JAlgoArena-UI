// @flow

import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'
import JudgeResponse from "../../client/problems/domain/JudgeResponse";

let defaultEditorState = {
    sourceCode: null,
    judgeResult: {statusCode: 'WAITING'},
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
        ).toEqual({judgeResult: {statusCode: "WAITING"}, programmingLanguage: "java", sourceCode: "class Solution"});

        expect(
            reducer.editor(Object.assign({}, defaultEditorState, {
                    sourceCode: 'class Solution'
                }),
                {
                    type: types.CHANGE_SOURCE_CODE,
                    sourceCode: 'class Solution2'
                }
            )
        ).toEqual({judgeResult: {statusCode: "WAITING"}, programmingLanguage: "java", sourceCode: 'class Solution2'});
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
            ).toEqual({judgeResult: {statusCode: "WAITING"}, sourceCode: null, programmingLanguage: "java"});
        });
    });



    it('should handle JUDGE_RESULT_RECEIVED', () => {
        let acceptedJudgeResponse = new JudgeResponse("ACCEPTED", null, 0.1, 0, [true, true]);
        expect(
            reducer.editor(defaultEditorState,
                {
                    type: types.JUDGE_RESULT_RECEIVED,
                    result: acceptedJudgeResponse
                }
            )
        ).toEqual({judgeResult: acceptedJudgeResponse, programmingLanguage: "java", sourceCode: null});

        let compileErrorJudgeResponse = new JudgeResponse("COMPILER_ERROR", "error", 0.0, 0, []);
        expect(
            reducer.editor(Object.assign({}, defaultEditorState, {
                    judgeResult: {statusCode: "ACCEPTED"}
                }),
                {
                    type: types.JUDGE_RESULT_RECEIVED,
                    result: compileErrorJudgeResponse
                }
            )
        ).toEqual({judgeResult: compileErrorJudgeResponse, programmingLanguage: "java", sourceCode: null});
    });

    let actionsResettingResult = [
        types.SET_CURRENT_PROBLEM,
        types.PROBLEM_REFRESH
    ];

    actionsResettingResult.forEach(actionType => {
        it(`should handle ${actionType}`, () => {
            expect(
                reducer.editor(Object.assign({}, defaultEditorState, {
                        judgeResult: {statusCode: "ACCEPTED"}
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
        ).toEqual({"judgeResult": {"statusCode": "WAITING"}, "programmingLanguage": "kotlin", "sourceCode": null});

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
        ).toEqual({"judgeResult": {"statusCode": "WAITING"}, "programmingLanguage": "kotlin", "sourceCode": null});
    });
});