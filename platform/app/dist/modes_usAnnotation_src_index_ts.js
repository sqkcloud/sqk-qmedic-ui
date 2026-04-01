"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_usAnnotation_src_index_ts"],{

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

/***/ "../../../modes/usAnnotation/src/id.js"
/*!*********************************************!*\
  !*** ../../../modes/usAnnotation/src/id.js ***!
  \*********************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/usAnnotation/package.json");
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

/***/ "../../../modes/usAnnotation/src/index.ts"
/*!************************************************!*\
  !*** ../../../modes/usAnnotation/src/index.ts ***!
  \************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   initToolGroups: () => (/* reexport safe */ _initToolGroups__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   toolbarButtons: () => (/* reexport safe */ _toolbarButtons__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id */ "../../../modes/usAnnotation/src/id.js");
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initToolGroups */ "../../../modes/usAnnotation/src/initToolGroups.js");
/* harmony import */ var _toolbarButtons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toolbarButtons */ "../../../modes/usAnnotation/src/toolbarButtons.ts");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _extensions_usAnnotation_src_PleuraBlinePercentage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../extensions/usAnnotation/src/PleuraBlinePercentage */ "../../../extensions/usAnnotation/src/PleuraBlinePercentage.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList',
  wsiSopClassHandler: '@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler'
};
const cornerstone = {
  measurements: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
  segmentation: '@ohif/extension-cornerstone.panelModule.panelSegmentation'
};
const tracked = {
  measurements: '@ohif/extension-measurement-tracking.panelModule.trackedMeasurements',
  thumbnailList: '@ohif/extension-measurement-tracking.panelModule.seriesList',
  viewport: '@ohif/extension-measurement-tracking.viewportModule.cornerstone-tracked'
};
const dicomsr = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr',
  sopClassHandler3D: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr-3d',
  viewport: '@ohif/extension-cornerstone-dicom-sr.viewportModule.dicom-sr'
};
const dicomvideo = {
  sopClassHandler: '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video',
  viewport: '@ohif/extension-dicom-video.viewportModule.dicom-video'
};
const dicompdf = {
  sopClassHandler: '@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf',
  viewport: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf'
};
const dicomSeg = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-seg.sopClassHandlerModule.dicom-seg',
  viewport: '@ohif/extension-cornerstone-dicom-seg.viewportModule.dicom-seg'
};
const dicomPmap = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-pmap.sopClassHandlerModule.dicom-pmap',
  viewport: '@ohif/extension-cornerstone-dicom-pmap.viewportModule.dicom-pmap'
};
const dicomRT = {
  viewport: '@ohif/extension-cornerstone-dicom-rt.viewportModule.dicom-rt',
  sopClassHandler: '@ohif/extension-cornerstone-dicom-rt.sopClassHandlerModule.dicom-rt'
};
const usAnnotation = {
  panel: '@ohif/extension-ultrasound-pleura-bline.panelModule.USAnnotationPanel'
};
let settingsSaved = {};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-measurement-tracking': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-pmap': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-rt': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1',
  '@ohif/extension-ultrasound-pleura-bline': '^3.0.0'
};
function modeFactory({
  modeConfiguration
}) {
  let _activatePanelTriggersSubscriptions = [];
  return {
    // TODO: We're using this as a route segment
    // We should not be.
    id: _id__WEBPACK_IMPORTED_MODULE_1__.id,
    routeName: 'usAnnotation',
    displayName: i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t('US Pleura B-line Annotations'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: function ({
      servicesManager,
      extensionManager,
      commandsManager,
      appConfig
    }) {
      settingsSaved = {
        disableConfirmationPrompts: appConfig?.disableConfirmationPrompts,
        measurementTrackingMode: appConfig?.measurementTrackingMode
      };
      appConfig.disableConfirmationPrompts = true;
      appConfig.measurementTrackingMode = 'simplified';
      const {
        measurementService,
        toolbarService,
        toolGroupService,
        customizationService
      } = servicesManager.services;
      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      (0,_initToolGroups__WEBPACK_IMPORTED_MODULE_2__["default"])(extensionManager, toolGroupService, commandsManager);
      toolbarService.register(_toolbarButtons__WEBPACK_IMPORTED_MODULE_3__["default"]);
      toolbarService.updateSection(toolbarService.sections.primary, ['MeasurementTools', 'Zoom', 'Pan', 'TrackballRotate', 'WindowLevel', 'Capture', 'Layout', 'Crosshairs', 'MoreTools']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.topLeft, ['orientationMenu', 'dataOverlayMenu']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.bottomMiddle, ['AdvancedRenderingControls']);
      toolbarService.updateSection(toolbarService.sections.advancedRenderingControlsSection, ['windowLevelMenuEmbedded', 'voiManualControlMenu', 'Colorbar', 'opacityMenu', 'thresholdMenu']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.topRight, ['modalityLoadBadge', 'trackingStatus', 'navigationComponent']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.bottomLeft, ['windowLevelMenu']);
      toolbarService.updateSection(toolbarService.sections.measurementSection, ['Length', 'Bidirectional', 'ArrowAnnotate', 'EllipticalROI', 'RectangleROI', 'CircleROI', 'PlanarFreehandROI', 'SplineROI', 'LivewireContour']);
      toolbarService.updateSection(toolbarService.sections.moreToolsSection, ['Reset', 'rotate-right', 'flipHorizontal', 'ImageSliceSync', 'ReferenceLines', 'ImageOverlayViewer', 'StackScroll', 'invert', 'Probe', 'Cine', 'Angle', 'CobbAngle', 'Magnify', 'CalibrationLine', 'TagBrowser', 'AdvancedMagnify', 'UltrasoundDirectionalTool', 'UltrasoundPleuraBLineTool', 'WindowLevelRegion']);
      customizationService.setCustomizations({
        'panelSegmentation.disableEditing': {
          $set: true
        },
        autoCineModalities: {
          $set: []
        },
        'ohif.hotkeyBindings': {
          $push: [{
            commandName: 'switchUSAnnotationToPleuraLine',
            label: 'Add new pleura line',
            keys: ['W']
          }, {
            commandName: 'switchUSAnnotationToBLine',
            label: 'Add new B-line',
            keys: ['S']
          }, {
            commandName: 'deleteLastPleuraAnnotation',
            label: 'Delete last pleura line',
            keys: ['E']
          }, {
            commandName: 'deleteLastBLineAnnotation',
            label: 'Delete last B-line',
            keys: ['D']
          }, {
            commandName: 'toggleDisplayFanAnnotation',
            label: 'Toggle overlay',
            keys: ['O']
          }]
        },
        measurementsContextMenu: {
          inheritsFrom: 'ohif.contextMenu',
          menus: [
          // Get the items from the UI Customization for the menu name (and have a custom name)
          {
            id: 'forExistingMeasurement',
            selector: ({
              nearbyToolData
            }) => !!nearbyToolData,
            items: [{
              label: 'Delete annotation',
              commands: 'removeMeasurement'
            }]
          }]
        },
        'viewportOverlay.topLeft': [{
          id: 'BLinePleuraPercentage',
          inheritsFrom: 'ohif.overlayItem',
          label: '',
          title: 'BLinePleuraPercentage',
          condition: ({
            referenceInstance
          }) => referenceInstance?.Modality.includes('US') && _extensions_usAnnotation_src_PleuraBlinePercentage__WEBPACK_IMPORTED_MODULE_5__.showPercentage,
          contentF: () => {
            const {
              viewportGridService,
              toolGroupService,
              cornerstoneViewportService
            } = servicesManager.services;
            const activeViewportId = viewportGridService.getActiveViewportId();
            const toolGroup = toolGroupService.getToolGroupForViewport(activeViewportId);
            if (!toolGroup) {
              return 'B-Line/Pleura : N/A';
            }
            const usAnnotation = toolGroup.getToolInstance(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_4__.UltrasoundPleuraBLineTool.toolName);
            if (usAnnotation) {
              const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
              const percentage = usAnnotation.calculateBLinePleuraPercentage(viewport);
              if (percentage !== undefined) {
                return `B-Line/Pleura : ${percentage.toFixed(2)} %`;
              } else {
                return 'B-Line/Pleura : N/A';
              }
            }
            return 'B-Line/Pleura : N/A';
          }
        }]
      }, 'mode');
    },
    onModeExit: ({
      servicesManager
    }) => {
      appConfig.disableConfirmationPrompts = settingsSaved.disableConfirmationPrompts;
      appConfig.measurementTrackingMode = settingsSaved.measurementTrackingMode;
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      _activatePanelTriggersSubscriptions.forEach(sub => sub.unsubscribe());
      _activatePanelTriggersSubscriptions = [];
      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: function ({
      modalities
    }) {
      const modalities_list = modalities.split('\\');
      return {
        valid: modalities_list.includes('US'),
        description: 'Pleura b-lines annotation mode when the study involves US modality series'
      };
    },
    routes: [{
      path: 'longitudinal',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: () => {
        return {
          id: ohif.layout,
          props: {
            leftPanels: [tracked.thumbnailList],
            leftPanelResizable: true,
            rightPanels: [usAnnotation.panel, cornerstone.segmentation, tracked.measurements],
            rightPanelResizable: true,
            viewports: [{
              namespace: tracked.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler, dicomvideo.sopClassHandler, dicomsr.sopClassHandler3D, ohif.wsiSopClassHandler]
            }, {
              namespace: dicomsr.viewport,
              displaySetsToDisplay: [dicomsr.sopClassHandler]
            }, {
              namespace: dicompdf.viewport,
              displaySetsToDisplay: [dicompdf.sopClassHandler]
            }, {
              namespace: dicomSeg.viewport,
              displaySetsToDisplay: [dicomSeg.sopClassHandler]
            }, {
              namespace: dicomPmap.viewport,
              displaySetsToDisplay: [dicomPmap.sopClassHandler]
            }, {
              namespace: dicomRT.viewport,
              displaySetsToDisplay: [dicomRT.sopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    // Default protocol gets self-registered by default in the init
    hangingProtocol: 'default',
    // Order is important in sop class handlers when two handlers both use
    // the same sop class under different situations.  In that case, the more
    // general handler needs to come last.  For this case, the dicomvideo must
    // come first to remove video transfer syntax before ohif uses images
    sopClassHandlers: [dicomvideo.sopClassHandler, dicomSeg.sopClassHandler, dicomPmap.sopClassHandler, ohif.sopClassHandler, ohif.wsiSopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler3D, dicomsr.sopClassHandler, dicomRT.sopClassHandler],
    ...modeConfiguration
  };
}
const mode = {
  id: _id__WEBPACK_IMPORTED_MODULE_1__.id,
  modeFactory,
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

/***/ "../../../modes/usAnnotation/src/initToolGroups.js"
/*!*********************************************************!*\
  !*** ../../../modes/usAnnotation/src/initToolGroups.js ***!
  \*********************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
function initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, toolGroupId) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.UltrasoundAnnotation,
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
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }]
    }],
    passive: [{
      toolName: toolNames.Length
    }, {
      toolName: toolNames.ArrowAnnotate,
      configuration: {
        getTextCallback: (callback, eventDetails) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            eventDetails
          });
        },
        changeTextCallback: (data, eventDetails, callback) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            data,
            eventDetails
          });
        }
      }
    }, {
      toolName: toolNames.SegmentBidirectional
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.DragProbe
    }, {
      toolName: toolNames.Probe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.CircleROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.CobbAngle
    }, {
      toolName: toolNames.Magnify
    }, {
      toolName: toolNames.CalibrationLine
    }, {
      toolName: toolNames.PlanarFreehandContourSegmentation,
      configuration: {
        displayOnePointAsCrosshairs: true
      }
    }, {
      toolName: toolNames.UltrasoundDirectional
    }, {
      toolName: toolNames.WindowLevel
    }, {
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: toolNames.SplineROI
    }, {
      toolName: toolNames.LivewireContour
    }, {
      toolName: toolNames.WindowLevelRegion
    }],
    enabled: [{
      toolName: toolNames.ImageOverlayViewer
    }, {
      toolName: toolNames.ReferenceLines
    }],
    disabled: [{
      toolName: toolNames.AdvancedMagnify
    }]
  };
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
function initSRToolGroup(extensionManager, toolGroupService) {
  const SRUtilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone-dicom-sr.utilityModule.tools');
  if (!SRUtilityModule) {
    return;
  }
  const CS3DUtilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames: SRToolNames
  } = SRUtilityModule.exports;
  const {
    toolNames,
    Enums
  } = CS3DUtilityModule.exports;
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
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }]
    }],
    passive: [{
      toolName: SRToolNames.SRLength
    }, {
      toolName: SRToolNames.SRArrowAnnotate
    }, {
      toolName: SRToolNames.SRBidirectional
    }, {
      toolName: SRToolNames.SREllipticalROI
    }, {
      toolName: SRToolNames.SRCircleROI
    }, {
      toolName: SRToolNames.SRPlanarFreehandROI
    }, {
      toolName: SRToolNames.SRRectangleROI
    }, {
      toolName: toolNames.WindowLevelRegion
    }],
    enabled: [{
      toolName: SRToolNames.DICOMSRDisplay
    }]
    // disabled
  };
  const toolGroupId = 'SRToolGroup';
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
function initMPRToolGroup(extensionManager, toolGroupService, commandsManager) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const serviceManager = extensionManager._servicesManager;
  const {
    cornerstoneViewportService
  } = serviceManager.services;
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
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }]
    }],
    passive: [{
      toolName: toolNames.Length
    }, {
      toolName: toolNames.ArrowAnnotate,
      configuration: {
        getTextCallback: (callback, eventDetails) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            eventDetails
          });
        },
        changeTextCallback: (data, eventDetails, callback) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            data,
            eventDetails
          });
        }
      }
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.DragProbe
    }, {
      toolName: toolNames.Probe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.CircleROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.CobbAngle
    }, {
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: toolNames.SplineROI
    }, {
      toolName: toolNames.LivewireContour
    }, {
      toolName: toolNames.WindowLevelRegion
    }, {
      toolName: toolNames.PlanarFreehandContourSegmentation,
      configuration: {
        displayOnePointAsCrosshairs: true
      }
    }],
    disabled: [{
      toolName: toolNames.Crosshairs,
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
      toolName: toolNames.AdvancedMagnify
    }, {
      toolName: toolNames.ReferenceLines
    }]
  };
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
  initSRToolGroup(extensionManager, toolGroupService);
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

/***/ "../../../modes/usAnnotation/src/toolbarButtons.ts"
/*!*********************************************************!*\
  !*** ../../../modes/usAnnotation/src/toolbarButtons.ts ***!
  \*********************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   setToolActiveToolbar: () => (/* binding */ setToolActiveToolbar)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const callbacks = toolName => [{
  commandName: 'setViewportForToolConfiguration',
  commandOptions: {
    toolName
  }
}];
const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: ['default', 'mpr', 'SRToolGroup', 'volume3d']
  }
};
const toolbarButtons = [
// sections
{
  id: 'MeasurementTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: 'measurementSection'
  }
}, {
  id: 'MoreTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: 'moreToolsSection'
  }
}, {
  id: 'AdvancedRenderingControls',
  uiType: 'ohif.advancedRenderingControls',
  props: {
    buttonSection: 'advancedRenderingControlsSection'
  }
},
// tool defs
{
  id: 'modalityLoadBadge',
  uiType: 'ohif.modalityLoadBadge',
  props: {
    icon: 'Status',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Status'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Status'),
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
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Navigation'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Navigate between segments/measurements and manage their visibility'),
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
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Tracking Status'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:View and manage tracking status of measurements and annotations'),
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
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Data Overlay'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Configure data overlay options and manage foreground/background display sets'),
    evaluate: 'evaluate.dataOverlayMenu'
  }
}, {
  id: 'orientationMenu',
  uiType: 'ohif.orientationMenu',
  props: {
    icon: 'OrientationSwitch',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Orientation'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Change viewport orientation between axial, sagittal, coronal and reformat planes'),
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
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Window Level'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Adjust window/level presets and customize image contrast settings'),
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
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Window Level'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Adjust window/level presets and customize image contrast settings'),
    evaluate: {
      name: 'evaluate.windowLevelMenu'
    }
  }
}, {
  id: 'voiManualControlMenu',
  uiType: 'ohif.voiManualControlMenu',
  props: {
    icon: 'WindowLevelAdvanced',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Advanced Window Level'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Advanced window/level settings with manual controls and presets'),
    evaluate: 'evaluate.voiManualControlMenu'
  }
}, {
  id: 'thresholdMenu',
  uiType: 'ohif.thresholdMenu',
  props: {
    icon: 'Threshold',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Threshold'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Image threshold settings'),
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
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Opacity'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Image opacity settings'),
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
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Colorbar')
  }
}, {
  id: 'Reset',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-reset',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Reset View'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Reset View'),
    commands: 'resetViewport',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'rotate-right',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rotate-right',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Rotate Right'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Rotate +90'),
    commands: 'rotateViewportCW',
    evaluate: ['evaluate.action', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'flipHorizontal',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-flip-horizontal',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Flip Horizontal'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Flip Horizontally'),
    commands: 'flipViewportHorizontal',
    evaluate: ['evaluate.viewportProperties.toggle', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video', 'volume3d']
    }]
  }
}, {
  id: 'ImageSliceSync',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'link',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Image Slice Sync'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Enable position synchronization on stack viewports'),
    commands: {
      commandName: 'toggleSynchronizer',
      commandOptions: {
        type: 'imageSlice'
      }
    },
    listeners: {
      [_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.EVENTS.VIEWPORT_NEW_IMAGE_SET]: {
        commandName: 'toggleImageSliceSync',
        commandOptions: {
          toggledState: true
        }
      }
    },
    evaluate: ['evaluate.cornerstone.synchronizer', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video', 'volume3d']
    }]
  }
}, {
  id: 'ReferenceLines',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-referenceLines',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Reference Lines'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Show Reference Lines'),
    commands: 'toggleEnabledDisabledToolbar',
    listeners: {
      [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.ViewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: callbacks('ReferenceLines'),
      [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.ViewportGridService.EVENTS.VIEWPORTS_READY]: callbacks('ReferenceLines')
    },
    evaluate: ['evaluate.cornerstoneTool.toggle', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'ImageOverlayViewer',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'toggle-dicom-overlay',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Image Overlay'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Toggle Image Overlay'),
    commands: 'toggleEnabledDisabledToolbar',
    evaluate: ['evaluate.cornerstoneTool.toggle', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'StackScroll',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-stack-scroll',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Stack Scroll'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Stack Scroll'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'invert',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-invert',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Invert'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Invert Colors'),
    commands: 'invertViewport',
    evaluate: ['evaluate.viewportProperties.toggle', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'Probe',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-probe',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Probe'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Probe'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Cine',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-cine',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Cine'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Cine'),
    commands: 'toggleCine',
    evaluate: ['evaluate.cine', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['volume3d']
    }]
  }
}, {
  id: 'Angle',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-angle',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Angle'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Angle'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'CobbAngle',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-cobb-angle',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Cobb Angle'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Cobb Angle'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Magnify',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-magnify',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Zoom-in'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Zoom-in'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'CalibrationLine',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-calibration',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Calibration'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Calibration Line'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'TagBrowser',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'dicom-tag-browser',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Dicom Tag Browser'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Dicom Tag Browser'),
    commands: 'openDICOMTagViewer'
  }
}, {
  id: 'AdvancedMagnify',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-loupe',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Magnify Probe'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Magnify Probe'),
    commands: 'toggleActiveDisabledToolbar',
    evaluate: ['evaluate.cornerstoneTool.toggle.ifStrictlyDisabled', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'UltrasoundDirectionalTool',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-ultrasound-bidirectional',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Ultrasound Directional'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Ultrasound Directional'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.modality.supported',
      supportedModalities: ['US']
    }]
  }
}, {
  id: 'UltrasoundPleuraBLineTool',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-ultrasound-bidirectional',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:US Pleura B-line Annotation'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:US Pleura B-line Annotation'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.modality.supported',
      supportedModalities: ['US']
    }]
  }
}, {
  id: 'WindowLevelRegion',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-window-region',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Window Level Region'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Window Level Region'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'Length',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-length',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Length'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Length Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Bidirectional',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-bidirectional',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Bidirectional'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Bidirectional Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'ArrowAnnotate',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-annotate',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Annotation'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Arrow Annotate'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'EllipticalROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-ellipse',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Ellipse'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Ellipse ROI'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'RectangleROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rectangle',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Rectangle'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Rectangle ROI'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'CircleROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-circle',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Circle'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Circle Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'PlanarFreehandROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-freehand-roi',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Freehand ROI'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Freehand ROI'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'SplineROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-spline-roi',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Spline ROI'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Spline ROI'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'LivewireContour',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-livewire',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Livewire tool'),
    tooltip: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Livewire tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
},
// Window Level
{
  id: 'WindowLevel',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-window-level',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Window Level'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['wholeSlide']
    }]
  }
}, {
  id: 'Pan',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-move',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Pan'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-zoom',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Zoom'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'TrackballRotate',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-3d-rotate',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:3D Rotate'),
    commands: setToolActiveToolbar,
    evaluate: {
      name: 'evaluate.cornerstoneTool',
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Select a 3D viewport to enable this tool')
    }
  }
}, {
  id: 'Capture',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-capture',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Capture'),
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
    evaluate: 'evaluate.action'
  }
}, {
  id: 'Crosshairs',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-crosshair',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Crosshairs'),
    commands: {
      commandName: 'setToolActiveToolbar',
      commandOptions: {
        toolGroupIds: ['mpr']
      }
    },
    evaluate: {
      name: 'evaluate.cornerstoneTool',
      disabledText: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('Buttons:Select an MPR viewport to enable this tool')
    }
  }
}
// {
//   id: 'Undo',
//   uiType: 'ohif.toolButton',
//   props: {
//     type: 'tool',
//     icon: 'prev-arrow',
//     label: 'Undo',
//     commands: {
//       commandName: 'undo',
//     },
//     evaluate: 'evaluate.action',
//   },
// },
// {
//   id: 'Redo',
//   uiType: 'ohif.toolButton',
//   props: {
//     type: 'tool',
//     icon: 'next-arrow',
//     label: 'Redo',
//     commands: {
//       commandName: 'redo',
//     },
//     evaluate: 'evaluate.action',
//   },
// },
];
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

/***/ "../../../modes/usAnnotation/package.json"
/*!************************************************!*\
  !*** ../../../modes/usAnnotation/package.json ***!
  \************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/mode-ultrasound-pleura-bline","version":"3.13.0-beta.20","description":"Allows users to annotate ultrasound images with pleura B-line annotations.","author":"OHIF","license":"MIT","main":"dist/ohif-mode-ultrasound-pleura-bline.umd.js","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-mode"],"publishConfig":{"access":"public"},"module":"src/index.ts","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"dependencies":{"@babel/runtime":"7.28.2","@cornerstonejs/core":"4.15.29","@cornerstonejs/tools":"4.15.29","@ohif/core":"3.13.0-beta.20","@ohif/extension-cornerstone-dicom-sr":"3.13.0-beta.20","@ohif/extension-ultrasound-pleura-bline":"3.13.0-beta.20","i18next":"17.3.1"},"devDependencies":{"@babel/core":"7.28.0","@babel/plugin-syntax-dynamic-import":"7.8.3","@babel/plugin-transform-arrow-functions":"7.27.1","@babel/plugin-transform-class-properties":"7.27.1","@babel/plugin-transform-object-rest-spread":"7.28.0","@babel/plugin-transform-private-methods":"7.27.1","@babel/plugin-transform-regenerator":"7.28.1","@babel/plugin-transform-runtime":"7.28.0","@babel/plugin-transform-typescript":"7.28.0","@babel/preset-env":"7.28.0","@babel/preset-react":"7.27.1","@babel/preset-typescript":"7.27.1","@svgr/webpack":"8.1.0","babel-loader":"8.4.1","clean-webpack-plugin":"3.0.0","copy-webpack-plugin":"9.1.0","cross-env":"7.0.3","dotenv":"8.6.0","webpack":"5.105.0","webpack-cli":"5.1.4","webpack-merge":"5.10.0"}}');

/***/ }

}]);
//# sourceMappingURL=modes_usAnnotation_src_index_ts.js.map