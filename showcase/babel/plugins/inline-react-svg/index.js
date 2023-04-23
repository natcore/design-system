/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-func-assign */
/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;
var _path = require('path');
var _fs = require('fs');
var _parser = require('@babel/parser');
var _helperPluginUtils = require('@babel/helper-plugin-utils');
var _sync = _interopRequireDefault(require('resolve/sync'));
var _optimize = _interopRequireDefault(require('./optimize'));
var _escapeBraces = _interopRequireDefault(require('./escapeBraces'));
var _transformSvg = _interopRequireDefault(require('./transformSvg'));
var _fileExistsWithCaseSync = _interopRequireDefault(require('./fileExistsWithCaseSync'));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
function _typeof(obj) { '@babel/helpers - typeof'; return _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && 'function' == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : 'undefined' != typeof Symbol && arr[Symbol.iterator] || arr['@@iterator']; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i['return'] && (_r = _i['return'](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, 'string'); return _typeof(key) === 'symbol' ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== 'object' || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || 'default'); if (_typeof(res) !== 'object') return res; throw new TypeError('@@toPrimitive must return a primitive value.'); } return (hint === 'string' ? String : Number)(input); }
var ignoreRegex;
var _default = (0, _helperPluginUtils.declare)(function (_ref) {
  var assertVersion = _ref.assertVersion,
    template = _ref.template,
    traverse = _ref.traverse,
    t = _ref.types;
  assertVersion(7);
  var buildSvg = function buildSvg(_ref2) {
    var IS_EXPORT = _ref2.IS_EXPORT,
      EXPORT_FILENAME = _ref2.EXPORT_FILENAME,
      SVG_NAME = _ref2.SVG_NAME,
      SVG_CODE = _ref2.SVG_CODE,
      SVG_DEFAULT_PROPS_CODE = _ref2.SVG_DEFAULT_PROPS_CODE;
    var namedTemplate = '\n      var SVG_NAME = function SVG_NAME(props) { \n'.concat(SVG_DEFAULT_PROPS_CODE ? 'props = Object.assign(SVG_DEFAULT_PROPS_CODE, props);\n' : '').concat('return SVG_CODE; };\n      ').concat(IS_EXPORT ? 'export { SVG_NAME };' : '', '\n    ');
    var anonymousTemplate = '\n      var Component = function (props) {\n'.concat(SVG_DEFAULT_PROPS_CODE ? 'props = Object.assign(SVG_DEFAULT_PROPS_CODE, props);\n' : '').concat('return SVG_CODE; };\n      ').concat("\n      Component.displayName = 'EXPORT_FILENAME';\n      export default Component;\n    ");
    if (SVG_NAME !== 'default') {
      return template(namedTemplate)({
        SVG_NAME: SVG_NAME,
        SVG_CODE: SVG_CODE,
        SVG_DEFAULT_PROPS_CODE: SVG_DEFAULT_PROPS_CODE
      });
    }
    return template(anonymousTemplate)({
      SVG_CODE: SVG_CODE,
      SVG_DEFAULT_PROPS_CODE: SVG_DEFAULT_PROPS_CODE,
      EXPORT_FILENAME: EXPORT_FILENAME
    });
  };
  function applyPlugin(importIdentifier, importPath, path, state, isExport, exportFilename) {
    if (typeof importPath !== 'string') {
      throw new TypeError('`applyPlugin` `importPath` must be a string');
    }
    var _state$opts = state.opts,
      ignorePattern = _state$opts.ignorePattern,
      caseSensitive = _state$opts.caseSensitive,
      providedFilename = _state$opts.filename;
    var file = state.file,
      filename = state.filename;
    var newPath;
    if (ignorePattern) {
      // Only set the ignoreRegex once:
      ignoreRegex = ignoreRegex || new RegExp(ignorePattern);
      // Test if we should ignore this:
      if (ignoreRegex.test(importPath)) {
        return undefined;
      }
    }
    // This plugin only applies for SVGs:
    if ((0, _path.extname)(importPath) === '.svg') {
      var iconPath = filename || providedFilename;
      var svgPath = (0, _sync['default'])(importPath, {
        basedir: (0, _path.dirname)(iconPath),
        preserveSymlinks: true
      });
      if (caseSensitive && !(0, _fileExistsWithCaseSync['default'])(svgPath)) {
        throw new Error("File path didn't match case of file on disk: ".concat(svgPath));
      }
      if (!svgPath) {
        throw new Error('File path does not exist: '.concat(importPath));
      }
      var rawSource = (0, _fs.readFileSync)(svgPath, 'utf8');
      var optimizedSource = state.opts.svgo === false ? {
        data: rawSource
      } : (0, _optimize['default'])(rawSource, _objectSpread(_objectSpread({}, state.opts.svgo), {}, {
        path: svgPath
      }));
      var escapeSvgSource = (0, _escapeBraces['default'])(optimizedSource);
      var parsedSvgAst = (0, _parser.parse)(escapeSvgSource.data, {
        sourceType: 'module',
        plugins: ['jsx']
      });
      traverse(parsedSvgAst, (0, _transformSvg['default'])(t));
      var svgCode = traverse.removeProperties(parsedSvgAst.program.body[0].expression);
      var opts = {
        SVG_NAME: importIdentifier,
        SVG_CODE: svgCode,
        IS_EXPORT: isExport,
        EXPORT_FILENAME: exportFilename
      };

      // Move props off of element and into defaultProps
      if (svgCode.openingElement.attributes.length > 1) {
        var keepProps = [];
        var defaultProps = [];
        svgCode.openingElement.attributes.forEach(function (prop) {
          if (prop.type === 'JSXSpreadAttribute') {
            keepProps.push(prop);
          } else if (prop.value.type === 'JSXExpressionContainer') {
            var objectExpression = t.objectExpression(prop.value.expression.properties);
            defaultProps.push(t.objectProperty(t.identifier(prop.name.name), objectExpression));
          } else {
            defaultProps.push(t.objectProperty(t.identifier(prop.name.name), prop.value));
          }
        });
        svgCode.openingElement.attributes = keepProps;
        opts.SVG_DEFAULT_PROPS_CODE = t.objectExpression(defaultProps);
      }
      var svgReplacement = buildSvg(opts);
      if (opts.SVG_DEFAULT_PROPS_CODE) {
        var _path$replaceWithMult = path.replaceWithMultiple(svgReplacement);
        var _path$replaceWithMult2 = _slicedToArray(_path$replaceWithMult, 1);
        newPath = _path$replaceWithMult2[0];
      } else {
        newPath = path.replaceWith(svgReplacement);
      }
      file.get('ensureReact')();
      file.set('ensureReact', function () {});
    }
    return newPath;
  }
  return {
    visitor: {
      Program: {
        enter: function enter(path, _ref3) {
          var file = _ref3.file,
            opts = _ref3.opts,
            filename = _ref3.filename;
          if (typeof filename === 'string' && typeof opts.filename !== 'undefined') {
            throw new TypeError('the "filename" option may only be provided when transforming code');
          }
          if (typeof filename === 'undefined' && typeof opts.filename !== 'string') {
            throw new TypeError('the "filename" option is required when transforming code');
          }
          if (!path.scope.hasBinding('React')) {
            var reactImportDeclaration = t.importDeclaration([t.importDefaultSpecifier(t.identifier('React'))], t.stringLiteral('react'));
            file.set('ensureReact', function () {
              var _path$unshiftContaine = path.unshiftContainer('body', reactImportDeclaration),
                _path$unshiftContaine2 = _slicedToArray(_path$unshiftContaine, 1),
                newPath = _path$unshiftContaine2[0];
              newPath.get('specifiers').forEach(function (specifier) {
                path.scope.registerBinding('module', specifier);
              });
            });
          } else {
            file.set('ensureReact', function () {});
          }
        }
      },
      CallExpression: function CallExpression(path, state) {
        var node = path.node;
        var requireArg = node.arguments.length > 0 ? node.arguments[0] : null;
        var filePath = t.isStringLiteral(requireArg) ? requireArg.value : null;
        if (node.callee.name === 'require' && t.isVariableDeclarator(path.parent) && filePath) {
          applyPlugin(path.parent.id, filePath, path.parentPath.parentPath, state);
        }
      },
      ImportDeclaration: function ImportDeclaration(path, state) {
        var node = path.node;
        if (node.specifiers.length > 0) {
          applyPlugin(node.specifiers[0].local, node.source.value, path, state);
        }
      },
      ExportNamedDeclaration: function ExportNamedDeclaration(path, state) {
        var node = path.node,
          scope = path.scope;
        if (node.specifiers.length > 0 && node.specifiers[0].local && node.specifiers[0].local.name === 'default') {
          var exportName = node.specifiers[0].exported.name;
          var filename = (0, _path.parse)(node.source.value).name;
          var newPath = applyPlugin(exportName, node.source.value, path, state, true, filename);
          if (newPath) {
            scope.registerDeclaration(newPath);
          }
        }
      }
    }
  };
});
exports['default'] = _default;