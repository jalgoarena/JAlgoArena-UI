import * as React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';

import FontAwesome from '../components/FontAwesome';
import profile from '../../assets/img/profile.png';
import {connect} from "react-redux";
import {CSSProperties} from "react";

const starLightStyle: CSSProperties = {
    padding: 0,
    border: "none",
    borderTop: "solid 5px",
    textAlign: "center",
    maxWidth: 250,
    margin: "25px auto 30px",
    borderColor: "white"
};

const containerStyle: CSSProperties = {
    textAlign: "center",
    background: "#18BC9C",
    color: "white",
    marginTop: -20,
    marginBottom: -20,
    paddingTop: 60,
    paddingBottom: 50
};

const imgStyle: CSSProperties = {
    display: "block",
    margin: "0 auto 20px"
};

const introTextNameStyle: CSSProperties = {
    display: "block",
    fontWeight: 500,
    fontSize: "3em"
};

const introTextSkillsStyle: CSSProperties = {
    fontSize: "1.25em",
    fontWeight: 300
};

export const Home = (props: {title: string}) => {
    return (
        <Grid fluid={true} style={containerStyle}>
            <Row>
                <Col lg={12}>
                    <img className="img-responsive" src={profile} alt="" style={imgStyle}/>
                    <div className="intro-text">
                        <span className="name" style={introTextNameStyle}>{props.title}</span>
                        <hr className="star-light" style={starLightStyle}/>
                        <span className="skills" style={introTextSkillsStyle}>Software Engineer - Problem Solver - Algo Hacker</span>
                    </div>
                    <Link to="/problems" className="btn btn-lg btn-outline">
                        <FontAwesome prefix="fas" name="bars"/> Learn More
                    </Link>
                </Col>
            </Row>
        </Grid>
    );
};

const mapStateToProps = (state: {config: {title: string}}) => {
    return {
        title: state.config.title
    };
};

const HomePage = connect(
    mapStateToProps
)(Home);

export {HomePage};