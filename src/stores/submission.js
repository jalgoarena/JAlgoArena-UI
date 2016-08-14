import Reflux from 'reflux';
import Request from 'superagent';
import {SubmissionActions} from '../actions/submission.js';

let _sourceCode;

export const SubmissionStore = Reflux.createStore({
    init() {
        this.listenTo(SubmissionActions.SendSubmission, this.onSendSubmission);
        this.listenTo(SubmissionActions.ChangeSourceCode, this.onChangeSourceCode);
    },
    onChangeSourceCode(sourceCode) {
        _sourceCode = sourceCode;
    },
    onSendSubmission(problemId) {
        $('#SubmissionInProgressSpinner').modal('show');

        Request
            .post(`http://localhost:8080/problems/${problemId}/submit`)
            .send(_sourceCode)
            .set('Accept', 'application/json')
            .set('Content-Type', 'text/plain')
            .end((err, res) => {
                this.trigger(res.body);
                $('#SubmissionInProgressSpinner').modal('hide');
            });
    }
});