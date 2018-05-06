// @flow

import React from 'react';
import {Grid, Col, PageHeader} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';

import {RankingEntry} from "../domain/RankingEntry";
import {fetchLangRanking} from "../actions";

type Props = {
    ranking: {},
    params: {lang: string}
}

class LanguageRanking extends React.Component<Props> {

    render() {
        const {ranking, params} = this.props;
        let lang = params.lang;

        let rankingData = ranking[lang].map((rankEntry: RankingEntry, idx: number) => {

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
                <PageHeader>Language Ranking - {lang}</PageHeader>
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
        ranking: state.ranking.languages || []
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onLoad: (lang) => {
            dispatch(fetchLangRanking(lang));
        }
    }
};

const LanguageRankingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageRanking);

export {LanguageRankingPage};