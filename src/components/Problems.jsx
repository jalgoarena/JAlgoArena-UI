import React from 'react';

export default class Problems extends React.Component {
    render() {
        return <div className="row">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title">Problems</h3>
                    <span className="pull-right clickable"><i className="glyphicon glyphicon-chevron-up"> </i></span>
                </div>
                <div className="panel-body"><div id="problems"></div></div>
            </div>
        </div>;
    }
}