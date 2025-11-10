# Project Build and Deployment Setup

This document outlines the custom build and deployment process for this Angular application.

## Overview

The standard `ng build` process is wrapped in a custom `npm run build` script to create a final deployment-ready folder named `live`. This `live` folder contains the compiled Angular application and any necessary backend PHP scripts.

## The `live` Folder

The `live` folder is the main deployment directory. It contains:
- The compiled Angular application files (e.g., `index.html`, JavaScript bundles, etc.) at its root.
- A dedicated `api/` subfolder for all backend PHP scripts.

This folder is **not** ignored by Git, allowing the PHP API files to be committed to the repository.

## Build Process

To create or update the `live` folder, run the following command:

```bash
npm run build
```

This command executes the following steps, as defined in `package.json`:

1.  **`ng build`**: The standard Angular build process runs, compiling the application into the `dist/welfareph` directory. This `dist` folder is temporary and is ignored by Git.
2.  **`mkdir -p live/api`**: This command ensures that the `live/api` directory exists, creating it if necessary. It does not delete or overwrite existing files.
3.  **`cp -R dist/welfareph/browser/. live/`**: The contents of the compiled Angular application (from the `browser` output directory) are copied into the root of the `live` folder. This process will overwrite previous Angular build files but will leave the `live/api` directory and its contents untouched.

This setup allows you to place your PHP files directly into the `live/api` directory and have them persist across builds, while the Angular application is updated by the build script.
