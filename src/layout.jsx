import React from "react";
import Reflux from 'reflux';

import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import {ProblemActions} from "./actions/problems.js";
import {ProblemStore} from "./stores/problems.js";
import {SubmissionStore} from "./stores/submission.js";

const Layout = React.createClass({
    mixins: [
        Reflux.listenTo(
            ProblemStore, 'onFetchProblems'
        ),
        Reflux.listenTo(
            SubmissionStore, 'onSendSubmission'
        )
    ],
    componentDidMount: function() {
        ProblemActions.FetchProblems();
        this.setState({result: {status_code: 'WAITING'}});
    },
    render: function() {
        return <div>
            <Menu />
            { React.cloneElement(this.props.children, this.state) }
            <Footer />
        </div>;
    },
    onFetchProblems: function(data) {
        this.setState({problems: data});
    },
    onSendSubmission: function (result) {
        this.setState({result: result});
    }
});

module.exports = Layout;