import * as React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';


export const CodeOfConductPage = () => (
    <Grid>
        <Row>
            <Col mdOffset={2} md={8}>
                <h2>Code Of Conduct</h2>
                <p>
                    To make this content fun it has to follow particular rules which make it fair for all participants.
                </p>
            </Col>
        </Row>
        <Row>
            <Col mdOffset={2} lg={8}>
                <h3>Honor Code</h3>
                <p>You need to follow JAlgoArena’s Honor Code to uphold JAlgoArena's standard of contest integrity:</p>
                <ul>
                    <li>Register for only one account. Your account is linked to your email address. If you register on
                        our site with more than one email address, you are registering for more than one account. If you
                        have already registered for two accounts, please contact administrators.
                    </li>
                    <li>Your solutions to problems must be your own work - do not copy it from internet nor your
                        colleagues solutions.
                    </li>
                    <li>You may not share your solutions with anyone else unless explicitly permitted by the
                        administrator.
                    </li>
                    <li>You may not engage in any other activities that will dishonestly improve your results or
                        dishonestly improve or damage the results of others.
                    </li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col mdOffset={2} lg={8}>
                <h3>Plagiarism</h3>
                <p>Plagiarism is when you copy solutions or parts of it from another source without
                    giving credit. Plagiarism is unacceptable in JAlgoArena, and is a serious
                    violation of JAlgoArena's Honor Code.</p>
                <p>If some or all of your assignment is identified as plagiarism, you may lose all credit you
                    received for your solution. It may result with account removal and further actions.</p>
            </Col>
        </Row>
    </Grid>
);