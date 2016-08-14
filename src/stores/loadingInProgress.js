import Reflux from 'reflux';
import {LoadingInProgressActions} from '../actions/loadingInProgress.js';

export const LoadingInProgressStore = Reflux.createStore({
    init() {
        this.listenTo(LoadingInProgressActions.LoadingInProgress, this.onLoadingInProgress);
    },
    onLoadingInProgress(title) {
        this.trigger(title);
    }
});