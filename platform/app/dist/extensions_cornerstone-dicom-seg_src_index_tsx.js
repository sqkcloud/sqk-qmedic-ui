"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-seg_src_index_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-seg/src/commandsModule.ts"
/*!***********************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/commandsModule.ts ***!
  \***********************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _default_src_utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../default/src/utils/_shared/PROMPT_RESPONSES */ "../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");








const getTargetViewport = ({
  viewportId,
  viewportGridService
}) => {
  const {
    viewports,
    activeViewportId
  } = viewportGridService.getState();
  const targetViewportId = viewportId || activeViewportId;
  const viewport = viewports.get(targetViewportId);
  return viewport;
};
const {
  Cornerstone3D: {
    Segmentation: {
      generateSegmentation
    }
  }
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__.adaptersSEG;
const {
  Cornerstone3D: {
    RTSS: {
      generateRTSSFromRepresentation
    }
  }
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__.adaptersRT;
const {
  downloadDICOMData
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__.helpers;
const commandsModule = ({
  servicesManager,
  extensionManager
}) => {
  const {
    segmentationService,
    displaySetService,
    viewportGridService
  } = servicesManager.services;
  const actions = {
    /**
     * Loads segmentations for a specified viewport.
     * The function prepares the viewport for rendering, then loads the segmentation details.
     * Additionally, if the segmentation has scalar data, it is set for the corresponding label map volume.
     *
     * @param {Object} params - Parameters for the function.
     * @param params.segmentations - Array of segmentations to be loaded.
     * @param params.viewportId - the target viewport ID.
     *
     */
    loadSegmentationsForViewport: async ({
      segmentations,
      viewportId
    }) => {
      // Todo: handle adding more than one segmentation
      const viewport = getTargetViewport({
        viewportId,
        viewportGridService
      });
      const displaySetInstanceUID = viewport.displaySetInstanceUIDs[0];
      const segmentation = segmentations[0];
      const segmentationId = segmentation.segmentationId;
      const label = segmentation.config.label;
      const segments = segmentation.config.segments;
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      await segmentationService.createLabelmapForDisplaySet(displaySet, {
        segmentationId,
        segments,
        label
      });
      segmentationService.addOrUpdateSegmentation(segmentation);
      await segmentationService.addSegmentationRepresentation(viewport.viewportId, {
        segmentationId
      });
      return segmentationId;
    },
    /**
     * Generates a segmentation from a given segmentation ID.
     * This function retrieves the associated segmentation and
     * its referenced volume, extracts label maps from the
     * segmentation volume, and produces segmentation data
     * alongside associated metadata.
     *
     * @param {Object} params - Parameters for the function.
     * @param params.segmentationId - ID of the segmentation to be generated.
     * @param params.options - Optional configuration for the generation process.
     *
     * @returns Returns the generated segmentation data.
     */
    generateSegmentation: ({
      segmentationId,
      options = {}
    }) => {
      const segmentation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.segmentation.state.getSegmentation(segmentationId);
      const predecessorImageId = options.predecessorImageId ?? segmentation.predecessorImageId;
      const {
        imageIds
      } = segmentation.representationData.Labelmap;
      const segImages = imageIds.map(imageId => _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getImage(imageId));
      const referencedImages = segImages.map(image => _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getImage(image.referencedImageId));
      const labelmaps2D = [];
      let z = 0;
      for (const segImage of segImages) {
        const segmentsOnLabelmap = new Set();
        const pixelData = segImage.getPixelData();
        const {
          rows,
          columns
        } = segImage;

        // Use a single pass through the pixel data
        for (let i = 0; i < pixelData.length; i++) {
          const segment = pixelData[i];
          if (segment !== 0) {
            segmentsOnLabelmap.add(segment);
          }
        }
        labelmaps2D[z++] = {
          segmentsOnLabelmap: Array.from(segmentsOnLabelmap),
          pixelData,
          rows,
          columns
        };
      }
      const allSegmentsOnLabelmap = labelmaps2D.map(labelmap => labelmap.segmentsOnLabelmap);
      const labelmap3D = {
        segmentsOnLabelmap: Array.from(new Set(allSegmentsOnLabelmap.flat())),
        metadata: [],
        labelmaps2D
      };
      const segmentationInOHIF = segmentationService.getSegmentation(segmentationId);
      const representations = segmentationService.getRepresentationsForSegmentation(segmentationId);
      Object.entries(segmentationInOHIF.segments).forEach(([segmentIndex, segment]) => {
        // segmentation service already has a color for each segment
        if (!segment) {
          return;
        }
        const {
          label
        } = segment;
        const firstRepresentation = representations[0];
        const color = segmentationService.getSegmentColor(firstRepresentation.viewportId, segmentationId, segment.segmentIndex);
        const RecommendedDisplayCIELabValue = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.Colors.rgb2DICOMLAB(color.slice(0, 3).map(value => value / 255)).map(value => Math.round(value));
        const segmentMetadata = {
          SegmentNumber: segmentIndex.toString(),
          SegmentLabel: label,
          SegmentAlgorithmType: segment?.algorithmType || 'MANUAL',
          SegmentAlgorithmName: segment?.algorithmName || 'OHIF Brush',
          RecommendedDisplayCIELabValue,
          SegmentedPropertyCategoryCodeSequence: {
            CodeValue: 'T-D0050',
            CodingSchemeDesignator: 'SRT',
            CodeMeaning: 'Tissue'
          },
          SegmentedPropertyTypeCodeSequence: {
            CodeValue: 'T-D0050',
            CodingSchemeDesignator: 'SRT',
            CodeMeaning: 'Tissue'
          }
        };
        labelmap3D.metadata[segmentIndex] = segmentMetadata;
      });
      const generatedSegmentation = generateSegmentation(referencedImages, labelmap3D, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.metaData, {
        predecessorImageId,
        ...options
      });
      return generatedSegmentation;
    },
    /**
     * Downloads a segmentation based on the provided segmentation ID.
     * This function retrieves the associated segmentation and
     * uses it to generate the corresponding DICOM dataset, which
     * is then downloaded with an appropriate filename.
     *
     * @param {Object} params - Parameters for the function.
     * @param params.segmentationId - ID of the segmentation to be downloaded.
     *
     */
    downloadSegmentation: ({
      segmentationId
    }) => {
      const segmentationInOHIF = segmentationService.getSegmentation(segmentationId);
      const generatedSegmentation = actions.generateSegmentation({
        segmentationId
      });
      downloadDICOMData(generatedSegmentation.dataset, `${segmentationInOHIF.label}`);
    },
    /**
     * Stores a segmentation based on the provided segmentationId into a specified data source.
     * The SeriesDescription is derived from user input or defaults to the segmentation label,
     * and in its absence, defaults to 'Research Derived Series'.
     *
     * @param {Object} params - Parameters for the function.
     * @param params.segmentationId - ID of the segmentation to be stored.
     * @param params.dataSource - Data source where the generated segmentation will be stored.
     *
     * @returns {Object|void} Returns the naturalized report if successfully stored,
     * otherwise throws an error.
     */
    storeSegmentation: async ({
      segmentationId,
      dataSource,
      modality = 'SEG'
    }) => {
      const segmentation = segmentationService.getSegmentation(segmentationId);
      if (!segmentation) {
        throw new Error('No segmentation found');
      }
      const {
        label,
        predecessorImageId
      } = segmentation;
      const defaultDataSource = dataSource ?? extensionManager.getActiveDataSource()[0];
      const {
        value: reportName,
        dataSourceName: selectedDataSource,
        series,
        priorSeriesNumber,
        action
      } = await (0,_ohif_extension_default__WEBPACK_IMPORTED_MODULE_4__.createReportDialogPrompt)({
        servicesManager,
        extensionManager,
        predecessorImageId,
        title: 'Store Segmentation',
        modality
      });
      if (action === _default_src_utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_6__["default"].CREATE_REPORT) {
        try {
          const selectedDataSourceConfig = selectedDataSource ? extensionManager.getDataSources(selectedDataSource)[0] : defaultDataSource;
          const args = {
            segmentationId,
            options: {
              SeriesDescription: series ? undefined : reportName || label || 'Contour Series',
              SeriesNumber: series ? undefined : 1 + priorSeriesNumber,
              predecessorImageId: series
            }
          };
          const generatedDataAsync = modality === 'SEG' && actions.generateSegmentation(args) || modality === 'RTSTRUCT' && actions.generateContour(args);
          const generatedData = await generatedDataAsync;
          if (!generatedData || !generatedData.dataset) {
            throw new Error('Error during segmentation generation');
          }
          const {
            dataset: naturalizedReport
          } = generatedData;

          // DCMJS assigns a dummy study id during creation, and this can cause problems, so clearing it out
          if (naturalizedReport.StudyID === 'No Study ID') {
            naturalizedReport.StudyID = '';
          }
          await selectedDataSourceConfig.store.dicom(naturalizedReport);

          // add the information for where we stored it to the instance as well
          naturalizedReport.wadoRoot = selectedDataSourceConfig.getConfig().wadoRoot;
          _ohif_core__WEBPACK_IMPORTED_MODULE_5__.DicomMetadataStore.addInstances([naturalizedReport], true);
          return naturalizedReport;
        } catch (error) {
          console.debug('Error storing segmentation:', error);
          throw error;
        }
      }
    },
    generateContour: async args => {
      const {
        segmentationId,
        options
      } = args;
      const segmentations = segmentationService.getSegmentation(segmentationId);

      // inject colors to the segmentIndex
      const firstRepresentation = segmentationService.getRepresentationsForSegmentation(segmentationId)[0];
      Object.entries(segmentations.segments).forEach(([segmentIndex, segment]) => {
        segment.color = segmentationService.getSegmentColor(firstRepresentation.viewportId, segmentationId, Number(segmentIndex));
      });
      const predecessorImageId = options?.predecessorImageId ?? segmentations.predecessorImageId;
      const dataset = await generateRTSSFromRepresentation(segmentations, {
        predecessorImageId,
        ...options
      });
      return {
        dataset
      };
    },
    /**
     * Downloads an RTSS instance from a segmentation or contour
     * representation.
     */
    downloadRTSS: async args => {
      const {
        dataset
      } = await actions.generateContour(args);
      const {
        InstanceNumber: instanceNumber = 1,
        SeriesInstanceUID: seriesUID
      } = dataset;
      try {
        //Create a URL for the binary.
        const filename = `rtss-${seriesUID}-${instanceNumber}.dcm`;
        downloadDICOMData(dataset, filename);
      } catch (e) {
        console.warn(e);
      }
    },
    toggleActiveSegmentationUtility: ({
      itemId: buttonId
    }) => {
      const {
        uiState,
        setUIState
      } = _ohif_extension_default__WEBPACK_IMPORTED_MODULE_4__.useUIStateStore.getState();
      const isButtonActive = uiState['activeSegmentationUtility'] === buttonId;
      console.log('toggleActiveSegmentationUtility', isButtonActive, buttonId);
      // if the button is active, clear the active segmentation utility
      if (isButtonActive) {
        setUIState('activeSegmentationUtility', null);
      } else {
        setUIState('activeSegmentationUtility', buttonId);
      }
    }
  };
  const definitions = {
    loadSegmentationsForViewport: actions.loadSegmentationsForViewport,
    generateSegmentation: actions.generateSegmentation,
    downloadSegmentation: actions.downloadSegmentation,
    storeSegmentation: actions.storeSegmentation,
    downloadRTSS: actions.downloadRTSS,
    toggleActiveSegmentationUtility: actions.toggleActiveSegmentationUtility
  };
  return {
    actions,
    definitions,
    defaultContext: 'SEGMENTATION'
  };
};
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

/***/ "../../../extensions/cornerstone-dicom-seg/src/components/LogicalContourOperationsOptions.tsx"
/*!****************************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/components/LogicalContourOperationsOptions.tsx ***!
  \****************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _cornerstonejs_tools_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/tools/utilities */ "../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/index.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature();







const {
  LogicalOperation
} = _cornerstonejs_tools_utilities__WEBPACK_IMPORTED_MODULE_4__.contourSegmentation;
const options = [{
  value: 'merge',
  logicalOperation: LogicalOperation.Union,
  label: 'Merge',
  icon: 'actions-combine-merge',
  helperIcon: 'helper-combine-merge'
}, {
  value: 'intersect',
  logicalOperation: LogicalOperation.Intersect,
  label: 'Intersect',
  icon: 'actions-combine-intersect',
  helperIcon: 'helper-combine-intersect'
}, {
  value: 'subtract',
  logicalOperation: LogicalOperation.Subtract,
  label: 'Subtract',
  icon: 'actions-combine-subtract',
  helperIcon: 'helper-combine-subtract'
}];

// Shared component for segment selection
function SegmentSelector({
  label,
  value,
  onValueChange,
  segments,
  placeholder = 'Select a segment'
}) {
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)('SegmentationPanel');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-between gap-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Select, {
    key: `select-segment-${label}`,
    onValueChange: onValueChange,
    value: value
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.SelectTrigger, {
    className: "overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.SelectValue, {
    placeholder: t(placeholder)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.SelectContent, null, segments.map(segment => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.SelectItem, {
    key: segment.segmentIndex,
    value: segment.segmentIndex.toString()
  }, segment.label)))));
}
_s(SegmentSelector, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation];
});
_c = SegmentSelector;
function LogicalContourOperationOptions() {
  _s2();
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useSystem)();
  const {
    segmentationService
  } = servicesManager.services;
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)('SegmentationPanel');
  const {
    segmentationsWithRepresentations
  } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_2__.useActiveViewportSegmentationRepresentations)();
  const activeRepresentation = segmentationsWithRepresentations?.find(({
    representation
  }) => representation?.active);
  const segments = activeRepresentation ? Object.values(activeRepresentation.segmentation.segments) : [];

  // Calculate the next available segment index
  const nextSegmentIndex = activeRepresentation ? segmentationService.getNextAvailableSegmentIndex(activeRepresentation.segmentation.segmentationId) : 1;
  const activeSegment = segments.find(segment => segment.active);
  const activeSegmentIndex = activeSegment?.segmentIndex || 0;
  const [operation, setOperation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(options[0]);
  const [segmentA, setSegmentA] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(activeSegmentIndex?.toString() || '');
  const [segmentB, setSegmentB] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [createNewSegment, setCreateNewSegment] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [newSegmentName, setNewSegmentName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSegmentA(activeSegmentIndex?.toString() || null);
  }, [activeSegmentIndex]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setNewSegmentName(`Segment ${nextSegmentIndex}`);
  }, [nextSegmentIndex]);
  const runCommand = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useRunCommand)();
  const applyLogicalContourOperation = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    let resultSegmentIndex = segmentA;
    if (createNewSegment) {
      resultSegmentIndex = nextSegmentIndex.toString();
      runCommand('addSegment', {
        segmentationId: activeRepresentation.segmentation.segmentationId,
        config: {
          label: newSegmentName,
          segmentIndex: nextSegmentIndex
        }
      });
    }
    runCommand('applyLogicalContourOperation', {
      segmentAInfo: {
        segmentationId: activeRepresentation.segmentation.segmentationId,
        segmentIndex: parseInt(segmentA)
      },
      segmentBInfo: {
        segmentationId: activeRepresentation.segmentation.segmentationId,
        segmentIndex: parseInt(segmentB)
      },
      resultSegmentInfo: {
        segmentationId: activeRepresentation.segmentation.segmentationId,
        segmentIndex: parseInt(resultSegmentIndex)
      },
      logicalOperation: operation.logicalOperation
    });
  }, [activeRepresentation?.segmentation?.segmentationId, createNewSegment, newSegmentName, nextSegmentIndex, operation.logicalOperation, runCommand, segmentA, segmentB]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-[245px] flex-col gap-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-auto flex-col items-center gap-2 text-base font-normal leading-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Tabs, {
    value: operation.value
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.TabsList, {
    className: "inline-flex space-x-1"
  }, options.map(option => {
    const {
      value,
      icon
    } = option;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.TabsTrigger, {
      value: value,
      key: `logical-contour-operation-${value}`,
      onClick: () => setOperation(option)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Icons.ByName, {
      name: icon
    }));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, t(operation.label))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-muted flex h-[62px] w-[88px] items-center justify-center rounded-lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Icons.ByName, {
    name: operation.helperIcon
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SegmentSelector, {
    label: "A",
    value: segmentA,
    onValueChange: setSegmentA,
    segments: segments
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SegmentSelector, {
    label: "B",
    value: segmentB,
    onValueChange: setSegmentB,
    segments: segments
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-end pl-[34px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "border-primary/60 grow border",
    variant: "ghost",
    onClick: () => {
      applyLogicalContourOperation();
    }
  }, t(operation.label))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Separator, {
    className: "bg-input mt-2 h-[1px]"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Switch, {
    id: "logical-contour-operations-create-new-segment-switch",
    onCheckedChange: setCreateNewSegment
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Label, {
    htmlFor: "logical-contour-operations-create-new-segment-switch"
  }, t('Create a new segment'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "pl-9"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Input, {
    className: (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.cn)(createNewSegment ? 'visible' : 'hidden'),
    disabled: !createNewSegment,
    id: "logical-contour-operations-create-new-segment-input",
    type: "text",
    placeholder: t('New segment name'),
    value: newSegmentName,
    onChange: e => setNewSegmentName(e.target.value)
  }))));
}
_s2(LogicalContourOperationOptions, "auOgNtiUgNuipRokP3KsWB2vWvc=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useSystem, react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation, _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_2__.useActiveViewportSegmentationRepresentations, _ohif_core__WEBPACK_IMPORTED_MODULE_1__.useRunCommand];
});
_c2 = LogicalContourOperationOptions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LogicalContourOperationOptions);
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "SegmentSelector");
__webpack_require__.$Refresh$.register(_c2, "LogicalContourOperationOptions");

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/components/SimplifyContourOptions.tsx"
/*!*******************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/components/SimplifyContourOptions.tsx ***!
  \*******************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();




function SimplifyContourOptions() {
  _s();
  const [areaThreshold, setAreaThreshold] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(10);
  const runCommand = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useRunCommand)();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)('SegmentationPanel');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-auto w-[252px] flex-col gap-[8px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, t('Fill contour holes')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('removeContourHoles');
    }
  }, t('Fill Holes')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Separator, {
    className: "bg-input mt-[20px] h-[1px]"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, t('Remove Small Contours')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 self-end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Label, {
    htmlFor: "simplify-contour-options",
    className: "text-muted-foreground"
  }, t('Area Threshold')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Input, {
    id: "simplify-contour-options",
    className: "w-20",
    type: "number",
    value: areaThreshold,
    onChange: e => setAreaThreshold(Number(e.target.value))
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('removeSmallContours', {
        areaThreshold
      });
    }
  }, t('Remove Small Contours')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Separator, {
    className: "bg-input mt-[20px] h-[1px]"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, t('Create New Segment from Holes')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('convertContourHoles');
    }
  }, t('Create New Segment'))));
}
_s(SimplifyContourOptions, "xIrW2OewY/A48Wi4MAFSQ8pi9Rs=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useRunCommand, react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation];
});
_c = SimplifyContourOptions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimplifyContourOptions);
var _c;
__webpack_require__.$Refresh$.register(_c, "SimplifyContourOptions");

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/components/SmoothContoursOptions.tsx"
/*!******************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/components/SmoothContoursOptions.tsx ***!
  \******************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();




function SmoothContoursOptions() {
  _s();
  const runCommand = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useRunCommand)();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)('SegmentationPanel');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-auto w-[245px] flex-col gap-[8px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, t('Smooth all edges')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('smoothContours');
    }
  }, t('Smooth Edges')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Separator, {
    className: "bg-input mt-[20px] h-[1px]"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, t('Remove extra points')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('decimateContours');
    }
  }, t('Remove Points'))));
}
_s(SmoothContoursOptions, "k/rFL6J+xj1wG9hV0N+/Ek9elN4=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_2__.useRunCommand, react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation];
});
_c = SmoothContoursOptions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SmoothContoursOptions);
var _c;
__webpack_require__.$Refresh$.register(_c, "SmoothContoursOptions");

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts"
/*!*********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts ***!
  \*********************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   segProtocol: () => (/* binding */ segProtocol)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const segProtocol = {
  id: '@ohif/seg',
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  name: 'Segmentations',
  // Just apply this one when specifically listed
  protocolMatchingRules: [],
  toolGroupIds: ['default'],
  // -1 would be used to indicate active only, whereas other values are
  // the number of required priors referenced - so 0 means active with
  // 0 or more priors.
  numberOfPriorsReferenced: 0,
  // Default viewport is used to define the viewport when
  // additional viewports are added using the layout tool
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true,
      syncGroups: [{
        type: 'hydrateseg',
        id: 'sameFORId',
        source: true,
        target: true
        // options: {
        //   matchingRules: ['sameFOR'],
        // },
      }]
    },
    displaySets: [{
      id: 'segDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  displaySetSelectors: {
    segDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: 'SEG'
        }
      }]
    }
  },
  stages: [{
    name: 'Segmentations',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        allowUnmatchedView: true,
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true
          // options: {
          //   matchingRules: ['sameFOR'],
          // },
        }]
      },
      displaySets: [{
        id: 'segDisplaySetId'
      }]
    }]
  }]
};
function getHangingProtocolModule() {
  return [{
    name: segProtocol.id,
    protocol: segProtocol
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getHangingProtocolModule);


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

/***/ "../../../extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.ts"
/*!*********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.ts ***!
  \*********************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-seg/src/id.js");
/* harmony import */ var _utils_dicomlabToRGB__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/dicomlabToRGB */ "../../../extensions/cornerstone-dicom-seg/src/utils/dicomlabToRGB.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");








const sopClassUids = ['1.2.840.10008.5.1.4.1.1.66.4', '1.2.840.10008.5.1.4.1.1.66.7'];
const loadPromises = {};
function _getDisplaySetsFromSeries(instances, servicesManager, extensionManager) {
  _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.sortStudyInstances(instances);

  // Choose the LAST instance in the list as the most recently created one.
  const instance = instances[instances.length - 1];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription = '',
    SeriesNumber,
    SeriesDate,
    StructureSetDate,
    SOPClassUID,
    wadoRoot,
    wadoUri,
    wadoUriRoot,
    imageId: predecessorImageId
  } = instance;
  const displaySet = {
    Modality: 'SEG',
    loading: false,
    isReconstructable: false,
    displaySetInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate: SeriesDate || StructureSetDate || '',
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: _id__WEBPACK_IMPORTED_MODULE_5__.SOPClassHandlerId,
    SOPClassUID,
    referencedImages: null,
    referencedSeriesInstanceUID: null,
    referencedDisplaySetInstanceUID: null,
    isDerivedDisplaySet: true,
    isLoaded: false,
    isHydrated: false,
    segments: {},
    sopClassUids,
    instance,
    predecessorImageId,
    instances: [instance],
    wadoRoot,
    wadoUriRoot,
    wadoUri,
    isOverlayDisplaySet: true,
    label: SeriesDescription || `${_ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('Series')} ${SeriesNumber} - ${_ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('SEG')}`
  };
  const referencedSeriesSequence = instance.ReferencedSeriesSequence;
  if (!referencedSeriesSequence) {
    console.error('ReferencedSeriesSequence is missing for the SEG');
    return;
  }
  const referencedSeries = referencedSeriesSequence[0] || referencedSeriesSequence;
  displaySet.referencedImages = instance.ReferencedSeriesSequence.ReferencedInstanceSequence;
  displaySet.referencedSeriesInstanceUID = referencedSeries.SeriesInstanceUID;
  const {
    displaySetService
  } = servicesManager.services;
  const referencedDisplaySets = displaySetService.getDisplaySetsForReferences(instance.ReferencedSeriesSequence);
  if (referencedDisplaySets?.length > 1) {
    console.warn('Segmentation does not currently handle references to multiple series, defaulting to first series');
  }
  const referencedDisplaySet = referencedDisplaySets[0];
  if (!referencedDisplaySet) {
    // subscribe to display sets added which means at some point it will be available
    const {
      unsubscribe
    } = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, ({
      displaySetsAdded
    }) => {
      // here we can also do a little bit of search, since sometimes DICOM SEG
      // does not contain the referenced display set uid , and we can just
      // see which of the display sets added is more similar and assign it
      // to the referencedDisplaySet
      const addedDisplaySet = displaySetsAdded[0];
      if (addedDisplaySet.SeriesInstanceUID === displaySet.referencedSeriesInstanceUID) {
        displaySet.referencedDisplaySetInstanceUID = addedDisplaySet.displaySetInstanceUID;
        displaySet.isReconstructable = addedDisplaySet.isReconstructable;
        unsubscribe();
      }
    });
  } else {
    displaySet.referencedDisplaySetInstanceUID = referencedDisplaySet.displaySetInstanceUID;
    displaySet.isReconstructable = referencedDisplaySet.isReconstructable;
  }
  displaySet.load = async ({
    headers
  }) => await _load(displaySet, servicesManager, extensionManager, headers);
  return [displaySet];
}
function _load(segDisplaySet, servicesManager, extensionManager, headers) {
  const {
    SOPInstanceUID
  } = segDisplaySet;
  const {
    segmentationService
  } = servicesManager.services;
  if ((segDisplaySet.loading || segDisplaySet.isLoaded) && loadPromises[SOPInstanceUID] && _segmentationExists(segDisplaySet)) {
    return loadPromises[SOPInstanceUID];
  }
  segDisplaySet.loading = true;

  // We don't want to fire multiple loads, so we'll wait for the first to finish
  // and also return the same promise to any other callers.
  loadPromises[SOPInstanceUID] = new Promise(async (resolve, reject) => {
    if (!segDisplaySet.segments || Object.keys(segDisplaySet.segments).length === 0) {
      try {
        await _loadSegments({
          extensionManager,
          servicesManager,
          segDisplaySet,
          headers
        });
      } catch (e) {
        segDisplaySet.loading = false;
        return reject(e);
      }
    }
    segmentationService.createSegmentationForSEGDisplaySet(segDisplaySet).then(() => {
      segDisplaySet.loading = false;
      resolve();
    }).catch(error => {
      segDisplaySet.loading = false;
      reject(error);
    });
  });
  return loadPromises[SOPInstanceUID];
}
async function _loadSegments({
  extensionManager,
  servicesManager,
  segDisplaySet,
  headers
}) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  const {
    segmentationService,
    uiNotificationService
  } = servicesManager.services;
  const {
    dicomLoaderService
  } = utilityModule.exports;
  const arrayBuffer = await dicomLoaderService.findDicomDataPromise(segDisplaySet, null, headers);
  const referencedDisplaySet = servicesManager.services.displaySetService.getDisplaySetByUID(segDisplaySet.referencedDisplaySetInstanceUID);
  if (!referencedDisplaySet) {
    throw new Error('referencedDisplaySet is missing for SEG');
  }
  let {
    imageIds
  } = referencedDisplaySet;
  if (!imageIds) {
    // try images
    const {
      images
    } = referencedDisplaySet;
    imageIds = images.map(image => image.imageId);
  }

  // Todo: what should be defaults here
  const tolerance = 0.001;
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.addEventListener(_cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_4__.Enums.Events.SEGMENTATION_LOAD_PROGRESS, evt => {
    const {
      percentComplete
    } = evt.detail;
    segmentationService._broadcastEvent(segmentationService.EVENTS.SEGMENT_LOADING_COMPLETE, {
      percentComplete
    });
  });
  const results = await _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_4__.adaptersSEG.Cornerstone3D.Segmentation.createFromDICOMSegBuffer(imageIds, arrayBuffer, {
    metadataProvider: _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData,
    tolerance
  });
  let usedRecommendedDisplayCIELabValue = true;
  results.segMetadata.data.forEach((data, i) => {
    if (i > 0) {
      data.rgba = data.RecommendedDisplayCIELabValue;
      if (data.rgba) {
        data.rgba = (0,_utils_dicomlabToRGB__WEBPACK_IMPORTED_MODULE_6__.dicomlabToRGB)(data.rgba);
      } else {
        usedRecommendedDisplayCIELabValue = false;
        data.rgba = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.COLOR_LUT[i % _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.COLOR_LUT.length];
      }
    }
  });
  if (!usedRecommendedDisplayCIELabValue) {
    // Display a notification about the non-utilization of RecommendedDisplayCIELabValue
    uiNotificationService.show({
      title: 'DICOM SEG import',
      message: 'RecommendedDisplayCIELabValue not found for one or more segments. The default color was used instead.',
      type: 'warning',
      duration: 5000
    });
  }
  Object.assign(segDisplaySet, results);
}
function _segmentationExists(segDisplaySet) {
  return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state.getSegmentation(segDisplaySet.displaySetInstanceUID);
}
function getSopClassHandlerModule(params) {
  const {
    servicesManager,
    extensionManager
  } = params;
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return [{
    name: 'dicom-seg',
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSopClassHandlerModule);

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/getToolbarModule.ts"
/*!*************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/getToolbarModule.ts ***!
  \*************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getToolbarModule: () => (/* binding */ getToolbarModule)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* harmony import */ var _components_LogicalContourOperationsOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/LogicalContourOperationsOptions */ "../../../extensions/cornerstone-dicom-seg/src/components/LogicalContourOperationsOptions.tsx");
/* harmony import */ var _components_SimplifyContourOptions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/SimplifyContourOptions */ "../../../extensions/cornerstone-dicom-seg/src/components/SimplifyContourOptions.tsx");
/* harmony import */ var _components_SmoothContoursOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/SmoothContoursOptions */ "../../../extensions/cornerstone-dicom-seg/src/components/SmoothContoursOptions.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







function getToolbarModule({
  servicesManager
}) {
  const {
    segmentationService,
    toolbarService,
    toolGroupService
  } = servicesManager.services;
  return [{
    name: 'cornerstone.SimplifyContourOptions',
    defaultComponent: _components_SimplifyContourOptions__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, {
    name: 'cornerstone.LogicalContourOperationsOptions',
    defaultComponent: _components_LogicalContourOperationsOptions__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, {
    name: 'cornerstone.SmoothContoursOptions',
    defaultComponent: _components_SmoothContoursOptions__WEBPACK_IMPORTED_MODULE_5__["default"]
  }, {
    name: 'cornerstone.isActiveSegmentationUtility',
    evaluate: ({
      button
    }) => {
      const {
        uiState
      } = _ohif_extension_default__WEBPACK_IMPORTED_MODULE_2__.useUIStateStore.getState();
      return {
        isActive: uiState[`activeSegmentationUtility`] === button.id
      };
    }
  }, {
    name: 'evaluate.cornerstone.hasSegmentation',
    evaluate: ({
      viewportId
    }) => {
      const segmentations = segmentationService.getSegmentationRepresentations(viewportId);
      return {
        disabled: !segmentations?.length
      };
    }
  }, {
    name: 'evaluate.cornerstone.hasSegmentationOfType',
    evaluate: ({
      viewportId,
      segmentationRepresentationType
    }) => {
      const segmentations = segmentationService.getSegmentationRepresentations(viewportId);
      if (!segmentations?.length) {
        return {
          disabled: true,
          disabledText: _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('SegmentationPanel:No segmentations available')
        };
      }
      if (!segmentations.some(segmentation => Boolean(segmentation.type === segmentationRepresentationType))) {
        return {
          disabled: true,
          disabledText: `No ${segmentationRepresentationType} segmentations available`
        };
      }
    }
  }, {
    name: 'evaluate.cornerstone.segmentation',
    evaluate: ({
      viewportId,
      button,
      toolNames,
      disabledText
    }) => {
      // Todo: we need to pass in the button section Id since we are kind of
      // forcing the button to have black background since initially
      // it is designed for the toolbox not the toolbar on top
      // we should then branch the buttonSectionId to have different styles
      const segmentations = segmentationService.getSegmentationRepresentations(viewportId);
      if (!segmentations?.length) {
        return {
          disabled: true,
          disabledText: disabledText ?? _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('SegmentationPanel:No segmentations available')
        };
      }
      const activeSegmentation = segmentationService.getActiveSegmentation(viewportId);
      if (!Object.keys(activeSegmentation.segments).length) {
        return {
          disabled: true,
          disabledText: _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('SegmentationPanel:Add segment to enable this tool')
        };
      }
      const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
      if (!toolGroup) {
        return {
          disabled: true,
          disabledText: disabledText ?? _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('SegmentationPanel:Not available on the current viewport')
        };
      }
      if (!toolNames) {
        return {
          disabled: false
          // isActive: false,
        };
      }
      const toolName = toolbarService.getToolNameForButton(button);
      if (!toolGroup.hasTool(toolName) && !toolNames) {
        return {
          disabled: true,
          disabledText: disabledText ?? _ohif_i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t('SegmentationPanel:Not available on the current viewport')
        };
      }
      const isPrimaryActive = toolNames ? toolNames.includes(toolGroup.getActivePrimaryMouseButtonTool()) : toolGroup.getActivePrimaryMouseButtonTool() === toolName;
      return {
        disabled: false,
        isActive: isPrimaryActive
      };
    }
  }, {
    name: 'evaluate.cornerstone.segmentation.synchronizeDrawingRadius',
    evaluate: ({
      button,
      radiusOptionId
    }) => {
      const toolGroupIds = toolGroupService.getToolGroupIds();
      if (!toolGroupIds?.length) {
        return;
      }
      for (const toolGroupId of toolGroupIds) {
        const brushSize = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.utilities.segmentation.getBrushSizeForToolGroup(toolGroupId);
        if (brushSize) {
          const option = toolbarService.getOptionById(button, radiusOptionId);
          option.value = brushSize;
        }
      }
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

/***/ "../../../extensions/cornerstone-dicom-seg/src/id.js"
/*!***********************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/id.js ***!
  \***********************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerId: () => (/* binding */ SOPClassHandlerId),
/* harmony export */   SOPClassHandlerName: () => (/* binding */ SOPClassHandlerName),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/cornerstone-dicom-seg/package.json");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerName = 'dicom-seg';
const SOPClassHandlerId = `${id}.sopClassHandlerModule.${SOPClassHandlerName}`;


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

/***/ "../../../extensions/cornerstone-dicom-seg/src/index.tsx"
/*!***************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/index.tsx ***!
  \***************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-seg/src/id.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.ts");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/cornerstone-dicom-seg/src/commandsModule.ts");
/* harmony import */ var _getToolbarModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getToolbarModule */ "../../../extensions/cornerstone-dicom-seg/src/getToolbarModule.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}






const Component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().lazy(_c = () => {
  return __webpack_require__.e(/*! import() */ "extensions_cornerstone-dicom-seg_src_viewports_OHIFCornerstoneSEGViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/OHIFCornerstoneSEGViewport */ "../../../extensions/cornerstone-dicom-seg/src/viewports/OHIFCornerstoneSEGViewport.tsx"));
});
_c2 = Component;
const OHIFCornerstoneSEGViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Suspense), {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Component, props));
};

/**
 * You can remove any of the following modules if you don't need them.
 */
_c3 = OHIFCornerstoneSEGViewport;
const extension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  getCommandsModule: _commandsModule__WEBPACK_IMPORTED_MODULE_4__["default"],
  getToolbarModule: _getToolbarModule__WEBPACK_IMPORTED_MODULE_5__.getToolbarModule,
  getViewportModule({
    servicesManager,
    extensionManager,
    commandsManager
  }) {
    const ExtendedOHIFCornerstoneSEGViewport = props => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(OHIFCornerstoneSEGViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager,
        commandsManager: commandsManager
      }, props));
    };
    return [{
      name: 'dicom-seg',
      component: ExtendedOHIFCornerstoneSEGViewport
    }];
  },
  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  getHangingProtocolModule: _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_3__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "Component$React.lazy");
__webpack_require__.$Refresh$.register(_c2, "Component");
__webpack_require__.$Refresh$.register(_c3, "OHIFCornerstoneSEGViewport");

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/utils/dicomlabToRGB.ts"
/*!****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/utils/dicomlabToRGB.ts ***!
  \****************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dicomlabToRGB: () => (/* binding */ dicomlabToRGB)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Converts a CIELAB color to an RGB color using the dcmjs library.
 * @param cielab - The CIELAB color to convert.
 * @returns The RGB color as an array of three integers between 0 and 255.
 */
function dicomlabToRGB(cielab) {
  const rgb = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.Colors.dicomlab2RGB(cielab).map(x => Math.round(x * 255));
  return rgb;
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

/***/ "../../../extensions/cornerstone-dicom-seg/package.json"
/*!**************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/package.json ***!
  \**************************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-cornerstone-dicom-seg","version":"3.13.0-beta.20","description":"DICOM SEG read workflow","author":"OHIF","license":"MIT","main":"dist/ohif-extension-cornerstone-dicom-seg.umd.js","module":"src/index.tsx","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-extension"],"publishConfig":{"access":"public"},"engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-seg":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"3.13.0-beta.20","@ohif/extension-cornerstone":"3.13.0-beta.20","@ohif/extension-default":"3.13.0-beta.20","@ohif/i18n":"3.13.0-beta.20","prop-types":"15.8.1","react":"18.3.1","react-dom":"18.3.1","react-i18next":"12.3.1","react-router":"6.30.3","react-router-dom":"6.30.3"},"dependencies":{"@babel/runtime":"7.28.2","@cornerstonejs/adapters":"4.15.29","@cornerstonejs/core":"4.15.29","@kitware/vtk.js":"34.15.1"}}');

/***/ }

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-seg_src_index_tsx.js.map