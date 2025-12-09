# Android Application Setup and Build Process

This document outlines the steps taken to configure and build the Android application, focusing on icon and splash screen generation, versioning, and the creation of a debug APK for testing.

## 1. Project Initialization and Setup

The project is an Angular web application integrated with Capacitor for native mobile deployment.

## 2. Image Asset Preparation

To ensure proper display of application icons and splash screens on Android devices, source images were provided in a dedicated `resources/` directory at the project root (`welfare-super/`).

*   **`resources/icon.png`**: A high-resolution square image (recommended `1024x1024 pixels`) for the app's launcher icon.
*   **`resources/splash.png`**: A high-resolution image (recommended `2732x2732 pixels`) for the app's loading splash screen.

*(Note: These files were created by the user following a `RESOURCE_TODO.md` checklist.)*

## 3. Installing Capacitor Asset Generation Tool

The `@capacitor/assets` package is used to automatically generate all necessary platform-specific icons and splash screens from the source images.

```bash
npm install @capacitor/assets --save-dev
```

## 4. Generating Icons and Splash Screens

After placing `icon.png` and `splash.png` in the `resources/` directory, the following command was executed to generate all required resolutions and formats for Android (and iOS/PWA):

```bash
npx capacitor-assets generate --android --ios --pwa
```

This command automatically populated the `android/app/src/main/res/` directory with various `mipmap-` and `drawable-` folders containing the correctly sized icons and splash screen images. It also updated references in `android/app/src/main/AndroidManifest.xml` as needed.

## 5. Web Asset Build and Synchronization

Before building the native Android application, the Angular web application needs to be built and synchronized with the Capacitor project.

*   **Build Web Assets**: The `build-live` script in `package.json` was used to build the Angular application in production mode and copy the compiled assets to the `live/` directory.

    ```bash
    npm run build-live
    ```

*   **Synchronize Capacitor Project**: The web assets and Capacitor plugins were synchronized with the Android project. This copies the contents of the `live/` directory into `android/app/src/main/assets/public`.

    ```bash
    npx cap sync android
    ```

## 6. Android Project Configuration Verification

The following files were inspected to confirm correct configuration for icons, splash screens, and versioning:

*   **`android/app/build.gradle`**:
    *   `versionCode` and `versionName` were confirmed to be set (e.g., `1` and `"1.0"`). These should be incremented for each new release.
    *   `namespace` and `applicationId` were correctly set to `"com.welfaresuper.app"`.
    *   `minSdkVersion`, `targetSdkVersion`, and `compileSdkVersion` were correctly referenced from `rootProject.ext`.
*   **`android/app/src/main/AndroidManifest.xml`**:
    *   Confirmed `android:icon="@mipmap/ic_launcher"` and `android:roundIcon="@mipmap/ic_launcher_round"` were correctly pointing to the generated resources.
    *   Confirmed the `android:theme` for the `MainActivity` was set, which is crucial for splash screen handling.

## 7. Building the Debug Android APK

To create an installable Android package (APK) for testing on a physical device, a debug build was performed. This does not require signing credentials, unlike a release build.

*   **Command**:

    ```bash
    cd android && ./gradlew assembleDebug && cd ..
    ```

*   **Output Location**:
    The generated debug APK can be found at:
    `/Users/cyd/code/welfare/welfare-super/android/app/build/outputs/apk/debug/app-debug.apk`

## 8. Installing the APK on a Device

To test the application on your Android phone:

1.  **Transfer the `app-debug.apk` file** from the location above to your Android phone. You can use a USB cable to drag-and-drop the file, or upload it to cloud storage/email it to yourself and download it on your phone.
2.  On your phone, use a file manager app to **locate and tap on the `app-debug.apk` file**.
3.  If prompted, you may need to **enable "Install unknown apps"** in your phone's security settings for the file manager or browser you are using.
4.  Follow the on-screen instructions to **install the application**.
5.  Once installed, launch the app to **verify the new icons and splash screen**.
