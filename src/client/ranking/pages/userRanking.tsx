import * as React from 'react';
import * as _ from "lodash";
import {Grid, Col, PageHeader} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';

import {fetchRanking, fetchRankingStartDate} from "../actions/index";
import {RankingEntry} from "../domain/RankingEntry";
import {Link} from "react-router-dom";
import FontAwesome from "../../common/components/FontAwesome";
import {Dispatch} from "redux";
import {AppState} from "../../common/reducers/index";

interface UserRankingProps {
    ranking: Array<RankingEntry>
    previousRanking: Array<RankingEntry>
    onLoad: () => void
}

interface PreviousRankEntry extends RankingEntry {
    place: number
    hacker: string;
    score: number;
    region: string;
    team: string;
    solvedCount: number
}

class UserRanking extends React.Component<UserRankingProps, {}> {

    componentDidMount() {
        this.props.onLoad();
    }

    static linkFormatter(cell: string) {
        return <Link to={"/profile/" + cell}>
            {cell}
        </Link>
    }

    static changeFormatter(cell: number) {

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

    static scoreFormatter(cell: number) {
        return <span className={"text-success pull-right"} >{cell}</span>;
    }

    render() {
        const {ranking, previousRanking} = this.props;
        const NEW_USER = -10000;

        let previousRankingData: Array<PreviousRankEntry> = previousRanking.map((rankEntry: RankingEntry, idx: number) => {

            return {
                place: idx + 1,
                hacker: rankEntry.hacker,
                score: rankEntry.score,
                region: rankEntry.region,
                team: rankEntry.team,
                solvedCount: rankEntry.solvedProblems.length
            } as PreviousRankEntry
        });

        let rankingData = ranking.map((rankEntry: RankingEntry, idx: number) => {

            let previousRankEntry =
                _.find(previousRankingData, (prevRankEntry: PreviousRankEntry) => prevRankEntry.hacker === rankEntry.hacker);

            let place = idx + 1;

            let change = previousRankEntry && previousRankEntry.score !== 0
                ? (previousRankEntry.place - place)
                : NEW_USER;

            return {
                place,
                hacker: rankEntry.hacker,
                score: rankEntry.score,
                region: rankEntry.region,
                team: rankEntry.team,
                solvedCount: rankEntry.solvedProblems.length,
                change
            }
        });

        return <Grid>
            <Col>
                <PageHeader>User Ranking</PageHeader>
                <BootstrapTable data={rankingData} striped hover pagination search>
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

const mapStateToProps = (state: AppState) => {
    return {
        ranking: state.ranking.general,
        rankingStartDate: state.ranking.startDate,
        previousRanking: state.ranking.previousRanking
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        onLoad: () => {
            dispatch<any>(fetchRankingStartDate());
            dispatch<any>(fetchRanking());
        }
    }
};

const UserRankingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRanking);

export {UserRankingPage};