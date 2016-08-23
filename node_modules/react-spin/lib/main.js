'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _spin = require('spin.js');

var _spin2 = _interopRequireDefault(_spin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ReactSpinner = _react2.default.createClass({
  displayName: 'ReactSpinner',

  propTypes: {
    config: _react2.default.PropTypes.object,
    stopped: _react2.default.PropTypes.bool
  },

  componentDidMount: function componentDidMount() {
    this.spinner = new _spin2.default(this.props.config);
    if (!this.props.stopped) {
      this.spinner.spin(this.refs.container);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.stopped === true && !this.props.stopped) {
      this.spinner.stop();
    } else if (!newProps.stopped && this.props.stopped === true) {
      this.spinner.spin(this.refs.container);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.spinner.stop();
  },

  render: function render() {
    return _react2.default.createElement('span', { ref: 'container' });
  }
});

exports.default = ReactSpinner;