import Reflux from 'reflux';
import Request from 'superagent';
import {SubmissionActions} from '../actions/submission.js';

export const SubmissionStore = Reflux.createStore({
    init() {
        this.listenTo(SubmissionActions.SendSubmission, this.onSendSubmission);
    },
    onSendSubmission(sourceCode, problemId) {
        $('#SubmissionInProgressSpinner').modal('show');

        Request
            .post(`https://jalgoarena.herokuapp.com/problems/${problemId}/submit`)
            .send(sourceCode)
            .set('Accept', 'application/json')
            .set('Content-Type', 'text/plain')
            .end((err, res) => {
                this.trigger(res.body);
                $('#SubmissionInProgressSpinner').modal('hide');
            });
    }
});