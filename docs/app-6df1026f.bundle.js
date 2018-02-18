webpackJsonp([2],{

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = _interopRequireDefault(__webpack_require__(3));

var _reactDom = _interopRequireDefault(__webpack_require__(63));

var _reactRouterDom = __webpack_require__(70);

var _components = __webpack_require__(240);

__webpack_require__(243);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom.default.render(_react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_components.App, {
  name: "This Is My Component"
})), document.getElementById('root'));

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "App", {
  enumerable: true,
  get: function get() {
    return _App.default;
  }
});

var _App = _interopRequireDefault(__webpack_require__(241));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(3));

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _App = _interopRequireDefault(__webpack_require__(242));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var name = _ref.name;
  return _react.default.createElement("div", {
    className: _App.default.flex
  }, _react.default.createElement("h1", {
    className: _App.default.words
  }, name));
};

App.propTypes = {
  name: _propTypes.default.string
};
App.defaultProps = {
  name: 'Hello Everyone!!'
};
var _default = App;
exports.default = _default;

/***/ }),

/***/ 242:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"flex":"-App-flex-A-IeVD-","words":"-App-words-2XTgD6-"};

/***/ }),

/***/ 243:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[239]);
//# sourceMappingURL=app-6df1026f.bundle.js.map