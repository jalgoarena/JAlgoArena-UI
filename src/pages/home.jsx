import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
    render() {
        const starLightStyle = {
            padding: 0,
            border: "none",
            borderTop: "solid 5px",
            textAlign: "center",
            maxWidth: 250,
            margin: "25px auto 30px",
            borderColor: "white"
        };

        const containerStyle = {
            textAlign: "center",
            background: "#18BC9C",
            color: "white",
            marginTop: -20,
            marginBottom: -20,
            paddingTop: 60,
            paddingBottom: 50
        };

        const imgStyle = {
            display: "block",
            margin: "0 auto 20px"
        };

        const introTextNameStyle = {
            display: "block",
            fontWeight: "700",
            fontSize: "3em"
        };

        const introTextSkillsStyle = {
            fontSize: "1.25em",
            fontWeight: "300"
        };

        return <div className="container-fluid" style={containerStyle}>
            <div className="row">
                <div className="col-lg-12">
                    <img className="img-responsive" src="../img/profile.png" alt="" style={imgStyle}/>
                    <div className="intro-text">
                        <span className="name" style={introTextNameStyle}>Start to solve your first problem</span>
                        <hr className="star-light" style={starLightStyle}/>
                        <span className="skills" style={introTextSkillsStyle}>Software Engineer - Problem Solver - Java Hacker</span>
                    </div>
                    <Link to="/problems" className="btn btn-lg btn-outline">
                        <i className="fa fa-bars"> </i>  Learn More
                    </Link>
                </div>
            </div>
        </div>;
    }
}