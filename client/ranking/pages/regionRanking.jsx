import React from 'react';
import {Grid, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

import {fetchRanking} from "../actions";
import RegionRanking from '../components/RegionRanking';
import TeamRanking from '../components/TeamRanking';

class GroupRanking extends React.Component {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {

        let ranking = this.props.ranking.map ? this.props.ranking : [];

        return (
            <Grid>
                <Col mdOffset={2} md={8}>
                    <PageHeader>Region Ranking</PageHeader>
                    <RegionRanking ranking={ranking} />
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

const GroupRankingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupRanking);

export default GroupRankingPage;
