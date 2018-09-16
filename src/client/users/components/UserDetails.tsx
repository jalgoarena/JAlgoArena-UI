import * as React from 'react';
import {Col, Well} from "react-bootstrap";
import FontAwesome from "../../common/components/FontAwesome";
// @ts-ignore
import Blockies from 'react-blockies';
import {User} from "../domain/User";

interface UserDetailsProps {
    user: User
    score: number
}

const UserDetails = (props: UserDetailsProps) =>
    <Col md={3}>
        <Blockies
            seed={props.user.email}
            size={5}
            scale={40}
            color="#18bc9c"
            bgColor="#e1e4e8"
            spotColor="#18bc9c"
        />
        <h2>{props.user.firstname} {props.user.surname}</h2>
        <h4 style={{"color": "#979faf"}}>(@{props.user.username})</h4>
        <hr/>
        <Well bsSize="small">
            <h4 className="text-center"><FontAwesome prefix="fas" name="trophy"/> {props.score}</h4>
        </Well>
        <Well bsSize="small">
            <h4 className="text-center"><FontAwesome prefix="fas" name="globe"/> {props.user.region}</h4>
        </Well>
        <Well bsSize="small">
            <h4 className="text-center"><FontAwesome prefix="fas" name="users"/> {props.user.team}</h4>
        </Well>
    </Col>;

export default UserDetails;