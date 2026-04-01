"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_segmentation_src_index_tsx"],{

/***/ "../../../modes/segmentation/src/constants.ts"
/*!****************************************************!*\
  !*** ../../../modes/segmentation/src/constants.ts ***!
  \****************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAX_SEGMENTATION_DRAWING_RADIUS: () => (/* binding */ MAX_SEGMENTATION_DRAWING_RADIUS),
/* harmony export */   MIN_SEGMENTATION_DRAWING_RADIUS: () => (/* binding */ MIN_SEGMENTATION_DRAWING_RADIUS)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const MIN_SEGMENTATION_DRAWING_RADIUS = 0.5;
const MAX_SEGMENTATION_DRAWING_RADIUS = 99.5;

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

/***/ "../../../modes/segmentation/src/id.js"
/*!*********************************************!*\
  !*** ../../../modes/segmentation/src/id.js ***!
  \*********************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/segmentation/package.json");
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

/***/ "../../../modes/segmentation/src/index.tsx"
/*!*************************************************!*\
  !*** ../../../modes/segmentation/src/index.tsx ***!
  \*************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toolbarButtons: () => (/* reexport safe */ _toolbarButtons__WEBPACK_IMPORTED_MODULE_1__.toolbarButtons)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../modes/segmentation/src/id.js");
/* harmony import */ var _toolbarButtons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbarButtons */ "../../../modes/segmentation/src/toolbarButtons.ts");
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initToolGroups */ "../../../modes/segmentation/src/initToolGroups.ts");
/* harmony import */ var _utils_setUpAutoTabSwitchHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/setUpAutoTabSwitchHandler */ "../../../modes/segmentation/src/utils/setUpAutoTabSwitchHandler.ts");
/* harmony import */ var _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/mode-basic */ "../../../modes/basic/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







function modeFactory({
  modeConfiguration
}) {
  const _unsubscriptions = [];
  return {
    /**
     * Mode ID, which should be unique among modes used by the viewer. This ID
     * is used to identify the mode in the viewer's state.
     */
    id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
    routeName: 'segmentation',
    /**
     * Mode name, which is displayed in the viewer's UI in the workList, for the
     * user to select the mode.
     */
    displayName: 'Segmentation',
    /**
     * Runs when the Mode Route is mounted to the DOM. Usually used to initialize
     * Services and other resources.
     */
    onModeEnter: ({
      servicesManager,
      extensionManager,
      commandsManager
    }) => {
      const {
        measurementService,
        toolbarService,
        toolGroupService,
        segmentationService,
        viewportGridService,
        panelService
      } = servicesManager.services;
      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      (0,_initToolGroups__WEBPACK_IMPORTED_MODULE_2__["default"])(extensionManager, toolGroupService, commandsManager);
      toolbarService.register(_toolbarButtons__WEBPACK_IMPORTED_MODULE_1__["default"]);
      toolbarService.updateSection(toolbarService.sections.primary, ['WindowLevel', 'Pan', 'Zoom', 'TrackballRotate', 'Capture', 'Layout', 'Crosshairs', 'MoreTools']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.topLeft, ['orientationMenu', 'dataOverlayMenu']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.bottomMiddle, ['AdvancedRenderingControls']);
      toolbarService.updateSection('AdvancedRenderingControls', ['windowLevelMenuEmbedded', 'voiManualControlMenu', 'Colorbar', 'opacityMenu', 'thresholdMenu']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.topRight, ['modalityLoadBadge', 'trackingStatus', 'navigationComponent']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.bottomLeft, ['windowLevelMenu']);
      toolbarService.updateSection('MoreTools', ['Reset', 'rotate-right', 'flipHorizontal', 'ReferenceLines', 'ImageOverlayViewer', 'StackScroll', 'invert', 'Cine', 'Magnify', 'TagBrowser']);
      toolbarService.updateSection(toolbarService.sections.labelMapSegmentationToolbox, ['LabelMapTools']);
      toolbarService.updateSection(toolbarService.sections.contourSegmentationToolbox, ['ContourTools']);
      toolbarService.updateSection('LabelMapTools', ['LabelmapSlicePropagation', 'BrushTools', 'MarkerLabelmap', 'RegionSegmentPlus', 'Shapes', 'LabelMapEditWithContour']);
      toolbarService.updateSection('ContourTools', ['PlanarFreehandContourSegmentationTool', 'SculptorTool', 'SplineContourSegmentationTool', 'LivewireContourSegmentationTool']);
      toolbarService.updateSection(toolbarService.sections.labelMapSegmentationUtilities, ['LabelMapUtilities']);
      toolbarService.updateSection(toolbarService.sections.contourSegmentationUtilities, ['ContourUtilities']);
      toolbarService.updateSection('LabelMapUtilities', ['InterpolateLabelmap', 'SegmentBidirectional']);
      toolbarService.updateSection('ContourUtilities', ['LogicalContourOperations', 'SimplifyContours', 'SmoothContours']);
      toolbarService.updateSection('BrushTools', ['Brush', 'Eraser', 'Threshold']);
      const {
        unsubscribeAutoTabSwitchEvents
      } = (0,_utils_setUpAutoTabSwitchHandler__WEBPACK_IMPORTED_MODULE_3__["default"])({
        segmentationService,
        viewportGridService,
        panelService
      });
      _unsubscriptions.push(...unsubscribeAutoTabSwitchEvents);
    },
    onModeExit: ({
      servicesManager
    }) => {
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      _unsubscriptions.forEach(unsubscribe => unsubscribe());
      _unsubscriptions.length = 0;
      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    /** */
    validationTags: {
      study: [],
      series: []
    },
    /**
     * A boolean return value that indicates whether the mode is valid for the
     * modalities of the selected studies. Currently we don't have stack viewport
     * segmentations and we should exclude them
     */
    isValidMode: ({
      modalities
    }) => {
      // Don't show the mode if the selected studies have only one modality
      // that is not supported by the mode
      const modalitiesArray = modalities.split('\\');
      return {
        valid: modalitiesArray.length === 1 ? !['SM', 'ECG', 'OT', 'DOC'].includes(modalitiesArray[0]) : true,
        description: 'The mode does not support studies that ONLY include the following modalities: SM, OT, DOC'
      };
    },
    /**
     * Mode Routes are used to define the mode's behavior. A list of Mode Route
     * that includes the mode's path and the layout to be used. The layout will
     * include the components that are used in the layout. For instance, if the
     * default layoutTemplate is used (id: '@ohif/extension-default.layoutTemplateModule.viewerLayout')
     * it will include the leftPanels, rightPanels, and viewports. However, if
     * you define another layoutTemplate that includes a Footer for instance,
     * you should provide the Footer component here too. Note: We use Strings
     * to reference the component's ID as they are registered in the internal
     * ExtensionManager. The template for the string is:
     * `${extensionId}.{moduleType}.${componentId}`.
     */
    routes: [{
      path: 'template',
      layoutTemplate: ({
        location,
        servicesManager
      }) => {
        return {
          id: _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.ohif.layout,
          props: {
            leftPanels: [_ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.ohif.thumbnailList],
            leftPanelResizable: true,
            rightPanels: [_ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.cornerstone.labelMapSegmentationPanel, _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.cornerstone.contourSegmentationPanel],
            rightPanelResizable: true,
            // leftPanelClosed: true,
            viewports: [{
              namespace: _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.cornerstone.viewport,
              displaySetsToDisplay: [_ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.ohif.sopClassHandler]
            }, {
              namespace: _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.segmentation.viewport,
              displaySetsToDisplay: [_ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.segmentation.sopClassHandler]
            }, {
              namespace: _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.dicomRT.viewport,
              displaySetsToDisplay: [_ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.dicomRT.sopClassHandler]
            }]
          }
        };
      }
    }],
    /** List of extensions that are used by the mode */
    extensions: _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.extensionDependencies,
    /** HangingProtocol used by the mode */
    // Commented out to just use the most applicable registered hanging protocol
    // The example is used for a grid layout to specify that as a preferred layout
    hangingProtocol: ['@ohif/mnGrid'],
    /** SopClassHandlers used by the mode */
    sopClassHandlers: [_ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.ohif.sopClassHandler, _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.segmentation.sopClassHandler, _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.dicomRT.sopClassHandler]
  };
}
const mode = {
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  modeFactory,
  extensionDependencies: _ohif_mode_basic__WEBPACK_IMPORTED_MODULE_4__.extensionDependencies
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

/***/ "../../../modes/segmentation/src/initToolGroups.ts"
/*!*********************************************************!*\
  !*** ../../../modes/segmentation/src/initToolGroups.ts ***!
  \*********************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../modes/segmentation/src/constants.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const colours = {
  'viewport-0': 'rgb(200, 0, 0)',
  'viewport-1': 'rgb(200, 200, 0)',
  'viewport-2': 'rgb(0, 200, 0)'
};
const colorsByOrientation = {
  axial: 'rgb(200, 0, 0)',
  sagittal: 'rgb(200, 200, 0)',
  coronal: 'rgb(0, 200, 0)'
};
function createTools({
  utilityModule,
  commandsManager
}) {
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }, {
        numTouchPoints: 2
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }, {
        numTouchPoints: 3
      }]
    }],
    passive: [{
      toolName: 'CircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_CIRCLE',
        minRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: toolNames.LabelmapSlicePropagation
    }, {
      toolName: toolNames.MarkerLabelmap
    }, {
      toolName: toolNames.RegionSegmentPlus
    }, {
      toolName: 'CircularEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_CIRCLE',
        minRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'SphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_SPHERE',
        minRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'SphereEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_SPHERE',
        minRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'ThresholdCircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_CIRCLE',
        minRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'ThresholdSphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_SPHERE',
        minRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'ThresholdCircularBrushDynamic',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_CIRCLE',
        minRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SEGMENTATION_DRAWING_RADIUS,
        threshold: {
          isDynamic: true,
          dynamicRadius: 3
        }
      }
    }, {
      toolName: toolNames.SegmentBidirectional
    }, {
      toolName: toolNames.SegmentSelect
    }, {
      toolName: 'ThresholdSphereBrushDynamic',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_SPHERE',
        minRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SEGMENTATION_DRAWING_RADIUS,
        threshold: {
          isDynamic: true,
          dynamicRadius: 3
        }
      }
    }, {
      toolName: toolNames.LabelMapEditWithContourTool
    }, {
      toolName: toolNames.CircleScissors
    }, {
      toolName: toolNames.RectangleScissors
    }, {
      toolName: toolNames.SphereScissors
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Magnify
    }, {
      toolName: toolNames.WindowLevelRegion
    }, {
      toolName: toolNames.UltrasoundDirectional
    }, {
      toolName: toolNames.PlanarFreehandContourSegmentation
    }, {
      toolName: toolNames.LivewireContourSegmentation
    }, {
      toolName: toolNames.SculptorTool
    }, {
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: 'CatmullRomSplineROI',
      parentTool: toolNames.SplineContourSegmentation,
      configuration: {
        spline: {
          type: 'CATMULLROM',
          enableTwoPointPreview: true
        }
      }
    }, {
      toolName: 'LinearSplineROI',
      parentTool: toolNames.SplineContourSegmentation,
      configuration: {
        spline: {
          type: 'LINEAR',
          enableTwoPointPreview: true
        }
      }
    }, {
      toolName: 'BSplineROI',
      parentTool: toolNames.SplineContourSegmentation,
      configuration: {
        spline: {
          type: 'BSPLINE',
          enableTwoPointPreview: true
        }
      }
    }],
    disabled: [{
      toolName: toolNames.ReferenceLines
    }, {
      toolName: toolNames.AdvancedMagnify
    }]
  };
  const updatedTools = commandsManager.run('initializeSegmentLabelTool', {
    tools
  });
  return updatedTools;
}
function initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, toolGroupId) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const tools = createTools({
    commandsManager,
    utilityModule
  });
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
function initMPRToolGroup(extensionManager, toolGroupService, commandsManager) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const servicesManager = extensionManager._servicesManager;
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const tools = createTools({
    commandsManager,
    utilityModule
  });
  tools.disabled.push({
    toolName: utilityModule.exports.toolNames.Crosshairs,
    configuration: {
      viewportIndicators: true,
      viewportIndicatorsConfig: {
        circleRadius: 5,
        xOffset: 0.95,
        yOffset: 0.05
      },
      disableOnPassive: true,
      autoPan: {
        enabled: false,
        panSize: 10
      },
      getReferenceLineColor: viewportId => {
        const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
        const viewportOptions = viewportInfo?.viewportOptions;
        if (viewportOptions) {
          return colours[viewportOptions.id] || colorsByOrientation[viewportOptions.orientation] || '#0c0';
        } else {
          console.warn('missing viewport?', viewportId);
          return '#0c0';
        }
      }
    }
  }, {
    toolName: utilityModule.exports.toolNames.ReferenceLines
  });
  toolGroupService.createToolGroupAndAddTools('mpr', tools);
}
function initVolume3DToolGroup(extensionManager, toolGroupService) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.TrackballRotateTool,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }, {
        numTouchPoints: 2
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }]
  };
  toolGroupService.createToolGroupAndAddTools('volume3d', tools);
}
function initToolGroups(extensionManager, toolGroupService, commandsManager) {
  initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, 'default');
  initMPRToolGroup(extensionManager, toolGroupService, commandsManager);
  initVolume3DToolGroup(extensionManager, toolGroupService);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initToolGroups);

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

/***/ "../../../modes/segmentation/src/toolbarButtons.ts"
/*!*********************************************************!*\
  !*** ../../../modes/segmentation/src/toolbarButtons.ts ***!
  \*********************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toolbarButtons: () => (/* binding */ toolbarButtons)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../../modes/segmentation/src/constants.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: ['default', 'mpr', 'SRToolGroup', 'volume3d']
  }
};
const callbacks = toolName => [{
  commandName: 'setViewportForToolConfiguration',
  commandOptions: {
    toolName
  }
}];
const toolbarButtons = [{
  id: 'AdvancedRenderingControls',
  uiType: 'ohif.advancedRenderingControls',
  props: {
    buttonSection: true
  }
}, {
  id: 'modalityLoadBadge',
  uiType: 'ohif.modalityLoadBadge',
  props: {
    icon: 'Status',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Status'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Status'),
    evaluate: {
      name: 'evaluate.modalityLoadBadge',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'navigationComponent',
  uiType: 'ohif.navigationComponent',
  props: {
    icon: 'Navigation',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Navigation'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Navigate between segments/measurements and manage their visibility'),
    evaluate: {
      name: 'evaluate.navigationComponent',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'trackingStatus',
  uiType: 'ohif.trackingStatus',
  props: {
    icon: 'TrackingStatus',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Tracking Status'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:View and manage tracking status of measurements and annotations'),
    evaluate: {
      name: 'evaluate.trackingStatus',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'dataOverlayMenu',
  uiType: 'ohif.dataOverlayMenu',
  props: {
    icon: 'ViewportViews',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Data Overlay'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Configure data overlay options and manage foreground/background display sets'),
    evaluate: 'evaluate.dataOverlayMenu'
  }
}, {
  id: 'orientationMenu',
  uiType: 'ohif.orientationMenu',
  props: {
    icon: 'OrientationSwitch',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Orientation'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Change viewport orientation between axial, sagittal, coronal and reformat planes'),
    evaluate: {
      name: 'evaluate.orientationMenu'
      // hideWhenDisabled: true,
    }
  }
}, {
  id: 'windowLevelMenuEmbedded',
  uiType: 'ohif.windowLevelMenuEmbedded',
  props: {
    icon: 'WindowLevel',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Window Level'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Adjust window/level presets and customize image contrast settings'),
    evaluate: {
      name: 'evaluate.windowLevelMenuEmbedded',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'windowLevelMenu',
  uiType: 'ohif.windowLevelMenu',
  props: {
    icon: 'WindowLevel',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Window Level'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Adjust window/level presets and customize image contrast settings'),
    evaluate: 'evaluate.windowLevelMenu'
  }
}, {
  id: 'voiManualControlMenu',
  uiType: 'ohif.voiManualControlMenu',
  props: {
    icon: 'WindowLevelAdvanced',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Advanced Window Level'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Advanced window/level settings with manual controls and presets'),
    evaluate: 'evaluate.voiManualControlMenu'
  }
}, {
  id: 'thresholdMenu',
  uiType: 'ohif.thresholdMenu',
  props: {
    icon: 'Threshold',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Threshold'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Image threshold settings'),
    evaluate: {
      name: 'evaluate.thresholdMenu',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'opacityMenu',
  uiType: 'ohif.opacityMenu',
  props: {
    icon: 'Opacity',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Opacity'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Image opacity settings'),
    evaluate: {
      name: 'evaluate.opacityMenu',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'Colorbar',
  uiType: 'ohif.colorbar',
  props: {
    type: 'tool',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Colorbar')
  }
},
// sections
{
  id: 'MoreTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
}, {
  id: 'BrushTools',
  uiType: 'ohif.toolBoxButtonGroup',
  props: {
    buttonSection: true
  }
},
// Section containers for the nested toolboxes and toolbars.
{
  id: 'LabelMapUtilities',
  uiType: 'ohif.Toolbar',
  props: {
    buttonSection: true
  }
}, {
  id: 'ContourUtilities',
  uiType: 'ohif.Toolbar',
  props: {
    buttonSection: true
  }
}, {
  id: 'LabelMapTools',
  uiType: 'ohif.toolBoxButtonGroup',
  props: {
    buttonSection: true
  }
}, {
  id: 'ContourTools',
  uiType: 'ohif.toolBoxButtonGroup',
  props: {
    buttonSection: true
  }
},
// tool defs
{
  id: 'Zoom',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-zoom',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Zoom'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'WindowLevel',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-window-level',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Window Level'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Pan',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-move',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Pan'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'TrackballRotate',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-3d-rotate',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:3D Rotate'),
    commands: setToolActiveToolbar,
    evaluate: {
      name: 'evaluate.cornerstoneTool',
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Select a 3D viewport to enable this tool')
    }
  }
}, {
  id: 'Capture',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-capture',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Capture'),
    commands: 'showDownloadViewportModal',
    evaluate: ['evaluate.action', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video', 'wholeSlide']
    }]
  }
}, {
  id: 'Layout',
  uiType: 'ohif.layoutSelector',
  props: {
    rows: 3,
    columns: 4,
    evaluate: 'evaluate.action',
    commands: 'setViewportGridLayout'
  }
}, {
  id: 'Crosshairs',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-crosshair',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Crosshairs'),
    commands: {
      commandName: 'setToolActiveToolbar',
      commandOptions: {
        toolGroupIds: ['mpr']
      }
    },
    evaluate: {
      name: 'evaluate.cornerstoneTool',
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Select an MPR viewport to enable this tool')
    }
  }
}, {
  id: 'Reset',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-reset',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Reset View'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Reset View'),
    commands: 'resetViewport',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'rotate-right',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rotate-right',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Rotate Right'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Rotate +90'),
    commands: 'rotateViewportCW',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'flipHorizontal',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-flip-horizontal',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Flip Horizontal'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Flip Horizontally'),
    commands: 'flipViewportHorizontal',
    evaluate: ['evaluate.viewportProperties.toggle', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['volume3d']
    }]
  }
}, {
  id: 'ReferenceLines',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-referenceLines',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Reference Lines'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Show Reference Lines'),
    commands: 'toggleEnabledDisabledToolbar',
    evaluate: 'evaluate.cornerstoneTool.toggle'
  }
}, {
  id: 'ImageOverlayViewer',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'toggle-dicom-overlay',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Image Overlay'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Toggle Image Overlay'),
    commands: 'toggleEnabledDisabledToolbar',
    evaluate: 'evaluate.cornerstoneTool.toggle'
  }
}, {
  id: 'StackScroll',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-stack-scroll',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Stack Scroll'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Stack Scroll'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'invert',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-invert',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Invert'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Invert Colors'),
    commands: 'invertViewport',
    evaluate: 'evaluate.viewportProperties.toggle'
  }
}, {
  id: 'Cine',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-cine',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Cine'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Cine'),
    commands: 'toggleCine',
    evaluate: ['evaluate.cine', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['volume3d']
    }]
  }
}, {
  id: 'Magnify',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-magnify',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Zoom-in'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Zoom-in'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'TagBrowser',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'dicom-tag-browser',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Dicom Tag Browser'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Dicom Tag Browser'),
    commands: 'openDICOMTagViewer'
  }
}, {
  id: 'PlanarFreehandContourSegmentationTool',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-tool-freehand-roi',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Freehand Segmentation'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Freehand Segmentation'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['PlanarFreehandContourSegmentationTool'],
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Create new segmentation to enable this tool.')
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Contour'
    }],
    commands: [{
      commandName: 'setToolActiveToolbar',
      commandOptions: {
        bindings: [{
          mouseButton: 1 // Left Click
        }, {
          mouseButton: 1,
          // Left Click+Shift to create a hole
          modifierKey: 16 // Shift
        }]
      }
    }, {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Contour'
      }
    }],
    options: [{
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Interpolate Contours'),
      type: 'switch',
      id: 'planarFreehandInterpolateContours',
      value: false,
      commands: {
        commandName: 'setInterpolationToolConfiguration'
      }
    }]
  }
}, {
  id: 'LivewireContourSegmentationTool',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-tool-livewire',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Livewire Contour'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Livewire Contour'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['LivewireContourSegmentationTool'],
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Create new segmentation to enable this tool.')
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Contour'
    }],
    commands: [{
      commandName: 'setToolActiveToolbar',
      commandOptions: {
        bindings: [{
          mouseButton: 1 // Left Click
        }, {
          mouseButton: 1,
          // Left Click+Shift to create a hole
          modifierKey: 16 // Shift
        }]
      }
    }, {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Contour'
      }
    }],
    options: [{
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Interpolate Contours'),
      type: 'switch',
      id: 'livewireInterpolateContours',
      value: false,
      commands: {
        commandName: 'setInterpolationToolConfiguration'
      }
    }]
  }
}, {
  id: 'SplineContourSegmentationTool',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-tool-spline-roi',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Spline Contour Segmentation Tool'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Spline Contour Segmentation Tool'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['CatmullRomSplineROI', 'LinearSplineROI', 'BSplineROI'],
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Create new segmentation to enable this tool.')
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Contour'
    }],
    commands: [{
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Contour'
      }
    }],
    options: [{
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Spline Type'),
      type: 'select',
      id: 'splineTypeSelect',
      value: 'CatmullRomSplineROI',
      values: [{
        id: 'CatmullRomSplineROI',
        value: 'CatmullRomSplineROI',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Catmull Rom Spline')
      }, {
        id: 'LinearSplineROI',
        value: 'LinearSplineROI',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Linear Spline')
      }, {
        id: 'BSplineROI',
        value: 'BSplineROI',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:B-Spline')
      }],
      commands: {
        commandName: 'setToolActiveToolbar',
        commandOptions: {
          bindings: [{
            mouseButton: 1 // Left Click
          }, {
            mouseButton: 1,
            // Left Click+Shift to create a hole
            modifierKey: 16 // Shift
          }]
        }
      }
    }, {
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Simplified Spline'),
      type: 'switch',
      id: 'simplifiedSpline',
      value: true,
      commands: {
        commandName: 'setSimplifiedSplineForSplineContourSegmentationTool'
      }
    }, {
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Interpolate Contours'),
      type: 'switch',
      id: 'splineInterpolateContours',
      value: false,
      commands: {
        commandName: 'setInterpolationToolConfiguration',
        commandOptions: {
          toolNames: ['CatmullRomSplineROI', 'LinearSplineROI', 'BSplineROI']
        }
      }
    }]
  }
}, {
  id: 'SculptorTool',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-tool-sculptor',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Sculptor Tool'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Sculptor Tool'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['SculptorTool'],
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Create new segmentation to enable this tool.')
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Contour'
    }],
    commands: ['setToolActiveToolbar', {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Contour'
      }
    }],
    options: [{
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Dynamic Cursor Size'),
      type: 'switch',
      id: 'dynamicCursorSize',
      value: true,
      commands: {
        commandName: 'setDynamicCursorSizeForSculptorTool'
      }
    }]
  }
}, {
  id: 'Brush',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-tool-brush',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Brush'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['CircularBrush', 'SphereBrush'],
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Create new segmentation to enable this tool.')
    }, {
      name: 'evaluate.cornerstone.segmentation.synchronizeDrawingRadius',
      radiusOptionId: 'brush-radius'
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }],
    commands: {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    },
    options: [{
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Radius (mm)'),
      id: 'brush-radius',
      type: 'range',
      explicitRunOnly: true,
      min: _constants__WEBPACK_IMPORTED_MODULE_2__.MIN_SEGMENTATION_DRAWING_RADIUS,
      max: _constants__WEBPACK_IMPORTED_MODULE_2__.MAX_SEGMENTATION_DRAWING_RADIUS,
      step: 0.5,
      value: 25,
      commands: [{
        commandName: 'setBrushSize',
        commandOptions: {
          toolNames: ['CircularBrush', 'SphereBrush']
        }
      }]
    }, {
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Shape'),
      type: 'radio',
      id: 'brush-mode',
      value: 'CircularBrush',
      values: [{
        value: 'CircularBrush',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Circle')
      }, {
        value: 'SphereBrush',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Sphere')
      }],
      commands: ['setToolActiveToolbar']
    }]
  }
}, {
  id: 'InterpolateLabelmap',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'actions-interpolate',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Interpolate Labelmap'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Automatically fill in missing slices between drawn segments. Use brush or threshold tools on at least two slices, then click to interpolate across slices. Works in any direction. Volume must be reconstructable.'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation'
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }, {
      name: 'evaluate.displaySetIsReconstructable',
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:The current viewport cannot handle interpolation.')
    }],
    commands: [{
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    }, 'interpolateLabelmap']
  }
}, {
  id: 'SegmentBidirectional',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'actions-bidirectional',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Segment Bidirectional'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Automatically detects the largest length and width across slices for the selected segment and displays a bidirectional measurement.'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Create new segmentation to enable this tool.')
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }],
    commands: [{
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    }, 'runSegmentBidirectional']
  }
}, {
  id: 'RegionSegmentPlus',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-tool-click-segment',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:One Click Segment'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Detects segmentable regions with one click. Hover for visual feedback—click when a plus sign appears to auto-segment the lesion.'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['RegionSegmentPlus'],
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Create new segmentation to enable this tool.')
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }],
    commands: ['setToolActiveToolbar', {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    }]
  }
}, {
  id: 'LabelmapSlicePropagation',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-labelmap-slice-propagation',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Labelmap Assist'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Toggle AI assistance for segmenting nearby slices. After drawing on a slice, scroll to preview predictions. Press Enter to accept or Esc to skip.'),
    evaluate: ['evaluate.cornerstoneTool.toggle', {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }],
    listeners: {
      [_ohif_core__WEBPACK_IMPORTED_MODULE_0__.ViewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: callbacks('LabelmapSlicePropagation'),
      [_ohif_core__WEBPACK_IMPORTED_MODULE_0__.ViewportGridService.EVENTS.VIEWPORTS_READY]: callbacks('LabelmapSlicePropagation')
    },
    commands: [{
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    }, 'toggleEnabledDisabledToolbar']
  }
}, {
  id: 'MarkerLabelmap',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-marker-labelmap',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Marker Guided Labelmap'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Use include/exclude markers to guide AI (SAM) segmentation. Click to place markers, Enter to accept results, Esc to reject, and N to go to the next slice while keeping markers.'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['MarkerLabelmap', 'MarkerInclude', 'MarkerExclude']
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }],
    commands: ['setToolActiveToolbar', {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    }],
    listeners: {
      [_ohif_core__WEBPACK_IMPORTED_MODULE_0__.ViewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: callbacks('MarkerLabelmap'),
      [_ohif_core__WEBPACK_IMPORTED_MODULE_0__.ViewportGridService.EVENTS.VIEWPORTS_READY]: callbacks('MarkerLabelmap')
    },
    options: [{
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Marker Mode'),
      type: 'radio',
      id: 'marker-mode',
      value: 'markerInclude',
      values: [{
        value: 'markerInclude',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Include')
      }, {
        value: 'markerExclude',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Exclude')
      }],
      commands: ({
        commandsManager,
        options
      }) => {
        const markerModeOption = options.find(option => option.id === 'marker-mode');
        if (markerModeOption.value === 'markerInclude') {
          commandsManager.run('setToolActive', {
            toolName: 'MarkerInclude'
          });
        } else {
          commandsManager.run('setToolActive', {
            toolName: 'MarkerExclude'
          });
        }
      }
    }, {
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Clear Markers'),
      type: 'button',
      id: 'clear-markers',
      commands: 'clearMarkersForMarkerLabelmap'
    }]
  }
}, {
  id: 'Eraser',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-tool-eraser',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Eraser'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['CircularEraser', 'SphereEraser']
    }, {
      name: 'evaluate.cornerstone.segmentation.synchronizeDrawingRadius',
      radiusOptionId: 'eraser-radius'
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }],
    options: [{
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Radius (mm)'),
      id: 'eraser-radius',
      type: 'range',
      explicitRunOnly: true,
      min: _constants__WEBPACK_IMPORTED_MODULE_2__.MIN_SEGMENTATION_DRAWING_RADIUS,
      max: _constants__WEBPACK_IMPORTED_MODULE_2__.MAX_SEGMENTATION_DRAWING_RADIUS,
      step: 0.5,
      value: 25,
      commands: {
        commandName: 'setBrushSize',
        commandOptions: {
          toolNames: ['CircularEraser', 'SphereEraser']
        }
      }
    }, {
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Shape'),
      type: 'radio',
      id: 'eraser-mode',
      value: 'CircularEraser',
      values: [{
        value: 'CircularEraser',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Circle')
      }, {
        value: 'SphereEraser',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Sphere')
      }],
      commands: 'setToolActiveToolbar'
    }],
    commands: {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    }
  }
}, {
  id: 'Threshold',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-tool-threshold',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Threshold Tool'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush', 'ThresholdCircularBrushDynamic', 'ThresholdSphereBrushDynamic']
    }, {
      name: 'evaluate.cornerstone.segmentation.synchronizeDrawingRadius',
      radiusOptionId: 'threshold-radius'
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }],
    commands: {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    },
    options: [{
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Radius (mm)'),
      id: 'threshold-radius',
      type: 'range',
      explicitRunOnly: true,
      min: _constants__WEBPACK_IMPORTED_MODULE_2__.MIN_SEGMENTATION_DRAWING_RADIUS,
      max: _constants__WEBPACK_IMPORTED_MODULE_2__.MAX_SEGMENTATION_DRAWING_RADIUS,
      step: 0.5,
      value: 25,
      commands: {
        commandName: 'setBrushSize',
        commandOptions: {
          toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush', 'ThresholdCircularBrushDynamic', 'ThresholdSphereBrushDynamic']
        }
      }
    }, {
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Shape'),
      type: 'radio',
      id: 'threshold-shape',
      value: 'ThresholdCircularBrush',
      values: [{
        value: 'ThresholdCircularBrush',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Circle')
      }, {
        value: 'ThresholdSphereBrush',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Sphere')
      }],
      commands: ({
        value,
        commandsManager,
        options
      }) => {
        const optionsDynamic = options.find(option => option.id === 'dynamic-mode');
        if (optionsDynamic.value === 'ThresholdDynamic') {
          commandsManager.run('setToolActive', {
            toolName: value === 'ThresholdCircularBrush' ? 'ThresholdCircularBrushDynamic' : 'ThresholdSphereBrushDynamic'
          });
        } else {
          commandsManager.run('setToolActive', {
            toolName: value
          });
        }
      }
    }, {
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Threshold'),
      type: 'radio',
      id: 'dynamic-mode',
      value: 'ThresholdDynamic',
      values: [{
        value: 'ThresholdDynamic',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Dynamic')
      }, {
        value: 'ThresholdRange',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Range')
      }],
      commands: ({
        value,
        commandsManager,
        options
      }) => {
        const thresholdRangeOption = options.find(option => option.id === 'threshold-shape');
        if (value === 'ThresholdDynamic') {
          commandsManager.run('setToolActiveToolbar', {
            toolName: thresholdRangeOption.value === 'ThresholdCircularBrush' ? 'ThresholdCircularBrushDynamic' : 'ThresholdSphereBrushDynamic'
          });
        } else {
          commandsManager.run('setToolActiveToolbar', {
            toolName: thresholdRangeOption.value
          });
          const thresholdRangeValue = options.find(option => option.id === 'threshold-range').value;
          commandsManager.run('setThresholdRange', {
            toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush'],
            value: thresholdRangeValue
          });
        }
      }
    }, {
      name: 'ThresholdRange',
      type: 'double-range',
      id: 'threshold-range',
      min: -1000,
      max: 1000,
      step: 1,
      value: [50, 600],
      condition: ({
        options
      }) => options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
      commands: {
        commandName: 'setThresholdRange',
        commandOptions: {
          toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush']
        }
      }
    }]
  }
}, {
  id: 'Shapes',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'icon-tool-shape',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Shapes'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['CircleScissor', 'SphereScissor', 'RectangleScissor'],
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Create new segmentation to enable shapes tool.')
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }],
    commands: {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    },
    options: [{
      name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Shape'),
      type: 'radio',
      value: 'CircleScissor',
      id: 'shape-mode',
      values: [{
        value: 'CircleScissor',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Circle')
      }, {
        value: 'SphereScissor',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Sphere')
      }, {
        value: 'RectangleScissor',
        label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Rectangle')
      }],
      commands: 'setToolActiveToolbar'
    }]
  }
}, {
  id: 'SimplifyContours',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'actions-simplify',
    label: 'Simplify Contours',
    tooltip: 'Simplify Contours',
    commands: ['toggleActiveSegmentationUtility'],
    evaluate: [{
      name: 'cornerstone.isActiveSegmentationUtility'
    }],
    options: 'cornerstone.SimplifyContourOptions'
  }
}, {
  id: 'SmoothContours',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'actions-smooth',
    label: 'Smooth Contours',
    tooltip: 'Smooth Contours',
    commands: ['toggleActiveSegmentationUtility'],
    evaluate: [{
      name: 'cornerstone.isActiveSegmentationUtility'
    }],
    options: 'cornerstone.SmoothContoursOptions'
  }
}, {
  id: 'LogicalContourOperations',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'actions-combine',
    label: 'Combine Contours',
    tooltip: 'Combine Contours',
    commands: ['toggleActiveSegmentationUtility'],
    evaluate: [{
      name: 'cornerstone.isActiveSegmentationUtility'
    }],
    options: 'cornerstone.LogicalContourOperationsOptions'
  }
}, {
  id: 'LabelMapEditWithContour',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'tool-labelmap-edit-with-contour',
    label: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Labelmap Edit with Contour Tool'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t('Buttons:Labelmap Edit with Contour Tool'),
    commands: ['setToolActiveToolbar', {
      commandName: 'activateSelectedSegmentationOfType',
      commandOptions: {
        segmentationRepresentationType: 'Labelmap'
      }
    }],
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['LabelMapEditWithContour'],
      disabledText: 'Create new segmentation to enable this tool.'
    }, {
      name: 'evaluate.cornerstone.hasSegmentationOfType',
      segmentationRepresentationType: 'Labelmap'
    }]
  }
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toolbarButtons);

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

/***/ "../../../modes/segmentation/src/utils/setUpAutoTabSwitchHandler.ts"
/*!**************************************************************************!*\
  !*** ../../../modes/segmentation/src/utils/setUpAutoTabSwitchHandler.ts ***!
  \**************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setUpAutoTabSwitchHandler)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Sets up auto tab switching for when the first segmentation is added into the viewer.
 */
function setUpAutoTabSwitchHandler({
  segmentationService,
  viewportGridService,
  panelService
}) {
  const autoTabSwitchEvents = [segmentationService.EVENTS.SEGMENTATION_MODIFIED, segmentationService.EVENTS.SEGMENTATION_REPRESENTATION_MODIFIED];

  // Initially there are no segmentations, so we should switch the tab whenever the first segmentation is added.
  let shouldSwitchTab = true;
  const unsubscribeAutoTabSwitchEvents = autoTabSwitchEvents.map(eventName => segmentationService.subscribe(eventName, () => {
    const segmentations = segmentationService.getSegmentations();
    if (!segmentations.length) {
      // If all the segmentations are removed, then the next time a segmentation is added, we should switch the tab.
      shouldSwitchTab = true;
      return;
    }
    const activeViewportId = viewportGridService.getActiveViewportId();
    const activeRepresentation = segmentationService.getSegmentationRepresentations(activeViewportId)?.find(representation => representation.active);
    if (activeRepresentation && shouldSwitchTab) {
      shouldSwitchTab = false;
      switch (activeRepresentation.type) {
        case 'Labelmap':
          panelService.activatePanel('@ohif/extension-cornerstone.panelModule.panelSegmentationWithToolsLabelMap', true);
          break;
        case 'Contour':
          panelService.activatePanel('@ohif/extension-cornerstone.panelModule.panelSegmentationWithToolsContour', true);
          break;
      }
    }
  })).map(subscription => subscription.unsubscribe);
  return {
    unsubscribeAutoTabSwitchEvents
  };
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

/***/ "../../../modes/segmentation/package.json"
/*!************************************************!*\
  !*** ../../../modes/segmentation/package.json ***!
  \************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/mode-segmentation","version":"3.13.0-beta.20","description":"OHIF segmentation mode which enables labelmap segmentation read/edit/export","author":"@ohif","license":"MIT","main":"dist/umd/@ohif/mode-segmentation/index.umd.js","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-mode"],"publishConfig":{"access":"public"},"module":"src/index.tsx","engines":{"node":">=14","npm":">=7","yarn":">=1.16.0"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.13.0-beta.20","@ohif/extension-cornerstone":"3.13.0-beta.20","@ohif/extension-cornerstone-dicom-rt":"3.13.0-beta.20","@ohif/extension-cornerstone-dicom-seg":"3.13.0-beta.20","@ohif/extension-cornerstone-dicom-sr":"3.13.0-beta.20","@ohif/extension-default":"3.13.0-beta.20","@ohif/extension-dicom-pdf":"3.13.0-beta.20","@ohif/extension-dicom-video":"3.13.0-beta.20","@ohif/mode-basic":"3.13.0-beta.20"},"dependencies":{"@babel/runtime":"7.28.2","i18next":"17.3.1"},"devDependencies":{"@babel/core":"7.28.0","@babel/plugin-syntax-dynamic-import":"7.8.3","@babel/plugin-transform-arrow-functions":"7.27.1","@babel/plugin-transform-class-properties":"7.27.1","@babel/plugin-transform-object-rest-spread":"7.28.0","@babel/plugin-transform-private-methods":"7.27.1","@babel/plugin-transform-regenerator":"7.28.1","@babel/plugin-transform-runtime":"7.28.0","@babel/plugin-transform-typescript":"7.28.0","@babel/preset-env":"7.28.0","@babel/preset-react":"7.27.1","@babel/preset-typescript":"7.27.1","@svgr/webpack":"8.1.0","babel-loader":"8.4.1","clean-webpack-plugin":"3.0.0","copy-webpack-plugin":"9.1.0","cross-env":"7.0.3","dotenv":"8.6.0","webpack":"5.105.0","webpack-cli":"5.1.4","webpack-merge":"5.10.0"}}');

/***/ }

}]);
//# sourceMappingURL=modes_segmentation_src_index_tsx.js.map