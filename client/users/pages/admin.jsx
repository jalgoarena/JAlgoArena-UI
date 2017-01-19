import React from 'react';
import {findDOMNode} from 'react-dom';
import _ from 'lodash';
import {Grid, Button, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

import FontAwesome from '../../common/components/FontAwesome';
import {fetchUsers} from "../actions";


class UsersAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                "id": "0-0",
                "username": "jacek"
            }
        };
    }

    componentDidMount() {
        this.props.onLoad();
    }

    onCreateUser(e) {
        e.preventDefault();
    }

    setCurrentUser(userId) {
        let users = this.props.userAuthSession.users || [];
        let user = users.find(user => user.username === userId);

        this.setState({user});
    }

    render() {
        let users = this.props.userAuthSession.users || [];
        console.log(users);
        users = _.orderBy(users, ["username"]);
        let userItems = users.map(user => {
            return <option value={user.id} selected={user.username === "admin"}>{user.username}</option>;
        });

        return (
            <Grid>
                <PageHeader className="text-center">Users ({users.length})</PageHeader>
                <Col md={6}>
                    <form>
                        <div className="panel panel-danger">
                            <div className="panel-heading">
                                <h3 className="panel-title">Choose user</h3>
                            </div>
                            <div className="panel-body">
                                <select className="form-control" id="chosenUser"
                                        onChange={(e) => this.setCurrentUser(e.target.value)}>
                                    {userItems}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="control-label">Username </label>
                            <input className="form-control" type="text" placeholder="Username" id="username" ref="username"
                                   value={this.state.user.username}
                                   onChange={(e) => this.setState({
                                       user: Object.assign({}, this.state.user, {
                                           username: e.target.value
                                       })
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userId" className="control-label">User ID</label>
                            <input className="form-control" type="text" placeholder="User ID" id="userId"
                                   ref="userId"
                                   value={this.state.user.id}
                                   readOnly="true"
                            />
                        </div>
                        <Button type="submit" bsStyle="success" block
                                onClick={(e) => this.onCreateUser(e)}>
                            <FontAwesome name="send"/> Update
                        </Button>
                    </form>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userAuthSession: state.userAuthSession
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchUsers());
        }
    }
};

const UsersAdminPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersAdmin);

export default UsersAdminPage;