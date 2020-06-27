"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDraggable = require("react-draggable");

var _reactResizable = require("react-resizable");

var _utils = require("./utils");

var _calculateUtils = require("./calculateUtils");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An individual item within a ReactGridLayout.
 */
var GridItem = /*#__PURE__*/function (_React$Component) {
  _inherits(GridItem, _React$Component);

  var _super = _createSuper(GridItem);

  function GridItem() {
    var _this;

    _classCallCheck(this, GridItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      resizing: null,
      dragging: null,
      className: ""
    });

    _defineProperty(_assertThisInitialized(_this), "currentNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (e
    /*: Event*/
    , _ref) {
      var node = _ref.node;
      if (!_this.props.onDragStart) return;
      var newPosition
      /*: PartialPosition*/
      = {
        top: 0,
        left: 0
      }; // TODO: this wont work on nested parents

      var offsetParent = node.offsetParent;
      if (!offsetParent) return;
      var parentRect = offsetParent.getBoundingClientRect();
      var clientRect = node.getBoundingClientRect();
      var cLeft = clientRect.left / _this.props.transformScale;
      var pLeft = parentRect.left / _this.props.transformScale;
      var cTop = clientRect.top / _this.props.transformScale;
      var pTop = parentRect.top / _this.props.transformScale;
      newPosition.left = cLeft - pLeft + offsetParent.scrollLeft;
      newPosition.top = cTop - pTop + offsetParent.scrollTop;

      _this.setState({
        dragging: newPosition
      });

      var _calcXY = (0, _calculateUtils.calcXY)(_this.getPositionParams(), newPosition.top, newPosition.left, _this.props.w, _this.props.h),
          x = _calcXY.x,
          y = _calcXY.y;

      return _this.props.onDragStart && _this.props.onDragStart.call(_assertThisInitialized(_this), _this.props.i, x, y, {
        e: e,
        node: node,
        newPosition: newPosition
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDrag", function (e
    /*: Event*/
    , _ref2) {
      var node = _ref2.node,
          deltaX = _ref2.deltaX,
          deltaY = _ref2.deltaY;
      var _this$props = _this.props,
          onDrag = _this$props.onDrag,
          transformScale = _this$props.transformScale;
      if (!onDrag) return;
      deltaX /= transformScale;
      deltaY /= transformScale;
      var newPosition
      /*: PartialPosition*/
      = {
        top: 0,
        left: 0
      };
      if (!_this.state.dragging) throw new Error("onDrag called before onDragStart.");
      newPosition.left = _this.state.dragging.left + deltaX;
      newPosition.top = _this.state.dragging.top + deltaY;

      _this.setState({
        dragging: newPosition
      });

      var _calcXY2 = (0, _calculateUtils.calcXY)(_this.getPositionParams(), newPosition.top, newPosition.left, _this.props.w, _this.props.h),
          x = _calcXY2.x,
          y = _calcXY2.y;

      return onDrag && onDrag.call(_assertThisInitialized(_this), _this.props.i, x, y, {
        e: e,
        node: node,
        newPosition: newPosition
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStop", function (e
    /*: Event*/
    , _ref3) {
      var node = _ref3.node;
      if (!_this.props.onDragStop) return;
      var newPosition
      /*: PartialPosition*/
      = {
        top: 0,
        left: 0
      };
      if (!_this.state.dragging) throw new Error("onDragEnd called before onDragStart.");
      newPosition.left = _this.state.dragging.left;
      newPosition.top = _this.state.dragging.top;

      _this.setState({
        dragging: null
      });

      var _calcXY3 = (0, _calculateUtils.calcXY)(_this.getPositionParams(), newPosition.top, newPosition.left, _this.props.w, _this.props.h),
          x = _calcXY3.x,
          y = _calcXY3.y;

      return _this.props.onDragStop && _this.props.onDragStop.call(_assertThisInitialized(_this), _this.props.i, x, y, {
        e: e,
        node: node,
        newPosition: newPosition
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onResizeStop", function (e
    /*: Event*/
    , callbackData
    /*: { node: HTMLElement, size: Position }*/
    ) {
      _this.onResizeHandler(e, callbackData, "onResizeStop");
    });

    _defineProperty(_assertThisInitialized(_this), "onResizeStart", function (e
    /*: Event*/
    , callbackData
    /*: { node: HTMLElement, size: Position }*/
    ) {
      _this.onResizeHandler(e, callbackData, "onResizeStart");
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function (e
    /*: Event*/
    , callbackData
    /*: { node: HTMLElement, size: Position }*/
    ) {
      _this.onResizeHandler(e, callbackData, "onResize");
    });

    return _this;
  }

  _createClass(GridItem, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps
    /*: Props*/
    , nextState
    /*: State*/
    ) {
      // We can't deeply compare children. If the developer memoizes them, we can
      // use this optimization.
      if (this.props.children !== nextProps.children) return true;
      if (this.props.droppingPosition !== nextProps.droppingPosition) return true; // TODO memoize these calculations so they don't take so long?

      var oldPosition = (0, _calculateUtils.calcGridItemPosition)(this.getPositionParams(this.props), this.props.x, this.props.y, this.props.w, this.props.h, this.state);
      var newPosition = (0, _calculateUtils.calcGridItemPosition)(this.getPositionParams(nextProps), nextProps.x, nextProps.y, nextProps.w, nextProps.h, nextState);
      return !(0, _utils.fastPositionEqual)(oldPosition, newPosition) || this.props.useCSSTransforms !== nextProps.useCSSTransforms;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.moveDroppingItem({});
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps
    /*: Props*/
    ) {
      this.moveDroppingItem(prevProps);
    } // When a droppingPosition is present, this means we should fire a move event, as if we had moved
    // this element by `x, y` pixels.

  }, {
    key: "moveDroppingItem",
    value: function moveDroppingItem(prevProps
    /*: Props*/
    ) {
      var droppingPosition = this.props.droppingPosition;
      if (!droppingPosition) return;
      var prevDroppingPosition = prevProps.droppingPosition || {
        left: 0,
        top: 0
      };
      var dragging = this.state.dragging;

      if (!this.currentNode) {
        // eslint-disable-next-line react/no-find-dom-node
        this.currentNode = ((_reactDom.default.findDOMNode(this)
        /*: any*/
        )
        /*: HTMLElement*/
        );
      }

      var shouldDrag = dragging && droppingPosition.left !== prevDroppingPosition.left || droppingPosition.top !== prevDroppingPosition.top;

      if (!dragging) {
        this.onDragStart(droppingPosition.e, {
          node: this.currentNode,
          deltaX: droppingPosition.left,
          deltaY: droppingPosition.top
        });
      } else if (shouldDrag) {
        var deltaX = droppingPosition.left - dragging.left;
        var deltaY = droppingPosition.top - dragging.top;
        this.onDrag(droppingPosition.e, {
          node: this.currentNode,
          deltaX: deltaX,
          deltaY: deltaY
        });
      }
    }
  }, {
    key: "getPositionParams",
    value: function getPositionParams()
    /*: PositionParams*/
    {
      var props
      /*: Props*/
      = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return {
        cols: props.cols,
        containerPadding: props.containerPadding,
        containerWidth: props.containerWidth,
        margin: props.margin,
        maxRows: props.maxRows,
        rowHeight: props.rowHeight
      };
    }
    /**
     * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
     * well when server rendering, and the only way to do that properly is to use percentage width/left because
     * we don't know exactly what the browser viewport is.
     * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
     * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
     *
     * @param  {Object} pos Position object with width, height, left, top.
     * @return {Object}     Style object.
     */

  }, {
    key: "createStyle",
    value: function createStyle(pos
    /*: Position*/
    )
    /*: { [key: string]: ?string }*/
    {
      var _this$props2 = this.props,
          usePercentages = _this$props2.usePercentages,
          containerWidth = _this$props2.containerWidth,
          useCSSTransforms = _this$props2.useCSSTransforms;
      var style; // CSS Transforms support (default)

      if (useCSSTransforms) {
        style = (0, _utils.setTransform)(pos);
      } else {
        // top,left (slow)
        style = (0, _utils.setTopLeft)(pos); // This is used for server rendering.

        if (usePercentages) {
          style.left = (0, _utils.perc)(pos.left / containerWidth);
          style.width = (0, _utils.perc)(pos.width / containerWidth);
        }
      }

      return style;
    }
    /**
     * Mix a Draggable instance into a child.
     * @param  {Element} child    Child element.
     * @return {Element}          Child wrapped in Draggable.
     */

  }, {
    key: "mixinDraggable",
    value: function mixinDraggable(child
    /*: ReactElement<any>*/
    , isDraggable
    /*: boolean*/
    )
    /*: ReactElement<any>*/
    {
      return /*#__PURE__*/_react.default.createElement(_reactDraggable.DraggableCore, {
        disabled: !isDraggable,
        onStart: this.onDragStart,
        onDrag: this.onDrag,
        onStop: this.onDragStop,
        handle: this.props.handle,
        cancel: ".react-resizable-handle" + (this.props.cancel ? "," + this.props.cancel : ""),
        scale: this.props.transformScale,
        grid: [192.8, 18],
        bounds: ".container"
      }, child);
    }
    /**
     * Mix a Resizable instance into a child.
     * @param  {Element} child    Child element.
     * @param  {Object} position  Position object (pixel values)
     * @return {Element}          Child wrapped in Resizable.
     */

  }, {
    key: "mixinResizable",
    value: function mixinResizable(child
    /*: ReactElement<any>*/
    , position
    /*: Position*/
    , isResizable
    /*: boolean*/
    )
    /*: ReactElement<any>*/
    {
      var _this$props3 = this.props,
          cols = _this$props3.cols,
          x = _this$props3.x,
          minW = _this$props3.minW,
          minH = _this$props3.minH,
          maxW = _this$props3.maxW,
          maxH = _this$props3.maxH,
          transformScale = _this$props3.transformScale;
      var positionParams = this.getPositionParams(); // This is the max possible width - doesn't go to infinity because of the width of the window

      var maxWidth = (0, _calculateUtils.calcGridItemPosition)(positionParams, 0, 0, cols - x, 0).width; // Calculate min/max constraints using our min & maxes

      var mins = (0, _calculateUtils.calcGridItemPosition)(positionParams, 0, 0, minW, minH);
      var maxes = (0, _calculateUtils.calcGridItemPosition)(positionParams, 0, 0, maxW, maxH);
      var minConstraints = [mins.width, mins.height];
      var maxConstraints = [Math.min(maxes.width, maxWidth), Math.min(maxes.height, Infinity)];
      return /*#__PURE__*/_react.default.createElement(_reactResizable.Resizable, {
        draggableOpts: {
          disabled: !isResizable,
          grid: [192.8, 18]
        },
        className: isResizable ? undefined : "react-resizable-hide",
        width: position.width,
        height: position.height,
        minConstraints: minConstraints,
        maxConstraints: maxConstraints,
        onResizeStop: this.onResizeStop,
        onResizeStart: this.onResizeStart,
        onResize: this.onResize,
        transformScale: transformScale
      }, child);
    }
    /**
     * onDragStart event handler
     * @param  {Event}  e             event data
     * @param  {Object} callbackData  an object with node, delta and position information
     */

  }, {
    key: "onResizeHandler",

    /**
     * Wrapper around drag events to provide more useful data.
     * All drag events call the function with the given handler name,
     * with the signature (index, x, y).
     *
     * @param  {String} handlerName Handler name to wrap.
     * @return {Function}           Handler function.
     */
    value: function onResizeHandler(e
    /*: Event*/
    , _ref4, handlerName
    /*: string*/
    ) {
      var node = _ref4.node,
          size = _ref4.size;
      var handler = this.props[handlerName];
      if (!handler) return;
      var _this$props4 = this.props,
          cols = _this$props4.cols,
          x = _this$props4.x,
          y = _this$props4.y,
          i = _this$props4.i,
          maxW = _this$props4.maxW,
          minW = _this$props4.minW,
          maxH = _this$props4.maxH,
          minH = _this$props4.minH; // Get new XY

      var _calcWH = (0, _calculateUtils.calcWH)(this.getPositionParams(), size.width, size.height, x, y),
          w = _calcWH.w,
          h = _calcWH.h; // Cap w at numCols


      w = Math.min(w, cols - x); // Ensure w is at least 1

      w = Math.max(w, 1); // Min/max capping

      w = Math.max(Math.min(w, maxW), minW);
      h = Math.max(Math.min(h, maxH), minH);
      this.setState({
        resizing: handlerName === "onResizeStop" ? null : size
      });
      handler.call(this, i, w, h, {
        e: e,
        node: node,
        size: size
      });
    }
  }, {
    key: "render",
    value: function render()
    /*: ReactNode*/
    {
      var _this$props5 = this.props,
          x = _this$props5.x,
          y = _this$props5.y,
          w = _this$props5.w,
          h = _this$props5.h,
          isDraggable = _this$props5.isDraggable,
          isResizable = _this$props5.isResizable,
          droppingPosition = _this$props5.droppingPosition,
          useCSSTransforms = _this$props5.useCSSTransforms;
      var pos = (0, _calculateUtils.calcGridItemPosition)(this.getPositionParams(), x, y, w, h, this.state);

      var child = _react.default.Children.only(this.props.children); // Create the child element. We clone the existing element but modify its className and style.


      var newChild = /*#__PURE__*/_react.default.cloneElement(child, {
        className: (0, _classnames.default)("react-grid-item", child.props.className, this.props.className, {
          static: this.props.static,
          resizing: Boolean(this.state.resizing),
          "react-draggable": isDraggable,
          "react-draggable-dragging": Boolean(this.state.dragging),
          dropping: Boolean(droppingPosition),
          cssTransforms: useCSSTransforms
        }),
        // We can set the width and height on the child, but unfortunately we can't set the position.
        style: _objectSpread(_objectSpread(_objectSpread({}, this.props.style), child.props.style), this.createStyle(pos))
      }); // Resizable support. This is usually on but the user can toggle it off.


      newChild = this.mixinResizable(newChild, pos, isResizable); // Draggable support. This is always on, except for with placeholders.

      newChild = this.mixinDraggable(newChild, isDraggable);
      return newChild;
    }
  }]);

  return GridItem;
}(_react.default.Component);

exports.default = GridItem;

_defineProperty(GridItem, "propTypes", {
  // Children must be only a single element
  children: _propTypes.default.element,
  // General grid attributes
  cols: _propTypes.default.number.isRequired,
  containerWidth: _propTypes.default.number.isRequired,
  rowHeight: _propTypes.default.number.isRequired,
  margin: _propTypes.default.array.isRequired,
  maxRows: _propTypes.default.number.isRequired,
  containerPadding: _propTypes.default.array.isRequired,
  // These are all in grid units
  x: _propTypes.default.number.isRequired,
  y: _propTypes.default.number.isRequired,
  w: _propTypes.default.number.isRequired,
  h: _propTypes.default.number.isRequired,
  // All optional
  minW: function minW(props
  /*: Props*/
  , propName
  /*: string*/
  ) {
    var value = props[propName];
    if (typeof value !== "number") return new Error("minWidth not Number");
    if (value > props.w || value > props.maxW) return new Error("minWidth larger than item width/maxWidth");
  },
  maxW: function maxW(props
  /*: Props*/
  , propName
  /*: string*/
  ) {
    var value = props[propName];
    if (typeof value !== "number") return new Error("maxWidth not Number");
    if (value < props.w || value < props.minW) return new Error("maxWidth smaller than item width/minWidth");
  },
  minH: function minH(props
  /*: Props*/
  , propName
  /*: string*/
  ) {
    var value = props[propName];
    if (typeof value !== "number") return new Error("minHeight not Number");
    if (value > props.h || value > props.maxH) return new Error("minHeight larger than item height/maxHeight");
  },
  maxH: function maxH(props
  /*: Props*/
  , propName
  /*: string*/
  ) {
    var value = props[propName];
    if (typeof value !== "number") return new Error("maxHeight not Number");
    if (value < props.h || value < props.minH) return new Error("maxHeight smaller than item height/minHeight");
  },
  // ID is nice to have for callbacks
  i: _propTypes.default.string.isRequired,
  // Functions
  onDragStop: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  onResizeStop: _propTypes.default.func,
  onResizeStart: _propTypes.default.func,
  onResize: _propTypes.default.func,
  // Flags
  isDraggable: _propTypes.default.bool.isRequired,
  isResizable: _propTypes.default.bool.isRequired,
  static: _propTypes.default.bool,
  // Use CSS transforms instead of top/left
  useCSSTransforms: _propTypes.default.bool.isRequired,
  transformScale: _propTypes.default.number,
  // Others
  className: _propTypes.default.string,
  // Selector for draggable handle
  handle: _propTypes.default.string,
  // Selector for draggable cancel (see react-draggable)
  cancel: _propTypes.default.string,
  // Current position of a dropping element
  droppingPosition: _propTypes.default.shape({
    e: _propTypes.default.object.isRequired,
    left: _propTypes.default.number.isRequired,
    top: _propTypes.default.number.isRequired
  })
});

_defineProperty(GridItem, "defaultProps", {
  className: "",
  cancel: "",
  handle: "",
  minH: 1,
  minW: 1,
  maxH: Infinity,
  maxW: Infinity,
  transformScale: 1
});