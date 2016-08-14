import React from "react";
import Reflux from 'reflux';

import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import {ProblemActions} from "./actions/problems.js";
import {ProblemStore} from "./stores/problems.js";
import {SubmissionStore} from "./stores/submission.js";
import {LoadingInProgressStore} from "./stores/loadingInProgress.js";

const Layout = React.createClass({
    mixins: [
        Reflux.listenTo(
            ProblemStore, 'onFetchProblems'
        ),
        Reflux.listenTo(
            SubmissionStore, 'onSendSubmission'
        ),
        Reflux.listenTo(
            LoadingInProgressStore, 'onLoadingInProgress'
        )
    ],
    componentDidMount: function() {
        ProblemActions.FetchProblems();
        this.setState({result: {status_code: 'WAITING'}, showModal: false});
    },
    render: function() {
        return <div>
            <Menu />
            { React.cloneElement(this.props.children, this.state) }
            <Footer />
        </div>;
    },
    onFetchProblems: function(data) {
        this.setState({problems: data, showModal: false});
    },
    onSendSubmission: function (result, sourceCode) {
        this.setState({result, sourceCode, showModal: false});
    },
    onLoadingInProgress: function (title) {
        this.setState({showModal: true, modalTitle: title});
    }
});

module.exports = Layout;