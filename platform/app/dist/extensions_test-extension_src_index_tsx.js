"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_test-extension_src_index_tsx"],{

/***/ "../../../extensions/test-extension/src/custom-attribute/maxNumImageFrames.ts"
/*!************************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-attribute/maxNumImageFrames.ts ***!
  \************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((study, extraData) => Math.max(...(extraData?.displaySets?.map?.(ds => ds.numImageFrames ?? 0) || [0])));

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

/***/ "../../../extensions/test-extension/src/custom-attribute/numberOfDisplaySets.ts"
/*!**************************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-attribute/numberOfDisplaySets.ts ***!
  \**************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((study, extraData) => extraData?.displaySets?.length);

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

/***/ "../../../extensions/test-extension/src/custom-attribute/sameAs.ts"
/*!*************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-attribute/sameAs.ts ***!
  \*************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * This function extracts an attribute from the already matched display sets, and
 * compares it to the attribute in the current display set, and indicates if they match.
 * From 'this', it uses:
 *    `sameAttribute` as the attribute name to look for
 *    `sameDisplaySetId` as the display set id to look for
 * From `options`, it looks for
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(displaySet, options) {
  const {
    sameAttribute,
    sameDisplaySetId
  } = this;
  if (!sameAttribute) {
    console.log('sameAttribute not defined in', this);
    return `sameAttribute not defined in ${this.id}`;
  }
  if (!sameDisplaySetId) {
    console.log('sameDisplaySetId not defined in', this);
    return `sameDisplaySetId not defined in ${this.id}`;
  }
  const {
    displaySetMatchDetails,
    displaySets
  } = options;
  const match = displaySetMatchDetails.get(sameDisplaySetId);
  if (!match) {
    console.log('No match for display set', sameDisplaySetId);
    return false;
  }
  const {
    displaySetInstanceUID
  } = match;
  const altDisplaySet = displaySets.find(it => it.displaySetInstanceUID == displaySetInstanceUID);
  if (!altDisplaySet) {
    console.log('No display set found with', displaySetInstanceUID, 'in', displaySets);
    return false;
  }
  const testValue = altDisplaySet[sameAttribute];
  return testValue === displaySet[sameAttribute];
}

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

/***/ "../../../extensions/test-extension/src/custom-context-menu/codingValues.ts"
/*!**********************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-context-menu/codingValues.ts ***!
  \**********************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Coding values is a map of simple string coding values to a set of
 * attributes associated with the coding value.
 *
 * The simple string is in the format `<codingSchemeDesignator>:<codingValue>`
 * That allows extracting the DICOM attributes from the designator/value, and
 * allows for passing around the simple string.
 * The additional attributes contained in the object include:
 *       * text - this is the coding scheme text display value, and may be language specific
 *       * type - this defines a named type, typically 'site'.  Different names can be used
 *                to allow setting different findingSites values in order to define a hierarchy.
 *       * color - used to apply annotation color
 * It is also possible to define additional attributes here, used by custom
 * extensions.
 *
 * See https://dicom.nema.org/medical/dicom/current/output/html/part16.html
 * for definitions of SCT and other code values.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  codingValues: {
    // Sites
    'SCT:69536005': {
      text: 'Head',
      type: 'site',
      style: {
        color: 'red'
      }
    },
    'SCT:45048000': {
      text: 'Neck',
      type: 'site',
      style: {
        color: 'blue'
      }
    },
    'SCT:818981001': {
      text: 'Abdomen',
      type: 'site',
      style: {
        color: 'orange'
      }
    },
    'SCT:816092008': {
      text: 'Pelvis',
      type: 'site',
      style: {
        color: 'cyan'
      }
    },
    // Findings
    'SCT:371861004': {
      text: 'Mild intimal coronary irregularities',
      style: {
        color: 'green'
      }
    },
    'SCT:194983005': {
      text: 'Aortic insufficiency',
      style: {
        color: 'darkred'
      }
    },
    'SCT:399232001': {
      text: '2-chamber'
    },
    'SCT:103340004': {
      text: 'SAX'
    },
    'SCT:91134007': {
      text: 'MV'
    },
    'SCT:122972007': {
      text: 'PV'
    },
    // Orientations
    'SCT:24422004': {
      text: 'Axial',
      color: '#000000',
      type: 'orientation'
    },
    'SCT:81654009': {
      text: 'Coronal',
      color: '#000000',
      type: 'orientation'
    },
    'SCT:30730003': {
      text: 'Sagittal',
      color: '#000000',
      type: 'orientation'
    }
  }
});

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

/***/ "../../../extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts"
/*!*****************************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts ***!
  \*****************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  '@ohif/contextMenuAnnotationCode': {
    /** Applies the code value setup for this item */
    $transform: function (customizationService) {
      const {
        code: codeRef
      } = this;
      if (!codeRef) {
        throw new Error(`item ${this} has no code ref`);
      }
      const codingValues = customizationService.getCustomization('codingValues');
      const code = codingValues[codeRef];
      return {
        ...this,
        codeRef,
        code: {
          ref: codeRef,
          ...code
        },
        label: this.label || code.text || codeRef,
        commands: [{
          commandName: 'updateMeasurement'
        }]
      };
    }
  }
});

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

/***/ "../../../extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts"
/*!*****************************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts ***!
  \*****************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  measurementsContextMenu: {
    $set: {
      inheritsFrom: 'ohif.contextMenu',
      menus: [{
        // selector restricts context menu to when there is nearbyToolData
        selector: ({
          nearbyToolData
        }) => !!nearbyToolData,
        items: [{
          label: 'Site',
          actionType: 'ShowSubMenu',
          subMenu: 'siteSelectionSubMenu'
        }, {
          label: 'Finding',
          actionType: 'ShowSubMenu',
          subMenu: 'findingSelectionSubMenu'
        }, {
          // inheritsFrom is implicit here in the configuration setup
          label: 'Delete Measurement',
          commands: [{
            commandName: 'removeMeasurement'
          }]
        }, {
          label: 'Add Label',
          commands: [{
            commandName: 'setMeasurementLabel'
          }]
        },
        // The example below shows how to include a delegating sub-menu,
        // Only available on the @ohif/mnGrid hanging protocol
        // To demonstrate, select the 3x1 layout from the protocol menu
        // and right click on a measurement.
        {
          label: 'IncludeSubMenu',
          selector: ({
            protocol
          }) => protocol?.id === '@ohif/mnGrid',
          delegating: true,
          subMenu: 'orientationSelectionSubMenu'
        }]
      }, {
        id: 'orientationSelectionSubMenu',
        selector: ({
          nearbyToolData
        }) => !!nearbyToolData,
        items: [{
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:24422004'
        }, {
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:81654009'
        }]
      }, {
        id: 'findingSelectionSubMenu',
        selector: ({
          nearbyToolData
        }) => !!nearbyToolData,
        items: [{
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:371861004'
        }, {
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:194983005'
        }]
      }, {
        id: 'siteSelectionSubMenu',
        selector: ({
          nearbyToolData
        }) => !!nearbyToolData,
        items: [{
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:69536005'
        }, {
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:45048000'
        }]
      }]
    }
  }
});

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

/***/ "../../../extensions/test-extension/src/custom-context-menu/index.ts"
/*!***************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-context-menu/index.ts ***!
  \***************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   codingValues: () => (/* reexport safe */ _codingValues__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   contextMenuCodeItem: () => (/* reexport safe */ _contextMenuCodeItem__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   findingsContextMenu: () => (/* reexport safe */ _findingsContextMenu__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _codingValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./codingValues */ "../../../extensions/test-extension/src/custom-context-menu/codingValues.ts");
/* harmony import */ var _contextMenuCodeItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contextMenuCodeItem */ "../../../extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts");
/* harmony import */ var _findingsContextMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./findingsContextMenu */ "../../../extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






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

/***/ "../../../extensions/test-extension/src/getCustomizationModule.ts"
/*!************************************************************************!*\
  !*** ../../../extensions/test-extension/src/getCustomizationModule.ts ***!
  \************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCustomizationModule)
/* harmony export */ });
/* harmony import */ var _custom_context_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-context-menu */ "../../../extensions/test-extension/src/custom-context-menu/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function getCustomizationModule() {
  return [{
    name: 'custom-context-menu',
    value: {
      ..._custom_context_menu__WEBPACK_IMPORTED_MODULE_0__.codingValues,
      ..._custom_context_menu__WEBPACK_IMPORTED_MODULE_0__.contextMenuCodeItem,
      ..._custom_context_menu__WEBPACK_IMPORTED_MODULE_0__.findingsContextMenu
    }
  }, {
    name: 'contextMenuCodeItem',
    value: {
      ..._custom_context_menu__WEBPACK_IMPORTED_MODULE_0__.contextMenuCodeItem
    }
  }];
}

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

/***/ "../../../extensions/test-extension/src/getPanelModule.tsx"
/*!*****************************************************************!*\
  !*** ../../../extensions/test-extension/src/getPanelModule.tsx ***!
  \*****************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getPanelModule)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function getPanelModule({
  commandsManager,
  servicesManager,
  extensionManager
}) {
  const childProps = {
    commandsManager,
    servicesManager,
    extensionManager
  };
  const wrappedPanelMeasurementSeries = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.PanelMeasurement, childProps, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.StudyMeasurements, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.SeriesMeasurements, null)));
  };
  return [{
    name: 'panelMeasurementSeries',
    iconName: 'tool-freehand-roi',
    iconLabel: 'Measure Series',
    label: 'Measurement Series',
    component: wrappedPanelMeasurementSeries
  }];
}

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

/***/ "../../../extensions/test-extension/src/hpTestSwitch.ts"
/*!**************************************************************!*\
  !*** ../../../extensions/test-extension/src/hpTestSwitch.ts ***!
  \**************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const viewport0a = {
  viewportOptions: {
    viewportId: 'viewportA',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    id: 'defaultDisplaySetId'
  }]
};
const viewport1b = {
  viewportOptions: {
    viewportId: 'viewportB',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 1,
    id: 'defaultDisplaySetId'
  }]
};
const viewport2c = {
  viewportOptions: {
    viewportId: 'viewportC',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 2,
    id: 'defaultDisplaySetId'
  }]
};
const viewport3d = {
  viewportOptions: {
    viewportId: 'viewportD',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 3,
    id: 'defaultDisplaySetId'
  }]
};
const viewport4e = {
  viewportOptions: {
    viewportId: 'viewportE',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 4,
    id: 'defaultDisplaySetId'
  }]
};
const viewport5f = {
  viewportOptions: {
    viewportId: 'viewportF',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 5,
    id: 'defaultDisplaySetId'
  }]
};
const viewport3a = {
  viewportOptions: {
    viewportId: 'viewportA',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 3,
    id: 'defaultDisplaySetId'
  }]
};
const viewport2b = {
  viewportOptions: {
    viewportId: 'viewportB',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 2,
    id: 'defaultDisplaySetId'
  }]
};
const viewport1c = {
  viewportOptions: {
    viewportId: 'viewportC',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 1,
    id: 'defaultDisplaySetId'
  }]
};
const viewport0d = {
  viewportOptions: {
    viewportId: 'viewportD',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 0,
    id: 'defaultDisplaySetId'
  }]
};
const viewportStructure = {
  layoutType: 'grid',
  properties: {
    rows: 2,
    columns: 2
  }
};
const viewportStructure32 = {
  layoutType: 'grid',
  properties: {
    rows: 2,
    columns: 3
  }
};

/**
 * This hanging protocol is a test hanging protocol used to apply various
 * layouts in different positions for display, re-using earlier names in
 * various orders.
 */
const hpTestSwitch = {
  hasUpdatedPriorsInformation: false,
  id: '@ohif/mnTestSwitch',
  description: 'Has various hanging protocol grid layouts',
  name: 'Test Switch',
  protocolMatchingRules: [{
    id: 'OneOrMoreSeries',
    weight: 25,
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 0
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        }
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 20,
        constraint: {
          equals: true
        }
      }]
    }
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [{
    name: '2x2 0a1b2c3d',
    viewportStructure,
    viewports: [viewport0a, viewport1b, viewport2c, viewport3d]
  }, {
    name: '3x2 0a1b4e2c3d5f',
    viewportStructure: viewportStructure32,
    // Note the following structure simply preserves the viewportId for
    // a given screen position
    viewports: [viewport0a, viewport1b, viewport4e, viewport2c, viewport3d, viewport5f]
  }, {
    name: '2x2 1c0d3a2b',
    viewportStructure,
    viewports: [viewport1c, viewport0d, viewport3a, viewport2b]
  }, {
    name: '2x2 3a2b1c0d',
    viewportStructure,
    viewports: [viewport3a, viewport2b, viewport1c, viewport0d]
  }],
  numberOfPriorsReferenced: -1
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hpTestSwitch);

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

/***/ "../../../extensions/test-extension/src/id.js"
/*!****************************************************!*\
  !*** ../../../extensions/test-extension/src/id.js ***!
  \****************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/test-extension/package.json");
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

/***/ "../../../extensions/test-extension/src/index.tsx"
/*!********************************************************!*\
  !*** ../../../extensions/test-extension/src/index.tsx ***!
  \********************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/test-extension/src/id.js");
/* harmony import */ var _hpTestSwitch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hpTestSwitch */ "../../../extensions/test-extension/src/hpTestSwitch.ts");
/* harmony import */ var _getCustomizationModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCustomizationModule */ "../../../extensions/test-extension/src/getCustomizationModule.ts");
/* harmony import */ var _custom_attribute_sameAs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom-attribute/sameAs */ "../../../extensions/test-extension/src/custom-attribute/sameAs.ts");
/* harmony import */ var _custom_attribute_numberOfDisplaySets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom-attribute/numberOfDisplaySets */ "../../../extensions/test-extension/src/custom-attribute/numberOfDisplaySets.ts");
/* harmony import */ var _custom_attribute_maxNumImageFrames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom-attribute/maxNumImageFrames */ "../../../extensions/test-extension/src/custom-attribute/maxNumImageFrames.ts");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/test-extension/src/getPanelModule.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");









/**
 * The test extension provides additional behavior for testing various
 * customizations and settings for OHIF.
 */
const testExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  /**
   * Register additional behavior:
   *   * HP custom attribute seriesDescriptions to retrieve an array of all series descriptions
   *   * HP custom attribute numberOfDisplaySets to retrieve the number of display sets
   *   * HP custom attribute numberOfDisplaySetsWithImages to retrieve the number of display sets containing images
   *   * HP custom attribute to return a boolean true, when the attribute sameAttribute has the same
   *     value as another series description in an already matched display set selector named with the value
   *     in `sameDisplaySetId`
   */
  preRegistration: ({
    servicesManager
  }) => {
    const {
      hangingProtocolService
    } = servicesManager.services;
    hangingProtocolService.addCustomAttribute('numberOfDisplaySets', 'Number of displays sets', _custom_attribute_numberOfDisplaySets__WEBPACK_IMPORTED_MODULE_4__["default"]);
    hangingProtocolService.addCustomAttribute('maxNumImageFrames', 'Maximum of number of image frames', _custom_attribute_maxNumImageFrames__WEBPACK_IMPORTED_MODULE_5__["default"]);
    hangingProtocolService.addCustomAttribute('sameAs', 'Match an attribute in an existing display set', _custom_attribute_sameAs__WEBPACK_IMPORTED_MODULE_3__["default"]);
  },
  /** Registers some customizations */
  getCustomizationModule: _getCustomizationModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_6__["default"],
  getHangingProtocolModule: () => {
    return [
    // Create a MxN hanging protocol available by default
    {
      name: _hpTestSwitch__WEBPACK_IMPORTED_MODULE_1__["default"].id,
      protocol: _hpTestSwitch__WEBPACK_IMPORTED_MODULE_1__["default"]
    }];
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (testExtension);

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

/***/ "../../../extensions/test-extension/package.json"
/*!*******************************************************!*\
  !*** ../../../extensions/test-extension/package.json ***!
  \*******************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-test","version":"3.13.0-beta.20","description":"OHIF extension used inside e2e testing","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-test.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.13.0-beta.20","@ohif/ui":"3.13.0-beta.20","dcmjs":"0.49.4","dicom-parser":"1.8.21","hammerjs":"2.0.8","prop-types":"15.8.1","react":"18.3.1"},"dependencies":{"@babel/runtime":"7.28.2","classnames":"2.5.1"}}');

/***/ }

}]);
//# sourceMappingURL=extensions_test-extension_src_index_tsx.js.map