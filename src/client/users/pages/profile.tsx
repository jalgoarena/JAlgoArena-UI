import * as React from 'react';
import {Col, Grid, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as _ from "lodash";
import {User} from "../domain/User";
// @ts-ignore
import Blockies from 'react-blockies';
import FontAwesome from "../../common/components/FontAwesome";
import CalendarHeatmap from 'react-calendar-heatmap';
import {Link} from "react-router-dom";
import * as Highcharts from 'highcharts';
// @ts-ignore
import HighchartsReact from 'highcharts-react-official';
import {fetchSubmissionStats} from "../../submissions/actions/index";
import {fetchUsers} from "../actions/index";
import {RankingEntry} from "../../ranking/domain/RankingEntry";
import {Dispatch} from "redux";
import {AppState} from "../../common/reducers/index";
import {RouteComponentProps} from "react-router";

interface MatchParams {
    username: string
}

interface ProfileProps extends RouteComponentProps<MatchParams> {
    onLoad: () => void
    users: Array<User> | null
    stats: any
    rankingStartDate: string
    ranking: Array<RankingEntry>
}

class Profile extends React.Component<ProfileProps, {}> {

    componentDidMount() {
        this.props.onLoad();
    }

    static githubClassForValue(value: { count: number }) {
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

    static titleForValue(value: { count: number, date: string }) {
        return value ? `${value.count} submissions on ${value.date}` : `0 submissions`;
    }

    scoreFor(user: User) {
        let userRankEntry =
            _.find(this.props.ranking, (it: RankingEntry) => it.hacker === user.username);

        return userRankEntry ? userRankEntry.score : 0;
    }

    submissionsCountPerDay(userStats: { submissions: any }) {
        let submissionsCountPerDay: Array<{ date: string, count: number }> = [];

        if (userStats) {
            Object.keys(userStats.submissions).forEach(date => {
                submissionsCountPerDay.push({date, count: userStats.submissions[date]})
            });
        }
        return submissionsCountPerDay;
    }

    static solvedProblems(user: User, userStats: { solved: Array<string> }) {
        if (!(userStats && userStats.solved.length > 0)) {
            return <h4 className="text-center" style={{"color": "#979faf"}}>
                {user.username} has not solved any problems yet
            </h4>;
        }

        return userStats.solved.map((problemId, idx) => {
            return <Link to={"/problem/" + problemId} className="btn btn-info" key={idx} style={{"margin": "4px"}}>
                {problemId}
            </Link>
        });
    }

    static highchartSolvedProblems(user: User, userStats: any, rankingStartDate: string) {
        let rankingStartDateParts = rankingStartDate.split('-');
        let solvedProblemsCountPerDay = [
            [Date.UTC(parseInt(rankingStartDateParts[0]), parseInt(rankingStartDateParts[1]) - 1, parseInt(rankingStartDateParts[2])), 0]
        ];

        if (userStats) {
            let sum = 0;
            Object.keys(userStats.solvedProblemsPerDay).forEach(date => {
                let count = userStats.solvedProblemsPerDay[date].length;
                let dateParts: Array<string> = date.split("-");
                solvedProblemsCountPerDay.push(
                    [Date.UTC(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2])), count + sum]
                );
                sum += count;
            });
        }


        if (solvedProblemsCountPerDay.length === 0) {
            return <h4 className="text-center" style={{"color": "#979faf"}}>
                {user.username} has not solved any problems yet
            </h4>;
        }


        let highchartsOptions = {
            title: {
                text: 'Solved Problems'
            },
            subtitle: {
                text: 'Show amount of solved problems till the date (including)'
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
                    text: 'Solved'
                }
            },
            series: [{
                name: "Solved problems",
                data: solvedProblemsCountPerDay
            }]
        };

        return <HighchartsReact
            highcharts={Highcharts}
            options={highchartsOptions}
        />;
    }

    findUser() {
        return _.find(this.props.users,
            (user: User) => user.username === this.props.match.params.username
        );
    }

    render() {
        let user = this.findUser();

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

        let userStats = this.props.stats[user.username];

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
                    <h4 className="text-center"><FontAwesome prefix="fas" name="trophy"/> {this.scoreFor(user)}</h4>
                </Well>
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
                {Profile.solvedProblems(user, userStats)}
                <br/>
                <br/>
                <h4>Rating</h4>
                <hr/>
                {Profile.highchartSolvedProblems(user, userStats, this.props.rankingStartDate)}
                <br/>
                <br/>
                <h4>Submissions</h4>
                <hr/>
                <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={this.submissionsCountPerDay(userStats)}
                    classForValue={Profile.githubClassForValue}
                    titleForValue={Profile.titleForValue}
                    tooltipDataAttrs={{'data-toggle': 'tooltip'}}
                />
            </Col>
        </Grid>;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        users: state.auth.users,
        stats: state.submissions.stats,
        rankingStartDate: state.ranking.startDate,
        ranking: state.ranking.general
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        onLoad: () => {
            dispatch<any>(fetchUsers());
            dispatch<any>(fetchSubmissionStats());
        }
    }
};

const ProfilePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export {ProfilePage};