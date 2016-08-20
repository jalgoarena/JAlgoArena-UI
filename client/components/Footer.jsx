import React from "react";
import {Grid, Col} from 'react-bootstrap';
import FontAwesome from './FontAwesome';

const footerLogoStyle = {
    height: 50,
    marginBottom: 15
};

const Footer = () => (
    <footer className="footer">
        <hr/>
        <Grid>
            <Col md={5}>
                <span><FontAwesome name="copyright"/> Jacek Spólnik 2016</span>
            </Col>
            <Col md={7}>
                <img src="img/logo.png" className="img-responsive" style={footerLogoStyle}/>
            </Col>
        </Grid>
    </footer>
);

export default Footer;
