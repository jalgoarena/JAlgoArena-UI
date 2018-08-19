import * as React from 'react';
import {Col} from "react-bootstrap";
import CalendarHeatmap from 'react-calendar-heatmap';
import * as Highcharts from 'highcharts';
// @ts-ignore
import HighchartsReact from 'highcharts-react-official';
import {Link} from "react-router-dom";

import {User} from "../domain/User";

let githubClassForValue = (value: { count: number }) => {
    if (!value || value.count === 0) {
        return 'color-github-0';
    }

    if (value.count <= 12) {
        return 'color-github-1';
    }

    if (value.count <= 24) {
        return 'color-github-2';
    }

    if (value.count <= 36) {
        return 'color-github-3';
    }

    return 'color-github-4';
};

let titleForValue = (value: { count: number, date: string }) => {
    return value ? `${value.count} submissions on ${value.date}` : `0 submissions`;
};

let solvedProblems = (user: User, userStats: { solved: Array<string> } | null | undefined) => {
    if (!(userStats && userStats.solved.length > 0)) {
        return <h4 className="text-center" style={{"color": "#979faf"}}>
            {user.username} has not solved any problems yet
        </h4>;
    }

    return userStats.solved.map((problemId, idx) => {
        return <Link to={"/problem/" + problemId} className="btn btn-info" key={idx} style={{"margin": "4px"}}>
            {problemId}
        </Link>
    });
};

let highchartSolvedProblems = (user: User, userStats: any, rankingStartDate: string) => {
    let rankingStartDateParts = rankingStartDate.split('-');
    let solvedProblemsCountPerDay = [
        [Date.UTC(Number(rankingStartDateParts[0]), Number(rankingStartDateParts[1]) - 1, Number(rankingStartDateParts[2])), 0]
    ];

    if (userStats) {
        let sum = 0;
        Object.keys(userStats.solvedProblemsPerDay).forEach(date => {
            let count = userStats.solvedProblemsPerDay[date].length;
            let dateParts: Array<string> = date.split("-");
            solvedProblemsCountPerDay.push(
                [Date.UTC(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2])), count + sum]
            );
            sum += count;
        });
    }


    if (solvedProblemsCountPerDay.length === 0) {
        return <h4 className="text-center" style={{"color": "#979faf"}}>
            {user.username} has not solved any problems yet
        </h4>;
    }


    let highchartsOptions = {
        title: {
            text: 'Solved Problems'
        },
        subtitle: {
            text: 'Show amount of solved problems till the date (including)'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Time'
            }
        },
        yAxis: {
            title: {
                text: 'Solved'
            }
        },
        series: [{
            name: "Solved problems",
            data: solvedProblemsCountPerDay
        }]
    };

    return <HighchartsReact
        highcharts={Highcharts}
        options={highchartsOptions}
    />;
};

let submissionsCountPerDay = (userStats: { submissions: any } | undefined | null) => {
    let submissionsCountPerDay: Array<{ date: string, count: number }> = [];

    if (userStats) {
        Object.keys(userStats.submissions).forEach(date => {
            submissionsCountPerDay.push({date, count: userStats.submissions[date]})
        });
    }
    return submissionsCountPerDay;
};

interface UserStatsProps {
    user: User
    userStats: { solved: Array<string>, submissions: any } | null | undefined
    startDate: Date
    endDate: Date
    rankingStartDate: string
}

const UserStats = (props: UserStatsProps) => {
    return <Col md={9}>
        <h4>Solved Problems</h4>
        <hr/>
        {solvedProblems(props.user, props.userStats)}
        <br/><br/>
        <h4>Rating</h4>
        <hr/>
        {highchartSolvedProblems(props.user, props.userStats, props.rankingStartDate)}
        <br/><br/>
        <h4>Submissions</h4>
        <hr/>
        <CalendarHeatmap
            startDate={props.startDate}
            endDate={props.endDate}
            values={submissionsCountPerDay(props.userStats)}
            classForValue={githubClassForValue}
            titleForValue={titleForValue}
            tooltipDataAttrs={{'data-toggle': 'tooltip'}}
        />
    </Col>
};

export default UserStats;