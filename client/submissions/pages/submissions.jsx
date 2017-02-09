import React from 'react';
import {Link} from 'react-router';
import {Grid, Col, Button, PageHeader} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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

    static linkFormatter(cell) {
        return <Link to={"/problem/" + cell} className="btn btn-primary btn-block">
            Go
        </Link>
    }

    buttonFormatter(cell) {
        return <Button bsStyle="success" block
                       onClick={() => this.showSourceCode(cell.sourceCode, cell.problemId)}>
            <FontAwesome name="file-text-o"/>
        </Button>;
    }

    render() {
        const {submissions} = this.props;

        let submissionData = submissions.map((submission) => {
            return {
                id: submission.id,
                problemId: submission.problemId,
                sourceCode: {
                    sourceCode: submission.sourceCode,
                    problemId: submission.problemId
                },
                level: submission.level,
                problemRankPlace: submission.problemRankPlace,
                score: submission.score,
                maxScore: maxScore(submission.level),
                elapsedTime: submission.elapsedTime,
                language: submission.language,
                problemLink: submission.problemId
            }
        });

        const levelType = {
            1: 'Easy',
            2: 'Medium',
            3: 'Hard'
        };

        function levelFormatter(cell, row, enumObject) {
            return enumObject[cell];
        }

        return <Grid>
            <Col>
                <PageHeader>Submissions</PageHeader>
                <BootstrapTable data={submissionData} stripped hover pagination search>
                    <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='problemId'
                                       width={200}
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       dataSort={true}>Problem ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='level'
                                       dataSort={true}
                                       filterFormatted dataFormat={ levelFormatter }
                                       formatExtraData={ levelType }
                                       filter={ { type: 'SelectFilter', options: levelType }}>Level</TableHeaderColumn>
                    <TableHeaderColumn dataField='problemRankPlace'
                                       width={80}
                                       dataSort={true}>Rank #</TableHeaderColumn>
                    <TableHeaderColumn dataField='score'
                                       width={70}
                                       dataSort={true}>Score</TableHeaderColumn>
                    <TableHeaderColumn dataField='maxScore'
                                       width={70}
                                       dataSort={true}>Max</TableHeaderColumn>
                    <TableHeaderColumn dataField='elapsedTime'
                                       width={150}
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
                                       dataFormat={this.buttonFormatter.bind(this)}>Source Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='problemLink'
                                       dataFormat={Submissions.linkFormatter}>Problem</TableHeaderColumn>
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