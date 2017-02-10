import React from 'react';
import {Grid, Col, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

import {fetchRanking} from "../actions";
import UserRank from '../components/UserRank';
import RegionRanking from '../components/RegionRanking';
import TeamRanking from '../components/TeamRanking';

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
                    <RegionRanking ranking={ranking} />

                    <PageHeader>Team Ranking</PageHeader>
                    <TeamRanking ranking={ranking} />
                </Col>
                <Col mdOffset={1} md={8}>
                    <PageHeader>Individual Ranking</PageHeader>
                    <Table striped bordered condensed hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Hacker</th>
                            <th>Region</th>
                            <th>Team</th>
                            <th>Score</th>
                            <th>Java</th>
                            <th>Kotlin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Leaderboard.rankNodes(ranking)}
                        </tbody>
                    </Table>
                </Col>
            </Grid>
        );
    }

    static rankNodes(ranking) {
        return ranking.map((rankEntry, idx) =>
            <UserRank key={idx} idx={idx} hacker={rankEntry.hacker} score={rankEntry.score} region={rankEntry.region}
                      team={rankEntry.team} numberOfSolutionsPerLanguage={rankEntry.numberOfSolutionsPerLanguage} />
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
