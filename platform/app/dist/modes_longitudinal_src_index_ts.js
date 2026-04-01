"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_longitudinal_src_index_ts"],{

/***/ "../../../modes/longitudinal/src/id.js"
/*!*********************************************!*\
  !*** ../../../modes/longitudinal/src/id.js ***!
  \*********************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/longitudinal/package.json");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ },

/***/ "../../../modes/longitudinal/src/index.ts"
/*!************************************************!*\
  !*** ../../../modes/longitudinal/src/index.ts ***!
  \************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   extensionDependencies: () => (/* binding */ extensionDependencies),
/* harmony export */   initToolGroups: () => (/* reexport safe */ _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.initToolGroups),
/* harmony export */   longitudinalInstance: () => (/* binding */ longitudinalInstance),
/* harmony export */   longitudinalRoute: () => (/* binding */ longitudinalRoute),
/* harmony export */   modeInstance: () => (/* binding */ modeInstance),
/* harmony export */   toolbarButtons: () => (/* reexport safe */ _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.toolbarButtons),
/* harmony export */   tracked: () => (/* binding */ tracked)
/* harmony export */ });
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id */ "../../../modes/longitudinal/src/id.js");
/* harmony import */ var _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/mode-basic */ "../../../modes/basic/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const tracked = {
  measurements: '@ohif/extension-measurement-tracking.panelModule.trackedMeasurements',
  thumbnailList: '@ohif/extension-measurement-tracking.panelModule.seriesList',
  viewport: '@ohif/extension-measurement-tracking.viewportModule.cornerstone-tracked'
};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  ..._ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.extensionDependencies,
  '@ohif/extension-measurement-tracking': '^3.0.0'
};
const longitudinalInstance = {
  ..._ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.basicLayout,
  id: _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.ohif.layout,
  props: {
    ..._ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.basicLayout.props,
    leftPanels: [tracked.thumbnailList],
    rightPanels: [_ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.cornerstone.segmentation, tracked.measurements],
    viewports: [{
      namespace: tracked.viewport,
      // Re-use the display sets from basic
      displaySetsToDisplay: _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.basicLayout.props.viewports[0].displaySetsToDisplay
    }, ..._ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.basicLayout.props.viewports]
  }
};
const longitudinalRoute = {
  ..._ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.basicRoute,
  path: 'longitudinal',
  /*init: ({ servicesManager, extensionManager }) => {
    //defaultViewerRouteInit
  },*/
  layoutInstance: longitudinalInstance
};
const modeInstance = {
  ..._ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.modeInstance,
  // TODO: We're using this as a route segment
  // We should not be.
  id: _id__WEBPACK_IMPORTED_MODULE_1__.id,
  routeName: 'viewer',
  displayName: i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t('Modes:Basic Viewer'),
  routes: [longitudinalRoute],
  extensions: extensionDependencies
};
const mode = {
  ..._ohif_mode_basic__WEBPACK_IMPORTED_MODULE_2__.mode,
  id: _id__WEBPACK_IMPORTED_MODULE_1__.id,
  modeInstance,
  extensionDependencies
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mode);


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ },

/***/ "../../../modes/longitudinal/package.json"
/*!************************************************!*\
  !*** ../../../modes/longitudinal/package.json ***!
  \************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/mode-longitudinal","version":"3.13.0-beta.20","description":"Longitudinal Workflow","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-longitudinal.js","module":"src/index.ts","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"keywords":["ohif-mode"],"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.13.0-beta.20","@ohif/extension-cornerstone":"3.13.0-beta.20","@ohif/extension-cornerstone-dicom-rt":"3.13.0-beta.20","@ohif/extension-cornerstone-dicom-seg":"3.13.0-beta.20","@ohif/extension-cornerstone-dicom-sr":"3.13.0-beta.20","@ohif/extension-default":"3.13.0-beta.20","@ohif/extension-dicom-pdf":"3.13.0-beta.20","@ohif/extension-dicom-video":"3.13.0-beta.20","@ohif/extension-measurement-tracking":"3.13.0-beta.20","@ohif/mode-basic":"3.13.0-beta.20"},"dependencies":{"@babel/runtime":"7.28.2","i18next":"17.3.1"},"devDependencies":{"webpack":"5.105.0","webpack-merge":"5.10.0"}}');

/***/ }

}]);
//# sourceMappingURL=modes_longitudinal_src_index_ts.js.map