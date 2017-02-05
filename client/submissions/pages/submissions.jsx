import React from 'react';
import {Link} from 'react-router';
import {Grid, Col, Button, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import SourceCode from "../components/SourceCode";

import FontAwesome from '../../common/components/FontAwesome';
import {fetchSubmissions} from "../../submissions/actions";

function maxScore(level: number) {
    switch (level) {
        case 3:
            return 46;
        case 2:
            return 31;
        default:
            return 16;
    }
}

function difficulty(level: number) {
    switch (level) {
        case 3:
            return 'Hard';
        case 2:
            return 'Medium';
        default:
            return 'Easy';
    }
}

class Submissions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showSourceCode: false, sourceCode: "", problemId: ""}
    }

    showSourceCode(sourceCode, problemId) {
        this.setState({showSourceCode: true, sourceCode, problemId});
    }

    hideSourceCode() {
        this.setState({showSourceCode: false});
    }

    transferToProfileIfLoggedOut() {
        if (!this.props.auth.user) {
            hashHistory.push('/login');
        }
    }

    componentWillMount() {
        this.transferToProfileIfLoggedOut();
    }

    componentDidUpdate() {
        this.transferToProfileIfLoggedOut();
    }

    componentDidMount() {
        const {auth, onLoad} = this.props;
        if (auth.user) {
            onLoad(auth.user.id);
        }
    }

    render() {
        const {submissions} = this.props;

        let submissionNodes = submissions.map((submission, idx) =>
            <tr key={idx}>
                <td>{submission.id}</td>
                <td><Button bsStyle="success" onClick={() => this.showSourceCode(submission.sourceCode, submission.problemId)}>
                    <FontAwesome name="file-text-o"/> {submission.problemId}
                </Button></td>
                <td>{submission.statusCode}</td>
                <td>{difficulty(submission.level)}</td>
                <td>{submission.problemRankPlace}</td>
                <td>{submission.score}</td>
                <td>{maxScore(submission.level)}</td>
                <td>{submission.elapsedTime}</td>
                <td>{submission.language}</td>
                <td>{<Link to={"/problem/" + submission.problemId} className="btn btn-primary btn-block">
                    Go
                </Link>}</td>
            </tr>
        );

        return <Grid>
            <Col mdOffset={1} md={10}>
                <PageHeader>Submissions</PageHeader>
                <Table striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>Submission ID</th>
                        <th>Problem ID</th>
                        <th>Status</th>
                        <th>Level</th>
                        <th>Ranking #</th>
                        <th>Score</th>
                        <th>Max</th>
                        <th>Time (ms)</th>
                        <th>Language</th>
                        <th>Problem</th>
                    </tr>
                    </thead>
                    <tbody>
                    {submissionNodes}
                    </tbody>
                </Table>
            </Col>
            <SourceCode
                show={this.state.showSourceCode}
                onHide={this.hideSourceCode.bind(this)}
                sourceCode={this.state.sourceCode}
                problemId={this.state.problemId}
            />
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        submissions: state.submissions.items || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (userId) => {
            dispatch(fetchSubmissions(userId));
        }
    }
};

const SubmissionsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Submissions);

export default SubmissionsPage;