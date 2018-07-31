import React from 'react';
import {Col, Grid, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as _ from "lodash";
import User from "../domain/User";
import Blockies from 'react-blockies';
import FontAwesome from "../../common/components/FontAwesome";
import CalendarHeatmap from 'react-calendar-heatmap';
import {Link} from "react-router-dom";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

        let submissionsCountPerDay = [];

        let userStats = this.props.stats[user.username];

        if (userStats) {
            Object.keys(userStats.submissions).forEach(date => {
                submissionsCountPerDay.push({date, count: userStats.submissions[date]})
            });
        }

        let solvedProblems = <h4 className="text-center" style={{"color": "#979faf"}}>
            {user.username} has not solved any problems yet
        </h4>;

        if (userStats && userStats.solved.length > 0) {
            solvedProblems = userStats.solved.map((problemId, idx) => {
                return <Link to={"/problem/" + problemId} className="btn btn-info" key={idx} style={{"margin": "4px"}}>
                    {problemId}
                </Link>
            })
        }

        let highchartsOptions = {
            title: {
                text: 'Score'
            },
            subtitle: {
                text: 'Additional point for best time excluded'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: 'Points'
                }
            },
            series: [{
                name: "Total points",
                data: [
                    [Date.UTC(2018, 7, 25), 10],
                    [Date.UTC(2018, 7, 26), 20],
                    [Date.UTC(2018, 7, 27), 50],
                ]
            }]
        };

        return <Grid>
            <Col md={3}>
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
            <Col md={9}>
                <h4>Solved Problems</h4>
                <hr/>
                {solvedProblems}
                <br/>
                <br/>
                <h4>Rating</h4>
                <hr/>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={highchartsOptions}
                />
                <br/>
                <br/>
                <h4>Submissions</h4>
                <hr/>
                <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={submissionsCountPerDay}
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
        stats: state.submissions.stats,
        location: state.router.location
    };
};



const ProfilePage = connect(
    mapStateToProps
)(Profile);

export {ProfilePage};