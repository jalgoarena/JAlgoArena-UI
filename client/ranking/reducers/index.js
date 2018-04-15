// @flow

import * as types from "../../constants/ActionTypes";
import {RankingEntry} from "../domain/RankingEntry";
import {ProblemRankingEntry} from "../domain/ProblemRankingEntry";
import config from "../../config";

type RankingState = {
    general: Array<RankingEntry>,
    problemRanking: Array<ProblemRankingEntry>,
    languages: {}
}

type RankingAction = {
    type: string,
    ranking?: Array<RankingEntry>,
    problemRanking?: Array<ProblemRankingEntry>,
    lang?: string
}

let defaultLangRanking = {};

config.languages.forEach(lang => {
    let langJson = {};
    langJson[lang] = [];
    defaultLangRanking = Object.assign({}, defaultLangRanking, langJson);
});

export function ranking(state: RankingState = {
    general: [],
    problemRanking: [],
    languages: defaultLangRanking
}, action: RankingAction): RankingState {
    switch (action.type) {
        case types.FETCH_RANKING:
            return Object.assign({}, state, {
                general: action.ranking
            });
        case types.FETCH_PROBLEM_RANKING:
            return Object.assign({}, state, {
                problemRanking: action.problemRanking
            });
        case types.FETCH_LANG_RANKING:
            let langJson = {};
            const lang = ((action.lang: any): string);
            langJson[lang] = action.ranking;
            let languages = Object.assign({}, state.languages, langJson);

            return Object.assign({}, state, {
                languages
            });
        default:
            return state;
    }
}
