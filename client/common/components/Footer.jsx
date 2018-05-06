// @flow

import React from "react";
import {Grid, Col} from 'react-bootstrap';
import logo from '../../assets/img/logo.png';

const footerLogoStyle = {
    height: 50,
    marginBottom: 15
};

const Footer = () => (
    <footer className="footer">
        <hr/>
        <Grid>
            <Col md={5}>
                <span>Created by Jacek Spólnik 2018</span>
            </Col>
            <Col md={7}>
                <img src={logo} className="img-responsive" style={footerLogoStyle}/>
            </Col>
        </Grid>
    </footer>
);

export default Footer;
