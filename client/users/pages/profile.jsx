import React from 'react';
import {Grid, Col, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.auth.user.username
        }
    }

    componentDidMount() {
        this.setState({username: this.props.match.params.username});
    }

    render() {
        const {
            auth
        } = this.props;

        let {
            user
        } = auth;

        user = user || {username: "", email: "", id: "", region: "", team: ""};

        return <Grid>
            <Col mdOffset={3} md={6}>
                <PageHeader>Profile</PageHeader>
                <Table striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Region</th>
                        <th>Team</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.region}</td>
                        <td>{user.team}</td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        location: state.router.location
    };
};



const ProfilePage = connect(
    mapStateToProps
)(Profile);

export {ProfilePage};