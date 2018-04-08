import React from 'react';
import {Grid, Col, PageHeader} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';

import {fetchRanking} from "../actions/index";

class IndividualRanking extends React.Component {

    render() {
        const {ranking} = this.props;

        let rankingData = ranking.map((rankEntry, idx) => {

            let javaItem = rankEntry.numberOfSolutionsPerLanguage.find(
                item => item.first === 'java'
            ) || {second: 0};

            let kotlinItem = rankEntry.numberOfSolutionsPerLanguage.find(
                item => item.first === 'kotlin'
            ) || {second: 0};

            return {
                place: idx + 1,
                hacker: rankEntry.hacker,
                score: rankEntry.score,
                region: rankEntry.region,
                team: rankEntry.team,
                javaSolutionsCount: javaItem.second,
                kotlinSolutionsCount: kotlinItem.second
            }
        });

        return <Grid>
            <Col>
                <PageHeader>User Ranking</PageHeader>
                <BootstrapTable data={rankingData} stripped hover pagination search>
                    <TableHeaderColumn isKey
                                       width={'50'}
                                       dataSort
                                       dataField='place'>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='hacker'
                                       >User Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='region'
                                       dataSort>Region</TableHeaderColumn>
                    <TableHeaderColumn dataField='team'
                                       dataSort>Team</TableHeaderColumn>
                    <TableHeaderColumn dataField='javaSolutionsCount'
                                       dataSort># Java</TableHeaderColumn>
                    <TableHeaderColumn dataField='kotlinSolutionsCount'
                                       dataSort># Kotlin</TableHeaderColumn>
                    <TableHeaderColumn dataField='score'
                                       dataSort>Score</TableHeaderColumn>
                </BootstrapTable>
            </Col>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        ranking: state.ranking.general || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchRanking());
        }
    }
};

const IndividualRankingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualRanking);

export default IndividualRankingPage;