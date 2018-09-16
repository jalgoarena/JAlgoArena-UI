import * as React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import {User} from "../domain/User";
import {fetchSubmissionStats} from "../../submissions/actions";
import {fetchUsers} from "../actions";
import {RankingEntry} from "../../ranking/domain/RankingEntry";
import {Dispatch} from "redux";
import {AppState} from "../../common/reducers";
import {RouteComponentProps} from "react-router";
import UserDetails from "../components/UserDetails";
import UserStats from "../components/UserStats";
import ProfileNotFound from "../components/ProfileNotFound";

interface MatchParams {
    username: string
}

interface ProfileProps extends RouteComponentProps<MatchParams> {
    onLoad: () => void
    users: Array<User> | null
    stats: any
    rankingStartDate: string
    ranking: Array<RankingEntry>
}

class Profile extends React.Component<ProfileProps, {}> {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        let user = this.findUser();

        if (!user) {
            return <ProfileNotFound username={this.props.match.params.username}/>;
        }

        let userStats = this.props.stats[user.username];

        return <Grid>
            <UserDetails user={user} score={this.scoreFor(user)}/>
            <UserStats
                user={user}
                userStats={userStats}
                startDate={Profile.startDate()}
                endDate={Profile.endDate()}
                rankingStartDate={this.props.rankingStartDate}
            />
        </Grid>;
    }

    private scoreFor(user: User) {
        let userRankEntry =
            this.props.ranking.find((it: RankingEntry) => it.hacker === user.username);

        return userRankEntry ? userRankEntry.score : 0;
    }

    private findUser() {
        return this.props.users ? this.props.users.find(
            (user: User) => user.username === this.props.match.params.username
        ) : null;
    }

    private static endDate() {
        let endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 4);
        return endDate;
    }

    private static startDate() {
        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 4);
        return startDate;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        users: state.auth.users,
        stats: state.submissions.stats,
        rankingStartDate: state.ranking.startDate,
        ranking: state.ranking.general
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        onLoad: () => {
            dispatch<any>(fetchUsers());
            dispatch<any>(fetchSubmissionStats());
        }
    }
};

const ProfilePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export {ProfilePage};