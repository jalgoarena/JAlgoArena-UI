import React from 'react';

export default class Problems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {problems: []};
    }
    componentDidMount() {
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: 'false',
            url: `${this.props.serverUrl}/problems/`,
            crossDomain: true,
            success: (problems) => {
                this.setState({problems: problems});
                $('#problems').children().first().click();
                this.toggle();
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    toggle() {
        let $this = $('.panel-heading span.clickable');

        if(!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    }
    render() {
        let problemNodes = this.state.problems.map((problemId) => {
            return (
                <div className="col-md-3 problem" id={problemId}>
                    <a href="#" className="btn btn-default btn-block">{problemId}</a>
                </div>
            );
        });

        return <div className="row">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title">Problems</h3>
                    <span className="pull-right clickable" onClick={this.toggle}><i className="glyphicon glyphicon-chevron-up"> </i></span>
                </div>
                <div className="panel-body"><div id="problems">
                    {problemNodes}
                </div></div>
            </div>
        </div>;
    }
}