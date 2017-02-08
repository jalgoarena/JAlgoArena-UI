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
                <Col md={4}>
                    <PageHeader>Region Ranking</PageHeader>
                    <RegionRanking ranking={ranking} />

                    <PageHeader>Team Ranking</PageHeader>
                    <TeamRanking ranking={ranking} />
                </Col>
                <Col mdOffset={2} md={6}>
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
                        {Leaderboard.rankNodes(ranking)}
                        </tbody>
                    </Table>
                </Col>
            </Grid>
        );
    }

    static rankNodes(ranking) {
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
