import React from 'react';
import * as _ from 'lodash';
import {Grid, Button, Col, PageHeader, Panel, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';

import FontAwesome from '../../common/components/FontAwesome';
import FieldGroup from '../../common/components/FieldGroup';
import {fetchUsers, updateUser} from "../actions";

class UsersAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "admin",
                password: "",
                email: "admin@mail.com",
                region: "Kraków",
                team: "Team A",
                role: "ADMIN",
                id: "0-0"
            }
        };
    }

    componentDidMount() {
        this.props.onLoad();
    }

    onCreateUser(e) {
        e.preventDefault();

        this.props.onUpdateUser(this.state.user);
    }

    setCurrentUser(userId) {
        let users = this.props.auth.users || [];
        let user = users.find(user => user.id === userId);

        this.setState({user});
    }

    render() {
        let {
            auth, regions, teams
        } = this.props;

        let users = auth.users || [];
        users = _.orderBy(users, ["username"]);
        let userItems = users.map( (user, idx) => {
            return <option value={user.id} key={idx}>{user.username}</option>;
        });

        let regionOptions = regions.map((region, idx) => <option key={idx}>{region}</option>);
        let teamOptions = teams.map((team, idx) => <option key={idx}>{team}</option>);

        return (
            <Grid>
                <PageHeader className="text-center">Users ({users.length})</PageHeader>
                <Col md={6}>
                    <form>
                        <Panel header={<h3 className="panel-title">Choose user</h3>}>
                            <select className="form-control" id="chosenUser"
                                    value={this.state.user.id}
                                    onChange={(e) => this.setCurrentUser(e.target.value)}>
                                {userItems}
                            </select>
                        </Panel>
                        <FormGroup controlId="region">
                            <ControlLabel>Region</ControlLabel>
                            <FormControl componentClass="select"
                                         value={this.state.user.region}
                                         onChange={(e) => this.setState({
                                             user: Object.assign({}, this.state.user, {
                                                 region: e.target.value
                                             })
                                         })}>
                                {regionOptions}
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="team">
                            <ControlLabel>Team</ControlLabel>
                            <FormControl componentClass="select"
                                         value={this.state.user.team}
                                         onChange={(e) => this.setState({
                                             user: Object.assign({}, this.state.user, {
                                                 team: e.target.value
                                             })
                                         })}>
                                {teamOptions}
                            </FormControl>
                        </FormGroup>
                        <FieldGroup id="password" type="password" placeholder="Change Password" label="Password"
                                    value={this.state.user.password}
                                    onChange={(e) => this.setState({
                                        user: Object.assign({}, this.state.user, {
                                            password: e.target.value
                                        })
                                    })}
                        />
                        <Button type="submit" bsStyle="success" block
                                onClick={(e) => this.onCreateUser(e)}>
                            <FontAwesome prefix="fas" name="paper-plane"/> Update
                        </Button>
                    </form>
                </Col>
                <Col md={6}>
                    <div>
                        <h4>Username: {this.state.user.username}</h4>
                        <h4>ID: {this.state.user.id}</h4>
                        <h4>Email: {this.state.user.email}</h4>
                        <h4>Role: {this.state.user.role}</h4>
                        <h4>Region: {this.state.user.region}</h4>
                        <h4>Team: {this.state.user.team}</h4>
                        <h4>Password: {this.state.user.password}</h4>
                    </div>
                    <div>
                        <PageHeader className="text-center">Result</PageHeader>
                        <span>
                            {JSON.stringify(this.props.auth.updatedUser || {})}
                        </span>
                    </div>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        regions: state.config.regions,
        teams: state.config.teams
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchUsers());
        },
        onUpdateUser: (user) => {
            dispatch(updateUser(user));
        }
    }
};

const UsersAdminPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersAdmin);

export {UsersAdminPage};