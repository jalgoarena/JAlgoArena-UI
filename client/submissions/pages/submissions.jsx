import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Col, Button, PageHeader, Row} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import SourceCode from "../components/SourceCode";

import FontAwesome from '../../common/components/FontAwesome';
import {fetchSubmissions} from "../../submissions/actions";
import {DateTime} from "react-datetime-bootstrap";
import moment from "moment";

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
                       disabled={cell.errorMessage === null || cell.errorMessage === ''}
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
        const spanStyle = {
            marginLeft: ".2em",
            marginRight: ".2em"
        };

        return <h4>
            <span className={"label label-success"} style={spanStyle}><FontAwesome prefix="fas" name="check"/> {cell.passedTestCases} </span>
            <span className={"label label-danger"} style={spanStyle}><FontAwesome prefix="fas" name="times"/> {cell.failedTestCases} </span>
        </h4>;
    }

    static dateFormatter(cell: Date) {
        return <DateTime value={moment(cell)} readOnly={true} />;
    }

    render() {
        const submissions = _.orderBy(this.props.submissions, ['submissionTime'], ['desc']);

        let submissionData = submissions.map((submission) => {
            return {
                id: submission.id,
                submissionId: submission.submissionId,
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
                <Row>
                    <PageHeader>Submissions Results</PageHeader>
                    <BootstrapTable data={submissionData} stripped hover pagination search>
                        <TableHeaderColumn isKey
                                           width={'100'}
                                           dataSort
                                           dataField='id'>
                            ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='elapsedTime'>
                            Elapsed Time (ms)</TableHeaderColumn>
                        <TableHeaderColumn dataField='statusCode'
                                           dataFormat={Submissions.statusFormatter.bind(this)}>
                            Status</TableHeaderColumn>
                        <TableHeaderColumn dataField='testCases'
                                           dataFormat={Submissions.testCasesFormatter.bind(this)}>
                            Test Cases</TableHeaderColumn>
                        <TableHeaderColumn dataField='sourceCode'
                                           width={'100'}
                                           dataFormat={this.sourceCodeButtonFormatter.bind(this)}>
                            Source Code</TableHeaderColumn>
                        <TableHeaderColumn dataField='errorMessage'
                                           width={'100'}
                                           dataFormat={this.errorCodeButtonFormatter.bind(this)}>
                            Error Message</TableHeaderColumn>
                        <TableHeaderColumn dataField='problemLink'
                                           dataFormat={Submissions.linkFormatter}
                                           width={'250'}
                                           dataSort>
                            Problem ID</TableHeaderColumn>
                    </BootstrapTable>
                </Row>
                <Row>
                    <PageHeader>Submissions</PageHeader>
                    <BootstrapTable data={submissionData} stripped hover pagination search>
                        <TableHeaderColumn isKey
                                           width={'100'}
                                           dataSort
                                           dataField='id'>
                            ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='submissionId'>
                            Submission ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='submissionTime'
                                           width={'200'}
                                           dataFormat={Submissions.dateFormatter.bind(this)}>
                            Run At</TableHeaderColumn>
                        <TableHeaderColumn dataField='sourceCode'
                                           width={'100'}
                                           dataFormat={this.sourceCodeButtonFormatter.bind(this)}>
                            Source Code</TableHeaderColumn>
                        <TableHeaderColumn dataField='problemLink'
                                           dataFormat={Submissions.linkFormatter}
                                           width={'250'}
                                           dataSort>
                            Problem ID</TableHeaderColumn>
                    </BootstrapTable>
                </Row>
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
            let token = localStorage.getItem('jwtToken');

            if (!token || token === '' ) {
                return null;
            }
            dispatch(fetchSubmissions(userId, token));
        }
    }
};

const SubmissionsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Submissions);

export {SubmissionsPage};