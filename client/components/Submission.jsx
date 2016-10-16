import React from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import SourceCode from './SourceCode';
import FontAwesome from './FontAwesome';

const submissionStyle = {
    margin: "20px 20px 0px",
    borderRadius: 5,
    border: "1px solid #c2c7d0",
    padding: "1em 2em 1em"
};

function difficulty(level) {
    switch (level) {
        case 3: return 'Hard';
        case 2: return 'Medium';
        default:  return 'Easy';
    }
}

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
            <Col md={5} style={submissionStyle}>
                <Row>
                    <h4 className="text-success">{this.props.problemId} <span className="pull-right">{this.props.userId}</span></h4>
                </Row>
                <Row>

                    <Button bsStyle="success" className="pull-right"
                            onClick={this.showSourceCode.bind(this)}>
                        <FontAwesome name="bars"/> Source Code
                    </Button>

                    <span className="text-muted">Difficulty:</span> <span className="text-primary">{difficulty(this.props.level)}</span><br />
                    <span className="text-muted">Elapsed Time:</span> <span className="text-primary">{this.props.elapsed_time} ms</span>
                </Row>
                <SourceCode
                    sourceCode={this.props.sourceCode}
                    problemId={this.props.problemId}
                    userId={this.props.userId}
                    show={this.state.showSourceCode}
                    onHide={this.hideSourceCode.bind(this)}
                />
            </Col>
        );
    };
}

export default Submission;