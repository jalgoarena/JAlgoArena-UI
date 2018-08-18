import * as React from "react";

import MenuPanel from "./components/Menu";
import Footer from "./components/Footer";
import ErrorMessageBox from "./components/ErrorMessage";
import {EnhancedProblemPage, ProblemsPage} from "../problems/index";
import {LoginPage, ProfilePage, SignUpPage} from "../users/index";
import {RegionRankingPage, TeamRankingPage, UserRankingPage} from "../ranking/index";
import {SubmissionsPage} from "../submissions/index";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "./pages/home";
import {CodeOfConductPage} from "./pages/codeOfConduct";

export class Layout extends React.Component<any, any> {
    render() {
        return <div>
            <MenuPanel/>
            <ErrorMessageBox/>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/problems" component={ProblemsPage}/>
                <Route exact path="/profile/:username" component={ProfilePage}/>
                <Route exact path="/problem/:id" component={EnhancedProblemPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignUpPage}/>
                <Route exact path="/submissions" component={SubmissionsPage}/>
                <Route exact path="/userRanking" component={UserRankingPage}/>
                <Route exact path="/teamRanking" component={TeamRankingPage}/>
                <Route exact path="/regionRanking" component={RegionRankingPage}/>
                <Route exact path="/codeOfConduct" component={CodeOfConductPage}/>
            </Switch>
            <Footer/>
        </div>;
    }
}
