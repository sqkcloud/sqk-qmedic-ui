/*
 * OHIF runtime config for dcm4chee-arc.
 *
 * This file is copied into the OHIF app public config directory during bootstrap.
 * Tokens are replaced by scripts/bootstrap-ohif.mjs:
 *   __PROXY_TARGET__      -> OHIF_PROXY_TARGET (default: /dicomweb)
 *   __ROUTER_BASENAME__   -> OHIF_ROUTER_BASENAME (default: /viewer)
 *   __AET__               -> NEXT_PUBLIC_DCM4CHEE_AET / DCM4CHEE_AET (default: DCM4CHEE)
 */

// eslint-disable-next-line no-undef
/** @type {AppTypes.Config} */
window.config = {
  routerBasename: '/viewer',
  publicUrl: '/viewer/',
  showStudyList: true,
  // Enables the Study List's built-in navigation buttons
  studyListFunctionsEnabled: true,
  extensions: [],
  modes: [],
  // below flag is for performance reasons, but it might not work for all servers
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  // filterQueryParam: false,
  defaultDataSourceName: 'dicomweb',
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'dcmjs DICOMWeb Server',
        name: 'DCM4CHEE',
        wadoUriRoot: 'http://34.42.87.190:8080/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'http://34.42.87.190:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'http://34.42.87.190:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        qidoSupportsIncludeField: true,
        supportsReject: true,
        imageRendering: 'wadouri',
        thumbnailRendering: 'wadouri',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: false,
        omitQuotationForMultipartRequest: true,
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        friendlyName: 'dicom json',
        name: 'json',
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomlocal',
      sourceName: 'dicomlocal',
      configuration: {
        friendlyName: 'dicom local',
      },
    },
  ],
};