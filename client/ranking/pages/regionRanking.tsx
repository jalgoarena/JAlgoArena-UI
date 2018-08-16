import React from 'react';
import {Grid, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

import {fetchRanking} from "../actions";
import {RegionRankingTable} from '../components/RegionRankingTable';

class RegionRanking extends React.Component {

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

const mapStateToProps = (state) => {
    return {
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

const RegionRankingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegionRanking);

export {RegionRankingPage};
