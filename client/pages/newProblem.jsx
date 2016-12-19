import React from 'react';
import {Grid, Button, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

class NewProblem extends React.Component {
    render() {
        return <span>New Problem</span>;
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const NewProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProblem);

export default NewProblemPage;