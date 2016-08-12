import Reflux from 'reflux';
import {SourceCodeActions} from '../actions/sourceCode.js';

export const SourceCodeStore = Reflux.createStore({
    init() {
        this.listenTo(SourceCodeActions.ChangeSourceCode, this.onChangeSourceCode);
    },
    onChangeSourceCode(newValue) {
        this.trigger(newValue);
    }
});