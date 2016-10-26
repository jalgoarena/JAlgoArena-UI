import React from 'react';
import {Button, Row, Col, ButtonToolbar} from 'react-bootstrap';
import SourceCode from './SourceCode';
import FontAwesome from './FontAwesome';

const submissionStyle = {
    margin: "20px 20px 0px",
    borderRadius: 5,
    border: "1px solid #c2c7d0",
    padding: "1em 2em 1em"
};

class Submission extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showSourceCode: false}
    }

    showSourceCode() {
        this.setState({showSourceCode: true});
    }

    hideSourceCode() {
        this.setState({showSourceCode: false});
    }

    render() {
        return (
            <Col md={6} style={submissionStyle}>
                <Row>
                    <h4 className="text-success">{this.props.problemId} <span className="pull-right">{`${this.props.username}:${this.props.userId}`}</span></h4>
                </Row>
                <Row>

                    <ButtonToolbar className="pull-right">
                        <Button bsStyle="success"
                                onClick={this.showSourceCode.bind(this)}>
                            <FontAwesome name="bars"/> Source Code
                        </Button>
                        <Button bsStyle="info"
                                onClick={() =>
                                    this.props.onRerun(this.props.sourceCode, this.props.userId, this.props.problemId, this.props.level)
                                }>
                            <FontAwesome name="refresh"/> Re-Run
                        </Button>
                        <Button bsStyle="danger"
                                onClick={() => this.props.onDelete(this.props.submissionId)}>
                            <FontAwesome name="remove"/> Delete
                        </Button>
                    </ButtonToolbar>

                    <span className="text-muted">Difficulty:</span> <span className="text-primary">{this.props.level}</span><br />
                    <span className="text-muted">Elapsed Time:</span> <span className="text-primary">{this.props.elapsed_time} sec</span><br />
                    <span className="text-muted">Source Code length:</span> <span className="text-primary">{this.props.sourceCode.length} chars</span><br />
                    <span className="text-muted">Status:</span> <span className="text-primary">{this.props.statusCode}</span>
                </Row>
                <SourceCode
                    sourceCode={this.props.sourceCode}
                    problemId={this.props.problemId}
                    userId={`${this.props.username}:${this.props.userId}`}
                    show={this.state.showSourceCode}
                    onHide={this.hideSourceCode.bind(this)}
                />
            </Col>
        );
    };
}

export default Submission;