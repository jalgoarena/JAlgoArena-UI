// @flow

import React from 'react';
import {Grid, Col, PageHeader} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';

import {fetchRanking} from "../actions/index";
import {RankingEntry} from "../domain/RankingEntry";
import {fetchUsers} from "../../users/actions";

type Props = {
    ranking: Array<RankingEntry>,
}

class UserRanking extends React.Component<Props> {

    render() {
        const {ranking} = this.props;

        let rankingData = ranking.map((rankEntry: RankingEntry, idx: number) => {

            return {
                place: idx + 1,
                hacker: rankEntry.hacker,
                score: rankEntry.score,
                region: rankEntry.region,
                team: rankEntry.team,
                solvedCount: rankEntry.solvedProblems.length
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
                    <TableHeaderColumn dataField='solvedCount'
                                       dataSort># Solved</TableHeaderColumn>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchUsers());
            dispatch(fetchRanking());
        }
    }
};

const UserRankingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRanking);

export {UserRankingPage};