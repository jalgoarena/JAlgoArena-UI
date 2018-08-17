import * as React from 'react';
import {Grid, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

import {fetchRanking} from "../actions";
import {RegionRankingTable} from '../components/RegionRankingTable';
import {RankingEntry} from "../domain/RankingEntry";
import {AppState} from "../../common/reducers";
import {Dispatch} from "redux";

interface RegionRankingProps {
    ranking: Array<RankingEntry>
    onLoad: () => void
}

class RegionRanking extends React.Component<RegionRankingProps, {}> {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {

        let ranking = this.props.ranking.map ? this.props.ranking : [];

        return (
            <Grid>
                <Col mdOffset={2} md={8}>
                    <PageHeader>Region Ranking</PageHeader>
                    <RegionRankingTable ranking={ranking} />
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

const RegionRankingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegionRanking);

export {RegionRankingPage};
