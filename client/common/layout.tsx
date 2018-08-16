import * as React from "react";

import MenuPanel from "./components/Menu";
import Footer from "./components/Footer";
import ErrorMessageBox from "./components/ErrorMessage";
import {ProblemPage, ProblemsPage} from "../problems";
import {LoginPage, ProfilePage, SignUpPage} from "../users";
import {RegionRankingPage, TeamRankingPage, UserRankingPage} from "../ranking";
import {SubmissionsPage} from "../submissions";
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
                <Route exact path="/problem/:id" component={ProblemPage}/>
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
