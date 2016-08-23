'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

var _Markdown = require('remarkable');

var _Markdown2 = _interopRequireDefault(_Markdown);

'use strict';

var Remarkable = _React2['default'].createClass({
  displayName: 'Remarkable',

  getDefaultProps: function getDefaultProps() {
    return {
      container: 'div',
      options: {} };
  },

  render: function render() {
    var Container = this.props.container;

    return _React2['default'].createElement(
      Container,
      null,
      this.content()
    );
  },

  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (nextProps.options !== this.props.options) {
      this.md = new _Markdown2['default'](nextProps.options);
    }
  },

  content: function content() {
    var _this = this;

    if (this.props.source) {
      return _React2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: this.renderMarkdown(this.props.source) } });
    } else {
      return _React2['default'].Children.map(this.props.children, function (child) {
        if (typeof child === 'string') {
          return _React2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: _this.renderMarkdown(child) } });
        } else {
          return child;
        }
      });
    }
  },

  renderMarkdown: function renderMarkdown(source) {
    if (!this.md) {
      this.md = new _Markdown2['default'](this.props.options);
    }

    return this.md.render(source);
  }

});

exports['default'] = Remarkable;
module.exports = exports['default'];