// @flow

import React from 'react';
import {Grid, Col, PageHeader} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';

import {fetchRanking} from "../actions/index";
import {RankingEntry} from "../domain/RankingEntry";
import {fetchUsers} from "../../users/actions";
import {Link} from "react-router-dom";
import {fetchSubmissionStats} from "../../submissions/actions";
import FontAwesome from "../../common/components/FontAwesome";

type Props = {
    ranking: Array<RankingEntry>,
}

class UserRanking extends React.Component<Props> {

    static linkFormatter(cell) {
        return <Link to={"/profile/" + cell}>
            {cell}
        </Link>
    }

    static changeFormatter(cell) {

        if (cell === -10000) {
            return <span className={"text-info pull-right"} ><FontAwesome prefix="fas" name="star"/></span>;
        }

        if (cell > 0) {
            return <span className={"text-success pull-right"} >{cell} <FontAwesome prefix="fas" name="arrow-up"/></span>;
        } else if (cell < 0) {
            return <span className={"text-danger pull-right"} >{cell * -1} <FontAwesome prefix="fas" name="arrow-down"/></span>
        } else {
            return <span className={"text-warning pull-right"} ><FontAwesome prefix="fas" name="equals"/></span>
        }
    }

    static scoreFormatter(cell) {
        return <span className={"text-success pull-right"} >{cell}</span>;
    }

    render() {
        const {ranking} = this.props;

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        let rankingData = ranking.map((rankEntry: RankingEntry, idx: number) => {

            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let value = getRandomInt(0, 10) * plusOrMinus;
            let isNew = Math.random() < 0.5 ? value : -10000;

            return {
                place: idx + 1,
                hacker: rankEntry.hacker,
                score: rankEntry.score,
                region: rankEntry.region,
                team: rankEntry.team,
                solvedCount: rankEntry.solvedProblems.length,
                change: isNew
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
                    <TableHeaderColumn width={'60'}
                                       dataSort
                                       dataFormat={UserRanking.changeFormatter}
                                       dataField='change'>+/-</TableHeaderColumn>
                    <TableHeaderColumn dataField='hacker'
                                       dataFormat={UserRanking.linkFormatter}
                                       >User Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='region'
                                       dataSort>Region</TableHeaderColumn>
                    <TableHeaderColumn dataField='team'
                                       dataSort>Team</TableHeaderColumn>
                    <TableHeaderColumn dataField='solvedCount'
                                       width={'100'}
                                       dataSort># Solved</TableHeaderColumn>
                    <TableHeaderColumn dataField='score'
                                       width={'100'}
                                       dataFormat={UserRanking.scoreFormatter}
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
            dispatch(fetchSubmissionStats());
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