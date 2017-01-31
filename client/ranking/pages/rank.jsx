import React from 'react';
import _ from 'lodash';
import {Grid, Col, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

import {fetchRanking} from "../actions";
import UserRank from '../components/UserRank';
import RegionRank from '../components/RegionRank';
import TeamRank from '../components/TeamRank';

class Leaderboard extends React.Component {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {

        let ranking = this.props.ranking.map ? this.props.ranking : [];

        return (
            <Grid>
                <Col md={3}>
                    <PageHeader>Region Ranking</PageHeader>
                    <Table striped bordered condensed hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Region</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.regionRankNodes(ranking)}
                        </tbody>
                    </Table>

                    <PageHeader>Team Ranking</PageHeader>
                    <Table striped bordered condensed hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.teamRankNodes(ranking)}
                        </tbody>
                    </Table>
                </Col>
                <Col mdOffset={3} md={6}>
                    <PageHeader>Individual Ranking</PageHeader>
                    <Table striped bordered condensed hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Hacker</th>
                            <th>Region</th>
                            <th>Team</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.rankNodes(ranking)}
                        </tbody>
                    </Table>
                </Col>
            </Grid>
        );
    }

    teamRankNodes(ranking) {
        let teams = _.groupBy(ranking, 'team');
        let teamsRank = _.orderBy(_.map(teams, (rankNodes, team) => {
            return {team: team, score: _.sumBy(rankNodes, 'score')};
        }), ['score'], ['desc']);

        return teamsRank.map((teamRank, idx) =>
            <TeamRank key={idx} idx={idx} team={teamRank.team} score={teamRank.score}/>
        );
    }

    regionRankNodes(ranking) {
        let regions = _.groupBy(ranking, 'region');
        let regionsRank = _.orderBy(_.map(regions, (rankNodes, region) => {
            return {region: region, score: _.sumBy(rankNodes, 'score')};
        }), ['score'], ['desc']);

        return regionsRank.map((regionRank, idx) =>
            <RegionRank key={idx} idx={idx} region={regionRank.region} score={regionRank.score}/>
        );
    }

    rankNodes(ranking) {
        return ranking.map((user, idx) =>
            <UserRank key={idx} idx={idx} hacker={user.hacker} score={user.score} region={user.region}
                      team={user.team}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        ranking: state.ranking.general
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchRanking());
        }
    }
};

const RankPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboard);

export default RankPage;
