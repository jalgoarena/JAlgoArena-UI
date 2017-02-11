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
                <PageHeader>Individual Ranking</PageHeader>
                <BootstrapTable data={rankingData} stripped hover pagination search>
                    <TableHeaderColumn isKey
                                       width={50}
                                       dataSort={true}
                                       dataField='place'>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='hacker'
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       >Hacker</TableHeaderColumn>
                    <TableHeaderColumn dataField='region'
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       dataSort={true}>Region</TableHeaderColumn>
                    <TableHeaderColumn dataField='team'
                                       filter={ { type: 'TextFilter', delay: 1000 } }
                                       dataSort={true}>Team</TableHeaderColumn>
                    <TableHeaderColumn dataField='javaSolutionsCount'
                                       filter={ {
                                            type: 'NumberFilter',
                                            delay: 1000,
                                            numberComparators: [ '=', '>', '<=' ]
                                       }}
                                       dataSort={true}>Java</TableHeaderColumn>
                    <TableHeaderColumn dataField='kotlinSolutionsCount'
                                       filter={ {
                                            type: 'NumberFilter',
                                            delay: 1000,
                                            numberComparators: [ '=', '>', '<=' ]
                                       }}
                                       dataSort={true}>Kotlin</TableHeaderColumn>
                    <TableHeaderColumn dataField='score'
                                       filter={ {
                                            type: 'NumberFilter',
                                            delay: 1000,
                                            numberComparators: [ '>', '<=' ]
                                       }}
                                       dataSort={true}>Score</TableHeaderColumn>
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