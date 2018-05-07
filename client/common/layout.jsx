import React from "react";

import MenuPanel from "./components/Menu";
import Footer from "./components/Footer";
import ErrorMessageBox from "./components/ErrorMessage";
import WorkInProgress from "./components/WorkInProgress";
import DevTools from './devtools';
import {ProblemPage, ProblemsAdminPage, ProblemsPage} from "../problems";
import {LoginPage, ProfilePage, SignUpPage, UsersAdminPage} from "../users";
import {LanguageRankingPage, RegionRankingPage, TeamRankingPage, UserRankingPage} from "../ranking";
import {SubmissionsPage} from "../submissions";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "./pages/home";

export class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let devTools = null;
        if (process.env.NODE_ENV !== 'production') {
            devTools = <DevTools store={this.props.store}/>;
        }

        return <div>
            <MenuPanel/>
            <ErrorMessageBox/>
            <WorkInProgress/>
            {devTools}
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/problems" component={ProblemsPage}/>
                <Route exact path="/profile" component={ProfilePage}/>
                <Route exact path="/problem/:id" component={ProblemPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignUpPage}/>
                <Route exact path="/submissions" component={SubmissionsPage}/>
                <Route exact path="/problemsAdmin" component={ProblemsAdminPage}/>
                <Route exact path="/usersAdmin" component={UsersAdminPage}/>
                <Route exact path="/userRanking" component={UserRankingPage}/>
                <Route exact path="/langRanking/:lang" component={LanguageRankingPage}/>
                <Route exact path="/teamRanking" component={TeamRankingPage}/>
                <Route exact path="/regionRanking" component={RegionRankingPage}/>
            </Switch>
            <Footer/>
        </div>;
    }
}
