import * as React from "react";
import {Col, Grid} from "react-bootstrap";

interface ProfileNotFoundProps {
    username: string
}

const ProfileNotFound = (props: ProfileNotFoundProps) => {
    return <Grid>
        <Col mdOffset={3} md={6}>
            <h2>Profile not found</h2>
            <p>Profile: {props.username}</p>
        </Col>
    </Grid>
};

export default ProfileNotFound;