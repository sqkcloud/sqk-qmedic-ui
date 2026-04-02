# dcm4chee React/Next starter

This ZIP is a **React/Next migration starter with real dcm4chee study and monitoring wiring**, not a full line-by-line conversion of `dcm4chee-arc-ui2`.

It is based on the structure direction discussed for `sqk-qmedic-ui`:
- Next.js App Router
- React + TypeScript
- TanStack Query
- feature-oriented folders
- dark navy SQK-style console shell

## Included routes
- `/inbox`
- `/studies` → QIDO-RS study list
- `/study/[studyInstanceUID]` → study summary + series list
- `/monitoring/queues` → monitor queue tasks
- `/configuration/devices`

## Mapping from Angular UI2
- `studies` -> `src/features/studies`
- `study` -> `src/app/(console)/study/[studyInstanceUID]`
- `monitoring` -> `src/features/monitoring`
- `configuration` -> `src/features/configuration`
- common shell/widgets -> `src/components`

## Environment
Copy `.env.example` to `.env.local`.

```bash
cp .env.example .env.local
```

Important values:
- `DCM4CHEE_BASE_URL` = archive root URL, for example `http://localhost:8080/dcm4chee-arc`
- `NEXT_PUBLIC_DCM4CHEE_AET` = archive AE title, for example `DCM4CHEE`
- `NEXT_PUBLIC_DCM4CHEE_QUEUE` = default queue name shown on the monitoring page

## Run
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## How proxy config works in this Next version
This project does **not** use Angular CLI's `--proxy-config` runtime flag.

Instead:
1. `proxy.conf.js` keeps the proxy target config in one file.
2. `next.config.js` reads that file and converts it into Next rewrites.
3. The browser calls `/api/dcm4chee/...`.
4. Next rewrites that path to `DCM4CHEE_BASE_URL/...`.

So the equivalent developer flow is:

```bash
npm run dev
```

not:

```bash
npm start -- --proxy-config proxy.conf.js
```

That old command is for Angular dev server, not Next.js.

## Current API assumptions
### Studies
The studies pages call dcm4chee QIDO-style endpoints under:
- `/aets/{AET}/rs/studies`
- `/aets/{AET}/rs/studies/{StudyInstanceUID}/series`

### Monitoring
The queue page calls the task monitoring endpoint under:
- `/queue/{queueName}`

Useful query params already wired in the starter:
- `PatientName`
- `PatientID`
- `AccessionNumber`
- `StudyDate`
- `ModalityInStudy` / `Modality`
- `status`
- `localAET`
- `remoteAET`
- `StudyInstanceUID`

## Notes
- Study parsing is based on DICOM JSON tags returned by QIDO-RS.
- Monitoring payloads can differ slightly between archive versions, so the queue normalizer is intentionally defensive.
- Auth and permissions are still stubbed and should be replaced by Keycloak/OIDC integration.

## Suggested next steps
1. Add Keycloak session provider.
2. Add study actions like export, retrieve, reject, restore.
3. Extend monitoring to export/retrieve/storage verification/diff tabs.
4. Add configuration forms and permission guards.
5. Split admin console and clinical workflow pages if needed.


## OHIF View integration

This starter now includes an `OHIF View` menu that launches an external OHIF viewer and passes a `configUrl` that points to `public/config/dicomweb-server.js`.

Suggested local setup:

- Run this Next app on `http://localhost:3000`
- Run the OHIF viewer app on `http://localhost:3001`
- Keep `APP_CONFIG=config/dicomweb-server.js` on the OHIF side so the viewer uses the dcm4chee DICOMweb settings exposed by this app

The launcher page is available at `/ohifview`.
