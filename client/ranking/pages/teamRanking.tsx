import * as React from 'react';
import {Grid, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

import {fetchRanking} from "../actions";
import {TeamRankingTable} from '../components/TeamRankingTable';
import {RankingEntry} from "../domain/RankingEntry";
import {AppState} from "../../common/reducers";
import {Dispatch} from "redux";

interface TeamRankingProps {
    ranking: Array<RankingEntry>
    onLoad: () => void
}

class TeamRanking extends React.Component<TeamRankingProps, {}> {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {

        let ranking = this.props.ranking.map ? this.props.ranking : [];

        return (
            <Grid>
                <Col mdOffset={2} md={8}>
                    <PageHeader>Team Ranking</PageHeader>
                    <TeamRankingTable ranking={ranking} />
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        ranking: state.ranking.general
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        onLoad: () => {
            dispatch<any>(fetchRanking());
        }
    }
};

const TeamRankingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamRanking);

export {TeamRankingPage};
