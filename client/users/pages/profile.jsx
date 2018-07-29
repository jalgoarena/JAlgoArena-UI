import React from 'react';
import {Grid, Col, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as _ from "lodash";
import User from "../domain/User";
import Blockies from 'react-blockies';
import FontAwesome from "../../common/components/FontAwesome";
import CalendarHeatmap from 'react-calendar-heatmap';

class Profile extends React.Component {

    static githubClassForValue(value) {
        if (!value || value.count === 0) {
            return 'color-github-0';
        }

        if (value.count <= 12) {
            return 'color-github-1';
        }

        if (value.count <= 24) {
            return 'color-github-2';
        }

        if (value.count <= 36) {
            return 'color-github-3';
        }

        return 'color-github-4';
    }

    static titleForValue(value) {
        return value ? `${value.count} submissions on ${value.date}` : `0 submissions`;
    }

    render() {
        let user = _.find(this.props.users,
            (user: User) => user.username === this.props.match.params.username
        );

        if (!user) {
            return <Grid>
                <Col mdOffset={3} md={6}>
                    <h2>Profile not found</h2>
                    <p>Profile: {this.props.match.params.username}</p>
                </Col>
            </Grid>;
        }

        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 4);
        let endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 4);

        return <Grid>
            <Col mdOffset={1} md={3}>
                <Blockies
                    seed={user.email}
                    size={5}
                    scale={40}
                    color="#18bc9c"
                    bgColor="#e1e4e8"
                    spotColor="#18bc9c"
                />
                <h2>{user.firstname} {user.surname}</h2>
                <h4 style={{"color": "#979faf"}}>(@{user.username})</h4>
                <hr/>
                <Well bsSize="small">
                    <h4 className="text-center"><FontAwesome prefix="fas" name="globe"/> {user.region}</h4>
                </Well>
                <Well bsSize="small">
                    <h4 className="text-center"><FontAwesome prefix="fas" name="users"/> {user.team}</h4>
                </Well>
            </Col>
            <Col md={7}>
                <h4>Solved Problems</h4>
                <hr/>
                <h4 className="text-center" style={{"color": "#979faf"}}>{user.username} has not solved any problems yet.</h4>
                <br/>
                <h4>Rating</h4>
                <hr/>
                <br/>
                <h4>Submissions</h4>
                <hr/>
                <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={[
                        { date: '2018-07-07', count: 1 },
                        { date: '2018-07-08', count: 4 },
                        { date: '2018-07-09', count: 9 },
                        { date: '2018-07-10', count: 14 },
                        { date: '2018-07-11', count: 19 },
                        { date: '2018-07-12', count: 24 },
                        { date: '2018-07-13', count: 29 },
                        { date: '2018-07-14', count: 34 },
                        { date: '2018-07-15', count: 50 },
                        { date: '2018-07-16', count: 70 },
                    ]}
                    classForValue={Profile.githubClassForValue}
                    titleForValue={Profile.titleForValue}
                    tooltipDataAttrs={{ 'data-toggle': 'tooltip' }}
                />
            </Col>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.auth.users,
        location: state.router.location
    };
};



const ProfilePage = connect(
    mapStateToProps
)(Profile);

export {ProfilePage};