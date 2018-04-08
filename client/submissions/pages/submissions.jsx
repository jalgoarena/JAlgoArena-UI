import React from 'react';
import {Link} from 'react-router';
import {Grid, Col, Button, PageHeader} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as _ from 'lodash';

import SourceCode from "../components/SourceCode";

import FontAwesome from '../../common/components/FontAwesome';
import {fetchSubmissions} from "../../submissions/actions";

class Submissions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSourceCode: false, showErrorMessage: false, sourceCode: "", problemId: "", errorMessage: null
        }
    }

    showSourceCode(sourceCode, problemId) {
        this.setState({showSourceCode: true, sourceCode, problemId});
    }

    showErrorMessage(errorMessage, problemId) {
        console.log(errorMessage);
        this.setState({showErrorMessage: errorMessage !== null, errorMessage, problemId})
    }

    hideSourceCode() {
        this.setState({showSourceCode: false});
    }

    hideErrorMessage() {
        this.setState({showErrorMessage: false});
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

    static linkFormatter(cell) {
        return <Link to={"/problem/" + cell} className="btn btn-primary btn-block">
            {cell}
        </Link>
    }

    sourceCodeButtonFormatter(cell) {
        return <Button bsStyle="success" block
                       onClick={() => this.showSourceCode(cell.sourceCode, cell.problemId)}>
            <FontAwesome prefix="far" name="file-alt"/>
        </Button>;
    }

    errorCodeButtonFormatter(cell) {
        return <Button bsStyle="danger" block
                       onClick={() => {
                           this.showErrorMessage(cell.errorMessage, cell.problemId)
                       }}>
            <FontAwesome prefix="fas" name="exclamation-triangle"/>
        </Button>;
    }

    static statusFormatter(cell) {
        let status;
        let style;
        let icon;
        switch (cell) {
            case 'ACCEPTED':
                status = 'Accepted';
                style = 'text-success';
                icon = 'check';
                break;
            case 'WRONG_ANSWER':
                status = 'Wrong Answer';
                style = 'text-danger';
                icon = 'times';
                break;
            case 'COMPILE_ERROR':
                status = 'Compile Error';
                style = 'text-danger';
                icon = 'times';
                break;
            case 'RUNTIME_ERROR':
                status = 'Runtime Error';
                style = 'text-danger';
                icon = 'times';
                break;
            case 'TIME_LIMIT_EXCEEDED':
                status = 'Time Limit';
                style = 'text-warning';
                icon = 'exclamation-triangle';
                break;
            case 'MEMORY_LIMIT_EXCEEDED':
                status = 'Memory Limit';
                style = 'text-warning';
                icon = 'exclamation-triangle';
                break;
            default:
                status = 'Waiting';
                style = 'text-primary';
                icon = 'clock';
                break;
        }


        return <span className={style}>
            <FontAwesome prefix="fas" name={icon}/> {status}
        </span>
    }

    static testCasesFormatter(cell) {
        return <h4>
            <span className={"label label-success"}><FontAwesome prefix="fas" name="check"/> {cell.passedTestCases}</span>
            <span className={"label label-danger"}><FontAwesome prefix="fas" name="times"/> {cell.failedTestCases}</span>
        </h4>;
    }

    render() {
        const submissions = _.orderBy(this.props.submissions, ['submissionTime'], ['desc']);

        let submissionData = submissions.map((submission) => {
            return {
                id: submission.submissionId,
                submissionTime: submission.submissionTime,
                problemId: submission.problemId,
                sourceCode: {
                    sourceCode: submission.sourceCode,
                    problemId: submission.problemId
                },
                elapsedTime: submission.elapsedTime,
                testCases: {
                    passedTestCases: submission.passedTestCases,
                    failedTestCases: submission.failedTestCases
                },
                language: submission.language,
                statusCode: submission.statusCode,
                errorMessage: {
                    errorMessage: submission.errorMessage,
                    problemId: submission.problemId
                },
                problemLink: submission.problemId
            }
        });

        return <Grid>
            <Col>
                <PageHeader>Submissions</PageHeader>
                <BootstrapTable data={submissionData} stripped hover pagination search>
                    <TableHeaderColumn isKey
                                       dataField='id'
                                       width={'140'}>
                        ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='submissionTime'
                                       width={'150'}
                                       dataSort>
                        Run At</TableHeaderColumn>
                    <TableHeaderColumn dataField='language'
                                       width={'80'}
                                       dataSort>
                        Lang</TableHeaderColumn>
                    <TableHeaderColumn dataField='statusCode'
                                       dataFormat={Submissions.statusFormatter.bind(this)}>
                        Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='elapsedTime'>
                        Elapsed Time (ms)</TableHeaderColumn>
                    <TableHeaderColumn dataField='testCases'
                                       dataFormat={Submissions.testCasesFormatter.bind(this)}>
                        Test Cases</TableHeaderColumn>
                    <TableHeaderColumn dataField='sourceCode'
                                       dataFormat={this.sourceCodeButtonFormatter.bind(this)}>
                        Source Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='errorMessage'
                                       dataFormat={this.errorCodeButtonFormatter.bind(this)}>
                        Error</TableHeaderColumn>
                    <TableHeaderColumn dataField='problemLink'
                                       dataFormat={Submissions.linkFormatter}
                                       width={'150'}
                                       dataSort>
                        Problem ID</TableHeaderColumn>
                </BootstrapTable>
            </Col>
            <SourceCode
                show={this.state.showSourceCode}
                onHide={this.hideSourceCode.bind(this)}
                sourceCode={this.state.sourceCode}
                problemId={this.state.problemId}
            />
            <SourceCode
                show={this.state.showErrorMessage}
                onHide={this.hideErrorMessage.bind(this)}
                sourceCode={this.state.errorMessage}
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