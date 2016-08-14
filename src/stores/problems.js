import Reflux from 'reflux';
import Request from 'superagent';
import {ProblemActions} from '../actions/problems.js';

export const ProblemStore = Reflux.createStore({
    init() {
        this.listenTo(ProblemActions.FetchProblems, this.onFetchProblems);
    },
    onFetchProblems() {
        Request
            .get('http://localhost:8080/problems')
            .set('Accept', 'application/json')
            .end((err, res) =>
                this.trigger(res.body)
            );
    }
});