"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_usAnnotation_src_index_ts"],{

/***/ "../../../extensions/usAnnotation/src/PleuraBlinePercentage.ts"
/*!*********************************************************************!*\
  !*** ../../../extensions/usAnnotation/src/PleuraBlinePercentage.ts ***!
  \*********************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setShowPercentage: () => (/* binding */ setShowPercentage),
/* harmony export */   showPercentage: () => (/* binding */ showPercentage)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

// Global state to control whether to show the percentage in the overlay
let showPercentage = true;

/**
 * Sets whether to show the pleura percentage in the viewport overlay
 * @param value - Boolean indicating whether to show the percentage
 */
function setShowPercentage(value) {
  showPercentage = value;
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

/***/ "../../../extensions/usAnnotation/src/getCommandsModule.ts"
/*!*****************************************************************!*\
  !*** ../../../extensions/usAnnotation/src/getCommandsModule.ts ***!
  \*****************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _getInstanceByImageId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getInstanceByImageId */ "../../../extensions/usAnnotation/src/getInstanceByImageId.ts");
/* harmony import */ var _PleuraBlinePercentage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PleuraBlinePercentage */ "../../../extensions/usAnnotation/src/PleuraBlinePercentage.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






const {
  downloadBlob
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils;
const {
  transformWorldToIndex
} = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities;

/**
 * Creates and returns the commands module for ultrasound annotation
 * @param params - Extension parameters including servicesManager and commandsManager
 * @returns The commands module with actions and definitions
 */
function commandsModule({
  servicesManager
}) {
  const {
    viewportGridService,
    toolGroupService,
    cornerstoneViewportService
  } = servicesManager.services;
  const actions = {
    /**
     * Switches the active ultrasound annotation type
     * @param options - Object containing the annotationType to switch to
     */
    switchUSPleuraBLineAnnotation: ({
      annotationType
    }) => {
      const activeViewportId = viewportGridService.getActiveViewportId();
      const toolGroup = toolGroupService.getToolGroupForViewport(activeViewportId);
      if (!toolGroup) {
        return;
      }
      const usAnnotation = toolGroup.getToolInstance(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.toolName);
      if (usAnnotation) {
        usAnnotation.setActiveAnnotationType(annotationType);
      }
    },
    /**
     * Convenience method to switch to pleura line annotation type
     */
    switchUSPleuraBLineAnnotationToPleuraLine: () => {
      actions.switchUSPleuraBLineAnnotation({
        annotationType: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.PLEURA
      });
    },
    /**
     * Convenience method to switch to B-line annotation type
     */
    switchUSPleuraBLineAnnotationToBLine: () => {
      actions.switchUSPleuraBLineAnnotation({
        annotationType: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.BLINE
      });
    },
    /**
     * Deletes the last annotation of the specified type
     * @param options - Object containing the annotationType to delete
     */
    deleteLastUSPleuraBLineAnnotation: ({
      annotationType
    }) => {
      const activeViewportId = viewportGridService.getActiveViewportId();
      const toolGroup = toolGroupService.getToolGroupForViewport(activeViewportId);
      if (!toolGroup) {
        return;
      }
      const usAnnotation = toolGroup.getToolInstance(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.toolName);
      if (usAnnotation) {
        const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
        usAnnotation.deleteLastAnnotationType(viewport.element, annotationType);
        viewport.render();
      }
    },
    /**
     * Convenience method to delete the last pleura line annotation
     */
    deleteLastPleuraAnnotation: () => {
      actions.deleteLastUSPleuraBLineAnnotation({
        annotationType: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.PLEURA
      });
    },
    /**
     * Convenience method to delete the last B-line annotation
     */
    deleteLastBLineAnnotation: () => {
      actions.deleteLastUSPleuraBLineAnnotation({
        annotationType: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.BLINE
      });
    },
    /**
     * Toggles a boolean attribute of the ultrasound annotation tool
     * @param options - Object containing the attribute name to toggle
     */
    toggleUSToolAttribute: ({
      attribute
    }) => {
      const activeViewportId = viewportGridService.getActiveViewportId();
      const toolGroup = toolGroupService.getToolGroupForViewport(activeViewportId);
      if (!toolGroup) {
        return;
      }
      const configuration = toolGroup.getToolConfiguration(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.toolName);
      if (!configuration) {
        return;
      }
      toolGroup.setToolConfiguration(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.toolName, {
        [attribute]: !configuration[attribute]
      });
      const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
      viewport.render();
    },
    /**
     * Sets a specific attribute of the ultrasound annotation tool to a given value
     * @param options - Object containing the attribute name and value to set
     */
    setUSToolAttribute: ({
      attribute,
      value
    }) => {
      const activeViewportId = viewportGridService.getActiveViewportId();
      const toolGroup = toolGroupService.getToolGroupForViewport(activeViewportId);
      if (!toolGroup) {
        return;
      }
      const configuration = toolGroup.getToolConfiguration(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.toolName);
      if (!configuration) {
        return;
      }
      toolGroup.setToolConfiguration(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.toolName, {
        [attribute]: value
      });
      const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
      viewport.render();
    },
    /**
     * Toggles the display of fan annotations
     */
    toggleDisplayFanAnnotation: () => {
      actions.toggleUSToolAttribute({
        attribute: 'showFanAnnotations'
      });
    },
    /**
     * Toggles the display of the depth guide
     */
    toggleDepthGuide: () => {
      actions.toggleUSToolAttribute({
        attribute: 'drawDepthGuide'
      });
    },
    /**
     * Sets the depth guide display state
     * @param options - Object containing the boolean value to set
     */
    setDepthGuide: ({
      value
    }) => {
      actions.setUSToolAttribute({
        attribute: 'drawDepthGuide',
        value
      });
    },
    /**
     * Sets the fan annotation display state
     * @param options - Object containing the boolean value to set
     */
    setDisplayFanAnnotation: ({
      value
    }) => {
      actions.setUSToolAttribute({
        attribute: 'showFanAnnotations',
        value
      });
    },
    /**
     * Sets whether to show the pleura percentage in the viewport overlay
     * @param options - Object containing the boolean value to set
     */
    setShowPleuraPercentage: ({
      value
    }) => {
      (0,_PleuraBlinePercentage__WEBPACK_IMPORTED_MODULE_4__.setShowPercentage)(value);
      // Trigger ANNOTATION_MODIFIED event to update the overlay
      (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.triggerEvent)(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.Enums.Events.ANNOTATION_MODIFIED, {
        annotation: {
          metadata: {
            toolName: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.toolName
          }
        }
      });
    },
    /**
     * Generates a JSON representation of the ultrasound annotations
     * @param labels - Array of annotation labels
     * @param imageIds - Array of image IDs to include in the JSON
     * @returns A JSON object containing the annotations data or undefined if generation fails
     */
    generateUSPleuraBLineAnnotationsJSON: (labels = [], imageIds = []) => {
      const activeViewportId = viewportGridService.getActiveViewportId();
      const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
      if (!viewport) {
        return;
      }
      const {
        imageData
      } = viewport.getImageData() || {};
      if (!imageData) {
        return;
      }
      const toolGroup = toolGroupService.getToolGroupForViewport(activeViewportId);
      if (!toolGroup) {
        return;
      }
      const usAnnotation = toolGroup.getToolInstance(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.toolName);
      if (usAnnotation) {
        const configuration = toolGroup.getToolConfiguration(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.toolName);
        const imageId = viewport.getCurrentImageId();
        const filterImageIds = imageId => {
          if (imageIds.length === 0) {
            return true;
          } else {
            return imageIds.includes(imageId);
          }
        };
        const annotations = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.filterAnnotations(viewport.element, filterImageIds);
        const frame_annotations = {};
        const viewportImageIds = viewport.getImageIds();
        annotations.forEach(annotation => {
          const imageId = annotation.metadata.referencedImageId;
          const {
            annotationType
          } = annotation.data;
          const [point1, point2] = annotation.data.handles.points;
          const p1 = transformWorldToIndex(imageData, point1);
          const p2 = transformWorldToIndex(imageData, point2);
          const imageIdIndex = viewportImageIds.indexOf(imageId);
          if (frame_annotations[imageIdIndex] === undefined) {
            frame_annotations[imageIdIndex] = {
              pleura_lines: [],
              b_lines: []
            };
          }
          if (annotationType === _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.PLEURA) {
            frame_annotations[imageIdIndex].pleura_lines.push([[p1[0], p1[1], 0], [p2[0], p2[1], 0]]);
          } else if (annotationType === _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.BLINE) {
            frame_annotations[imageIdIndex].b_lines.push([[p1[0], p1[1], 0], [p2[0], p2[1], 0]]);
          }
        });
        const instance = (0,_getInstanceByImageId__WEBPACK_IMPORTED_MODULE_3__["default"])(servicesManager.services, imageId);
        const json = {
          SOPInstanceUID: instance.SOPInstanceUID,
          GrayscaleConversion: false,
          mask_type: 'fan',
          angle1: configuration.startAngle,
          angle2: configuration.endAngle,
          center_rows_px: configuration.center[0],
          center_cols_px: configuration.center[1],
          radius1: configuration.innerRadius,
          radius2: configuration.outerRadius,
          image_size_rows: instance.rows,
          image_size_cols: instance.columns,
          AnnotationLabels: labels,
          frame_annotations
        };
        return json;
      }
    },
    /**
     * Downloads the ultrasound annotations as a JSON file
     * @param options - Object containing labels and imageIds arrays
     */
    downloadUSPleuraBLineAnnotationsJSON({
      labels = [],
      imageIds = []
    }) {
      const json = actions.generateUSPleuraBLineAnnotationsJSON(labels, imageIds);
      if (!json) {
        return;
      }

      // Convert JSON object to a string
      const jsonString = JSON.stringify(json, null, 2);

      // Create a blob with the JSON data
      const blob = new Blob([jsonString], {
        type: 'application/json'
      });
      downloadBlob(blob, {
        filename: `ultrasound_annotations_${new Date().toISOString().slice(0, 10)}.json`
      });
    }
  };
  const definitions = {
    switchUSAnnotation: {
      commandFn: actions.switchUSPleuraBLineAnnotation
    },
    deleteLastAnnotation: {
      commandFn: actions.deleteLastUSPleuraBLineAnnotation
    },
    toggleDepthGuide: {
      commandFn: actions.toggleDepthGuide
    },
    setDepthGuide: {
      commandFn: actions.setDepthGuide
    },
    setShowPleuraPercentage: {
      commandFn: actions.setShowPleuraPercentage
    },
    toggleUSToolAttribute: {
      commandFn: actions.toggleUSToolAttribute
    },
    setUSToolAttribute: {
      commandFn: actions.setUSToolAttribute
    },
    toggleDisplayFanAnnotation: {
      commandFn: actions.toggleDisplayFanAnnotation
    },
    setDisplayFanAnnotation: {
      commandFn: actions.setDisplayFanAnnotation
    },
    generateJSON: {
      commandFn: actions.generateUSPleuraBLineAnnotationsJSON
    },
    downloadJSON: {
      commandFn: actions.downloadUSPleuraBLineAnnotationsJSON
    },
    switchUSAnnotationToPleuraLine: {
      commandFn: actions.switchUSPleuraBLineAnnotationToPleuraLine
    },
    switchUSAnnotationToBLine: {
      commandFn: actions.switchUSPleuraBLineAnnotationToBLine
    },
    deleteLastPleuraAnnotation: {
      commandFn: actions.deleteLastPleuraAnnotation
    },
    deleteLastBLineAnnotation: {
      commandFn: actions.deleteLastBLineAnnotation
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'CORNERSTONE'
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (commandsModule);

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

/***/ "../../../extensions/usAnnotation/src/getInstanceByImageId.ts"
/*!********************************************************************!*\
  !*** ../../../extensions/usAnnotation/src/getInstanceByImageId.ts ***!
  \********************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getInstanceByImageId)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Retrieves the DICOM instance associated with a specific imageId
 * @param services - The OHIF services object
 * @param imageId - The image ID to find the instance for
 * @returns The DICOM instance object or undefined if not found
 */
function getInstanceByImageId(services, imageId) {
  const activeDisplaySets = services.displaySetService.getActiveDisplaySets();
  const displaySet = activeDisplaySets.find(displaySet => displaySet?.imageIds?.includes(imageId));
  return displaySet?.instance;
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

/***/ "../../../extensions/usAnnotation/src/getPanelModule.tsx"
/*!***************************************************************!*\
  !*** ../../../extensions/usAnnotation/src/getPanelModule.tsx ***!
  \***************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _panels_USAnnotationPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panels/USAnnotationPanel */ "../../../extensions/usAnnotation/src/panels/USAnnotationPanel.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Creates and returns the panel module for ultrasound annotation
 * @param params - Object containing commandsManager, servicesManager, and extensionManager
 * @returns Array of panel configurations
 */
const getPanelModule = ({
  commandsManager,
  servicesManager,
  extensionManager
}) => {
  /**
   * Wrapper component for the USAnnotationPanel that injects the required props
   * @param props - Component props including configuration
   * @returns The wrapped USAnnotationPanel component
   */
  const wrappedUSAnnotationPanel = ({
    configuration
  }) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_panels_USAnnotationPanel__WEBPACK_IMPORTED_MODULE_1__["default"], null);
  };
  return [{
    name: 'USAnnotationPanel',
    iconName: 'tab-linear',
    iconLabel: 'US Annotation',
    label: 'USAnnotation',
    component: wrappedUSAnnotationPanel
  }];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPanelModule);

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

/***/ "../../../extensions/usAnnotation/src/id.js"
/*!**************************************************!*\
  !*** ../../../extensions/usAnnotation/src/id.js ***!
  \**************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/usAnnotation/package.json");
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

/***/ "../../../extensions/usAnnotation/src/index.ts"
/*!*****************************************************!*\
  !*** ../../../extensions/usAnnotation/src/index.ts ***!
  \*****************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   setShowPercentage: () => (/* reexport safe */ _PleuraBlinePercentage__WEBPACK_IMPORTED_MODULE_3__.setShowPercentage),
/* harmony export */   showPercentage: () => (/* reexport safe */ _PleuraBlinePercentage__WEBPACK_IMPORTED_MODULE_3__.showPercentage)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/usAnnotation/src/id.js");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/usAnnotation/src/getPanelModule.tsx");
/* harmony import */ var _getCommandsModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCommandsModule */ "../../../extensions/usAnnotation/src/getCommandsModule.ts");
/* harmony import */ var _PleuraBlinePercentage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PleuraBlinePercentage */ "../../../extensions/usAnnotation/src/PleuraBlinePercentage.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





/**
 * You can remove any of the following modules if you don't need them.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  /**
   * PanelModule should provide a list of panels that will be available in OHIF
   * for Modes to consume and render. Each panel is defined by a {name,
   * iconName, iconLabel, label, component} object. Example of a panel module
   * is the StudyBrowserPanel that is provided by the default extension in OHIF.
   */
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_1__["default"],
  /**
   * CommandsModule should provide a list of commands that will be available in OHIF
   * for Modes to consume and use in the viewports. Each command is defined by
   * an object of { actions, definitions, defaultContext } where actions is an
   * object of functions, definitions is an object of available commands, their
   * options, and defaultContext is the default context for the command to run against.
   */
  getCommandsModule: _getCommandsModule__WEBPACK_IMPORTED_MODULE_2__["default"]
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

/***/ "../../../extensions/usAnnotation/src/panels/USAnnotationPanel.tsx"
/*!*************************************************************************!*\
  !*** ../../../extensions/usAnnotation/src/panels/USAnnotationPanel.tsx ***!
  \*************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ USAnnotationPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();







/**
 * A side panel that drives the ultrasound annotation workflow.
 * It provides controls for managing annotations, toggling display options,
 * and downloading annotations as JSON.
 * @returns The USAnnotationPanel component
 */
function USAnnotationPanel() {
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)('USAnnotationPanel');
  const {
    servicesManager,
    commandsManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_3__.useSystem)();

  /** ──────────────────────────────────────────────────────
   * Local state – purely UI related (no business logic).   */

  const {
    viewportGridService,
    cornerstoneViewportService,
    measurementService
  } = servicesManager.services;

  // UI state variables
  const [depthGuide, setDepthGuide] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [autoAdd, setAutoAdd] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [showPleuraPct, setShowPleuraPct] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [showOverlay, setShowOverlay] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);

  // Data state variables
  const [annotatedFrames, setAnnotatedFrames] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [imageIdsToObserve, setImageIdsToObserve] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [labels, setLabels] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);

  /** ──────────────────────────────────────────────────────
   * Helper – commands bridging back to OHIF services.       */

  /**
   * Switches the active annotation type (pleura or B-line)
   * @param type - The annotation type to switch to
   */
  const switchAnnotation = type => {
    commandsManager.runCommand('setToolActive', {
      toolName: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.UltrasoundPleuraBLineTool.toolName
    });
    commandsManager.runCommand('switchUSAnnotation', {
      annotationType: type
    });
  };

  /**
   * Deletes the last annotation of the specified type
   * @param type - The annotation type to delete
   */
  const deleteLast = type => {
    commandsManager.runCommand('deleteLastAnnotation', {
      annotationType: type
    });
    updateAnnotatedFrames();
  };

  /**
   * Sets the depth guide display state
   * @param value - Boolean indicating whether to show the depth guide
   */
  const setDepthGuideCommand = value => {
    commandsManager.runCommand('setDepthGuide', {
      value
    });
    setDepthGuide(value);
  };
  /**
   * Sets the auto-add annotations state
   * When enabled, all frames are monitored for annotations
   * When disabled, only manually added frames are monitored
   * @param value - Boolean indicating whether to auto-add annotations
   */
  const setAutoAddCommand = value => {
    if (value) {
      setImageIdsToObserve([]);
    } else {
      const imageIds = annotatedFrames.map(item => item.imageId);
      if (imageIds.length > 0) {
        setImageIdsToObserve(imageIds);
      } else {
        setImageIdsToObserve(['Manual']);
      }
    }
    setAutoAdd(value);
  };
  /**
   * Sets whether to show the pleura percentage in the viewport overlay
   * @param value - Boolean indicating whether to show the percentage
   */
  const setShowPleuraPercentageCommand = value => {
    commandsManager.runCommand('setShowPleuraPercentage', {
      value
    });
    setShowPleuraPct(value);
  };
  /**
   * Sets whether to show the fan overlay in the viewport
   * @param value - Boolean indicating whether to show the overlay
   */
  const setShowOverlayCommand = value => {
    commandsManager.runCommand('setDisplayFanAnnotation', {
      value
    });
    commandsManager.runCommand('setShowPleuraPercentage', {
      value
    });
    setShowOverlay(value);
  };
  /**
   * Downloads the annotations as a JSON file
   * Uses the labels and imageIdsToObserve state variables
   */
  const downloadJSON = () => {
    commandsManager.runCommand('downloadJSON', {
      labels,
      imageIds: imageIdsToObserve
    });
  };

  /**
   * Adds the current image ID to the list of monitored image IDs
   * Only works when auto-add is disabled
   */
  const addCurrentImageId = () => {
    if (!autoAdd) {
      const activeViewportId = viewportGridService.getActiveViewportId();
      const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
      const currentImageId = viewport.getCurrentImageId();
      const imageIds = [...imageIdsToObserve];
      if (!imageIds.includes(currentImageId)) {
        imageIds.push(currentImageId);
      }
      setImageIdsToObserve(imageIds);
    }
  };

  /**
   * Handles clicking on a row in the annotated frames table
   * Scrolls the viewport to the selected frame
   * @param item - The annotated frame item that was clicked
   */
  const handleRowClick = item => {
    const activeViewportId = viewportGridService.getActiveViewportId();
    const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.scroll(viewport, {
      delta: item.frame - viewport.getCurrentImageIdIndex()
    });
  };

  /**
   * Render helpers so the JSX doesn’t become spaghetti.     */
  const renderWorkflowToggles = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.PanelSection.Content, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-foreground space-y-3 p-2 text-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Switch, {
    id: "depth-guide-switch",
    className: "mr-3",
    checked: depthGuide,
    onCheckedChange: () => setDepthGuideCommand(!depthGuide)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "depth-guide-switch",
    className: "cursor-pointer",
    onClick: () => setDepthGuideCommand(!depthGuide)
  }, t('Depth guide toggle'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Switch, {
    id: "pleura-percentage-switch",
    className: "mr-3",
    checked: showPleuraPct,
    onCheckedChange: () => setShowPleuraPercentageCommand(!showPleuraPct)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "pleura-percentage-switch",
    className: "cursor-pointer",
    onClick: () => setShowPleuraPercentageCommand(!showPleuraPct)
  }, t('Show pleura percentage')))));
  const renderSectorAnnotations = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.PanelSection.Content, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col gap-4 p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Label, null, t('Sector Annotations')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Tabs, {
    defaultValue: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.BLINE,
    onValueChange: newValue => switchAnnotation(newValue)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.TabsList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.TabsTrigger, {
    value: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.PLEURA
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.Plus, null), " ", t('Pleura line')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.TabsTrigger, {
    value: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.BLINE
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.Plus, null), " ", t('B-line')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Separator, {
    orientation: "vertical"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Separator, {
    orientation: "vertical"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.DropdownMenu, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "ghost",
    className: "ml-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.More, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.DropdownMenuContent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.DropdownMenuItem, {
    onClick: () => deleteLast(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.BLINE)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.Delete, {
    className: "text-foreground"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "pl-2"
  }, t('B-line annotation'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.DropdownMenuItem, {
    onClick: () => deleteLast(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.UltrasoundPleuraBLineTool.USPleuraBLineAnnotationType.PLEURA)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.Delete, {
    className: "text-foreground"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "pl-2"
  }, t('Pleura annotation')))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Switch, {
    id: "show-overlay-switch",
    checked: showOverlay,
    onCheckedChange: () => setShowOverlayCommand(!showOverlay)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "show-overlay-switch",
    className: "text-muted-foreground cursor-pointer"
  }, t('Show Overlay'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", {
    className: "border-input/50 border-t"
  })));
  const renderAnnotatedFrames = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.ScrollArea, {
    className: "h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.PanelSection.Content, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-4 flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "ghost",
    onClick: () => downloadJSON()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.Download, {
    className: "h-5 w-5"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, t('JSON'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "ghost",
    onClick: () => setShowOverlayCommand(!showOverlay)
  }, showOverlay ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.Hide, {
    className: "h-5 w-5"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.Show, {
    className: "h-5 w-5"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-full overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    className: "w-full border-collapse text-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
    className: "text-muted-foreground border-input/50 border-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "py-2 px-2 text-left font-normal"
  }, t('Frame')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "py-2 px-2 text-center font-normal"
  }, t('Pleura lines')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "py-2 px-2 text-center font-normal"
  }, t('B-lines')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "w-10"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, annotatedFrames.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
    key: item.frame,
    className: `border-input/50 border-b ${item.frame === 5 ? 'bg-cyan-800 bg-opacity-30' : ''}`,
    onClick: () => handleRowClick(item),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
    className: "py-2 px-2"
  }, item.index), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
    className: "py-2 px-2"
  }, item.frame + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
    className: "py-2 px-2 text-center"
  }, item.pleura), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
    className: "py-2 px-2 text-center"
  }, item.bLine), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
    className: "py-2 px-2 text-right"
  }, item.frame === 5 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "ghost",
    className: "p-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.EyeVisible, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "ghost",
    className: "ml-2 p-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Icons.More, null)))))))))));
  const updateAnnotatedFrames = () => {
    const activeViewportId = viewportGridService.getActiveViewportId();
    const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
    // copying to avoid mutating the original array
    const imageIdsMonitored = [...imageIdsToObserve];
    const imageIdFilter = imageId => {
      if (imageIdsMonitored.length === 0) {
        return true;
      }
      return imageIdsMonitored.includes(imageId);
    };
    const mapping = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.UltrasoundPleuraBLineTool.countAnnotations(viewport.element, imageIdFilter);
    if (!mapping) {
      setAnnotatedFrames([]);
      return;
    }
    const keys = Array.from(mapping.keys());
    const updatedFrames = keys.map((key, index) => {
      const {
        pleura,
        bLine,
        frame
      } = mapping.get(key) || {
        pleura: 0,
        bLine: 0,
        frame: 0
      };
      return {
        imageId: key,
        index: index + 1,
        frame,
        pleura,
        bLine
      };
    });
    setAnnotatedFrames(updatedFrames);
  };
  /**
   * Callback function that is called when an annotation is modified
   * Updates the annotatedFrames state with the latest annotation data
   */
  const annotationModified = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(event => {
    if (event.detail.annotation.metadata.toolName === _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.UltrasoundPleuraBLineTool.toolName) {
      updateAnnotatedFrames();
    }
  }, [viewportGridService, cornerstoneViewportService, imageIdsToObserve]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.Enums.Events.ANNOTATION_MODIFIED, annotationModified);
    const {
      unsubscribe
    } = measurementService.subscribe(measurementService.EVENTS.MEASUREMENT_REMOVED, () => {
      updateAnnotatedFrames();
    });
    return () => {
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.Enums.Events.ANNOTATION_MODIFIED, annotationModified);
      unsubscribe();
    };
  }, [annotationModified, measurementService]);

  /**
   * ──────────────────────────────────────────────────────
   *  🖼  Final Render                                      */
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-foreground h-full bg-background",
    style: {
      minWidth: 240,
      maxWidth: 480,
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.PanelSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.PanelSection.Header, null, t('Workflow')), renderWorkflowToggles()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.PanelSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.PanelSection.Header, null, t('Annotations')), renderSectorAnnotations()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.PanelSection, {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.PanelSection.Header, null, t('Annotated Frames')), renderAnnotatedFrames()));
}
_s(USAnnotationPanel, "n8Y/s8EH0SmsrbvJ2RPDldixzgQ=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation, _ohif_core__WEBPACK_IMPORTED_MODULE_3__.useSystem];
});
_c = USAnnotationPanel;
var _c;
__webpack_require__.$Refresh$.register(_c, "USAnnotationPanel");

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

/***/ "../../../extensions/usAnnotation/package.json"
/*!*****************************************************!*\
  !*** ../../../extensions/usAnnotation/package.json ***!
  \*****************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-ultrasound-pleura-bline","version":"3.13.0-beta.20","description":"","author":"Rodrigo Basilio","license":"MIT","main":"dist/ohif-extension-ultrasound-pleura-bline.umd.js","publishConfig":{"access":"public"},"files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-extension"],"module":"src/index.ts","engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:my-extension":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev"},"peerDependencies":{"prop-types":"15.8.1","react":"18.3.1","react-dom":"18.3.1","react-i18next":"12.3.1","react-router":"6.30.3","react-router-dom":"6.30.3","webpack":"5.105.0","webpack-merge":"5.10.0"},"dependencies":{"@babel/runtime":"7.28.2","@cornerstonejs/core":"4.15.29","@cornerstonejs/tools":"4.15.29","@ohif/core":"3.13.0-beta.20","@ohif/extension-cornerstone":"3.13.0-beta.20","@ohif/extension-default":"3.13.0-beta.20","@ohif/i18n":"3.13.0-beta.20","@ohif/ui-next":"3.13.0-beta.20"},"devDependencies":{"@babel/core":"7.28.0","@babel/plugin-syntax-dynamic-import":"7.8.3","@babel/plugin-transform-arrow-functions":"7.27.1","@babel/plugin-transform-class-properties":"7.27.1","@babel/plugin-transform-object-rest-spread":"7.28.0","@babel/plugin-transform-private-methods":"7.27.1","@babel/plugin-transform-private-property-in-object":"7.27.1","@babel/plugin-transform-regenerator":"7.28.1","@babel/plugin-transform-runtime":"7.28.0","@babel/plugin-transform-typescript":"7.28.0","@babel/preset-env":"7.28.0","@babel/preset-react":"7.27.1","@babel/preset-typescript":"7.27.1","@svgr/webpack":"8.1.0","babel-loader":"8.4.1","clean-webpack-plugin":"3.0.0","copy-webpack-plugin":"9.1.0","cross-env":"7.0.3","dotenv":"8.6.0","webpack":"5.105.0","webpack-cli":"5.1.4","webpack-merge":"5.10.0"}}');

/***/ }

}]);
//# sourceMappingURL=extensions_usAnnotation_src_index_ts.js.map