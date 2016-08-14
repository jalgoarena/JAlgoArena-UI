import React from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'react-bootstrap';

export default class Problem extends React.Component {
    render() {
        const problemStyle = {
            margin: "20px 20px 0px",
            borderRadius: 5,
            border: "1px solid #c2c7d0",
            padding: "1em 2em 1em"
        };

        return <Col md={5} style={problemStyle}>
            <Row>
                <h4 className="text-success">{this.props.title}</h4>
            </Row>
            <Row>
                <Link to={"/problem/" + this.props.id} className="btn btn-success pull-right"><i className="fa fa-bars"> </i> Solve Problem</Link>
                Time Limit: {this.props.timeLimit}<br />
                Memory Limit: {this.props.memoryLimit}
            </Row>
        </Col>
    }
}