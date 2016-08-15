import Reflux from 'reflux';

export const SubmissionActions = {
    SendSubmission: Reflux.createAction("SendSubmission"),
    ChangeSourceCode: Reflux.createAction("ChangeSourceCode"),
    ResetSourceCode: Reflux.createAction("ResetSourceCode")
};