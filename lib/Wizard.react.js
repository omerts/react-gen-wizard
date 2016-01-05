'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _pathval = require('pathval');

var _pathval2 = _interopRequireDefault(_pathval);

var Wizard = (function (_React$Component) {
  _inherits(Wizard, _React$Component);

  function Wizard(props) {
    _classCallCheck(this, Wizard);

    _get(Object.getPrototypeOf(Wizard.prototype), 'constructor', this).call(this, props);
    this._originalData = props.initialData || {};

    this.state = { currentComponentIndex: 0,
      maxComponentIndexReached: 0,
      data: this._originalData };
  }

  _createClass(Wizard, [{
    key: '_breadcrumbClicked',
    value: function _breadcrumbClicked(index) {
      this.state.currentComponentIndex = index;
      this.setState(this.state);
    }
  }, {
    key: '_getComponentsBreadcrumbs',
    value: function _getComponentsBreadcrumbs() {
      var _this = this;

      return this.props.components.slice(0, this.state.maxComponentIndexReached + 1).map((function (component, index) {
        var className = _this.props.components[_this.state.currentComponentIndex] === component ? 'active' : 'inactive';

        var title = component.breadcrumbNamePath && _pathval2['default'].get(_this.state, component.breadcrumbNamePath) || component.name;

        return _react2['default'].createElement(
          'li',
          { key: component.name, className: className,
            onClick: _this._breadcrumbClicked.bind(_this, index) },
          title
        );
      }).bind(this));
    }
  }, {
    key: 'onNextEnded',
    value: function onNextEnded(data) {
      if (this.state.currentComponentIndex === this.props.components.length - 1) {
        this.state = { currentComponentIndex: 0,
          maxComponentIndexReached: 0,
          data: this._originalData };
        this.props.onFinish(this.state.data);
        this.setState(this.state);
      } else {
        this.state.currentComponentIndex++;
        this.state.maxComponentIndexReached++;
        this.state.data = data;
        this.setState(this.state);
      }
    }
  }, {
    key: 'onPrevEnded',
    value: function onPrevEnded(data) {
      this.state.currentComponentIndex--;
      this.state.data = data;
      this.setState(this.state);
    }
  }, {
    key: '_callOnNext',
    value: function _callOnNext() {
      this.refs.currentComponent.onNext();
    }
  }, {
    key: '_callOnPrev',
    value: function _callOnPrev() {
      this.refs.currentComponent.onPrev();
    }
  }, {
    key: 'render',
    value: function render() {
      var nextClass = 'fa fa-';
      nextClass += this.state.currentComponentIndex !== this.props.components.length - 1 ? 'arrow-right' : 'paper-plane';

      var currentActiveItem = this.props.components[this.state.currentComponentIndex];

      var currentComponent = _react2['default'].createElement(this.props.components[this.state.currentComponentIndex].component, Object.assign(this.props.components[this.state.currentComponentIndex].additionalProps || {}, { onNextEnded: this.onNextEnded.bind(this),
        onPrevEnded: this.onPrevEnded.bind(this),
        data: this.state.data,
        ref: 'currentComponent' }));

      return _react2['default'].createElement(
        'div',
        { className: 'react-gen-wizard' },
        _react2['default'].createElement(
          'ul',
          { className: 'breadcrumbs' },
          this._getComponentsBreadcrumbs()
        ),
        _react2['default'].createElement(
          'h3',
          { className: 'component-title' },
          currentActiveItem.name
        ),
        _react2['default'].createElement(
          'div',
          { className: 'component-wrapper' },
          _react2['default'].createElement(
            'div',
            { className: 'current-component' },
            currentComponent
          ),
          (currentActiveItem.showButtons === undefined || // If undefined default to true
          currentActiveItem.showButtons) && _react2['default'].createElement(
            'div',
            { className: 'buttons' },
            this.state.currentComponentIndex !== 0 && _react2['default'].createElement(_materialUi.IconButton, { className: 'icon-prev',
              iconClassName: 'fa fa-arrow-left',
              mini: true,
              onClick: this._callOnPrev.bind(this) }),
            _react2['default'].createElement(_materialUi.IconButton, { className: 'icon-next',
              iconClassName: nextClass,
              mini: true,
              onClick: this._callOnNext.bind(this) })
          )
        )
      );
    }
  }]);

  return Wizard;
})(_react2['default'].Component);

exports['default'] = Wizard;

Wizard.propTypes = {
  components: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
    name: _react2['default'].PropTypes.string.isRequired,
    component: _react2['default'].PropTypes.func.isRequired,
    showButtons: _react2['default'].PropTypes.bool,
    additionalProps: _react2['default'].PropTypes.object,
    breadcrumbNamePath: _react2['default'].PropTypes.string
  })).isRequired,
  onFinish: _react2['default'].PropTypes.func.isRequired,
  initialData: _react2['default'].PropTypes.object
};
module.exports = exports['default'];