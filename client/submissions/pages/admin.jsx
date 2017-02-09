import React from 'react';
import {Grid, Col, Button, PageHeader} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import SourceCode from "../components/SourceCode";

import FontAwesome from '../../common/components/FontAwesome';
import {fetchAllSubmissions, deleteSubmission, setSubmissionsFilter} from "../actions/index";
import {fetchUsers} from "../../users/actions/index";
import {startJudge, judgeCode} from "../../problems/actions/index";

class Admin extends React.Component {

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

    sourceCodeButtonFormatter(cell) {
        return <Button bsStyle="success" block
                       onClick={() => this.showSourceCode(cell.sourceCode, cell.problemId)}>
            <FontAwesome name="file-text-o"/>
        </Button>;
    }

    rerunCodeButtonFormatter(cell) {
        let submission = cell;

        return <Button bsStyle="info" block
                       onClick={() =>
                            this.props.onRerun(
                                submission.sourceCode,
                                submission.userId,
                                submission.problemId,
                                submission.language
                            )
                        }>
            <FontAwesome name="refresh"/>
        </Button>
    }

    deleteButtonFormatter(cell) {
        let submissionId = cell;

        return <Button bsStyle="danger" block
                       onClick={() => this.props.onDelete(submissionId)}>
            <FontAwesome name="remove"/>
        </Button>;
    }

    findUsername(users, submission) {
        let user = users.find((user) => {
            return user.id === submission.userId;
        });

        if (user && user.username) {
            return user.username;
        } else {
            return 'Not-Found';
        }
    }

    render() {
        const {submissions, auth} = this.props;
        let users = auth.users || [];

        let submissionData = submissions.map((submission) => {
            return {
                id: submission.id,
                problemId: submission.problemId,
                sourceCode: {
                    sourceCode: submission.sourceCode,
                    problemId: submission.problemId
                },
                level: submission.level,
                sourceCodeLength: submission.sourceCode ? submission.sourceCode.length : 0,
                statusCode: submission.statusCode,
                username: this.findUsername(users, submission),
                userId: submission.userId,
                elapsedTime: submission.elapsedTime,
                language: submission.language,
                submission
            }
        });

        return <Grid fluid>
            <Col>
                <PageHeader>Submissions Admin</PageHeader>
                <BootstrapTable data={submissionData} stripped hover pagination search>
                    <TableHeaderColumn isKey
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='problemId'
                                       width={200}
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       dataSort={true}>Problem ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='statusCode'
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       dataSort={true}>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='sourceCodeLength'
                                       filter={ {
                                            type: 'NumberFilter',
                                            delay: 1000,
                                            numberComparators: [ '=', '>', '<=' ]
                                       }}
                                       dataSort={true}>Source Code Length</TableHeaderColumn>
                    <TableHeaderColumn dataField='username'
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       dataSort={true}>Username</TableHeaderColumn>
                    <TableHeaderColumn dataField='userId'
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       dataSort={true}>User ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='elapsedTime'
                                       filter={ {
                                            type: 'NumberFilter',
                                            delay: 1000,
                                            numberComparators: [ '=', '>', '<=' ]
                                       }}
                                       dataSort={true}>Elapsed Time (ms)</TableHeaderColumn>
                    <TableHeaderColumn dataField='language'
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       dataSort={true}>Lang</TableHeaderColumn>
                    <TableHeaderColumn dataField='sourceCode'
                                       width={80}
                                       dataFormat={this.sourceCodeButtonFormatter.bind(this)}>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='submission'
                                       width={80}
                                       dataFormat={this.rerunCodeButtonFormatter.bind(this)}>Rerun</TableHeaderColumn>
                    <TableHeaderColumn dataField='id'
                                       width={80}
                                       dataFormat={this.deleteButtonFormatter.bind(this)}>Delete</TableHeaderColumn>
                </BootstrapTable>
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
        onLoad: () => {
            dispatch(fetchAllSubmissions());
            dispatch(fetchUsers());
        },
        onDelete: (submissionId) => {
            dispatch(deleteSubmission(submissionId));
        },
        onRerun: (sourceCode, userId, problemId, problemLanguage) => {
            dispatch(startJudge());
            dispatch(judgeCode(sourceCode, problemId, userId, problemLanguage, true));
        },
        changeFilter: (status) => {
            dispatch(setSubmissionsFilter(status));
        }
    }
};

const SubmissionsAdminPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);

export default SubmissionsAdminPage;