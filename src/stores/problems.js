import Reflux from 'reflux';
import Request from 'superagent';
import {Actions} from '../actions/problems.js';

export const ProblemStore = Reflux.createStore({
    init() {
        this.listenTo(Actions.FetchProblems, this.onFetchProblems);
    },
    onFetchProblems() {
        Request
            .get('https://jalgoarena.herokuapp.com/problems')
            .set('Accept', 'application/json')
            .end((err, res) =>
                this.trigger(res.body)
            );
    }
});