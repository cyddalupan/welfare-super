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

## 6. Updating Version Numbers

Before building a new APK, ensure that the `versionCode` and `versionName` in `android/app/build.gradle` are appropriately incremented. The `versionCode` must be a unique integer, and `versionName` is the user-visible version string (e.g., "1.0.0", "1.0.1").

*   **Edit `android/app/build.gradle`**:
    Locate the `android { ... defaultConfig { ... } }` block and update the `versionCode` and `versionName` as follows:

    ```gradle
    android {
        defaultConfig {
            applicationId "com.welfaresuper.app"
            minSdkVersion rootProject.ext.minSdkVersion
            compileSdkVersion rootProject.ext.compileSdkVersion
            targetSdkVersion rootProject.ext.targetSdkVersion
            versionCode 2 // Increment this for every new release
            versionName "1.0.1" // Update this for every new release (e.g., "1.0.1", "1.1.0")
            testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        }
    }
    ```

## 8. Android Project Configuration Verification

The following files were inspected to confirm correct configuration for icons, splash screens, and versioning:

*   **`android/app/build.gradle`**:
    *   `versionCode` and `versionName` were confirmed to be set (e.g., `1` and `"1.0"`). These should be incremented for each new release.
    *   `namespace` and `applicationId` were correctly set to `"com.welfaresuper.app"`.
    *   `minSdkVersion`, `targetSdkVersion`, and `compileSdkVersion` were correctly referenced from `rootProject.ext`.
*   **`android/app/src/main/AndroidManifest.xml`**:
    *   Confirmed `android:icon="@mipmap/ic_launcher"` and `android:roundIcon="@mipmap/ic_launcher_round"` were correctly pointing to the generated resources.
    *   Confirmed the `android:theme` for the `MainActivity` was set, which is crucial for splash screen handling.

## 9. Capacitor Push Notifications Plugin Setup

To enable push notifications using the Capacitor Push Notifications plugin, follow these steps:

### 9.1. Install the Plugin

First, ensure the Capacitor Push Notifications plugin is installed in your project.

```bash
npm install @capacitor/push-notifications
npx cap sync
```

### 9.2. Firebase Project Setup and `google-services.json`

The Capacitor Push Notifications plugin still relies on Firebase Cloud Messaging (FCM) for sending and receiving notifications. You will need a Firebase project configured for your Android app and the `google-services.json` file.

1.  Go to the [Firebase console](https://console.firebase.google.com/).
2.  Add a new project or select an existing one.
3.  Add an Android app to your Firebase project.
4.  When prompted, provide the following information:
    *   **Android package name**: Use `"com.welfaresuper.app"`. This value is defined in `android/app/build.gradle` as `applicationId`.
    *   **App nickname**: Provide a descriptive name, e.g., `"Welfare Super Android App"`. This is for your internal reference in Firebase.
    *   **SHA-1 signing certificate**: This is optional for development but required for release builds to use services like Google Sign-in or Firebase Dynamic Links. You can add it later.
5.  After registering your app, download the `google-services.json` configuration file from the Firebase console.

### 9.3. Place `google-services.json` in Your Project

Copy the downloaded `google-services.json` file into the `android/app/` directory of your project:

```bash
cp /path/to/your/downloaded/google-services.json android/app/
```

### 9.4. Configure Gradle Files

The Capacitor Push Notifications plugin automatically handles many of the Firebase SDK dependencies. However, you still need to ensure the Google Services plugin is applied.

*   **Project-level `android/build.gradle`**:
    Ensure the Google services plugin classpath is present in your project-level `build.gradle` file within the `buildscript` dependencies:

    ```gradle
    buildscript {
        repositories {
            google()
            mavenCentral()
        }
        dependencies {
            // ... other dependencies
            classpath 'com.google.gms:google-services:4.4.2' // Use the latest version
        }
    }
    ```

*   **App-level `android/app/build.gradle`**:
    The plugin for Google services is typically applied conditionally in your app-level `build.gradle` if `google-services.json` is found. Ensure this block exists:

    ```gradle
    try {
        def servicesJSON = file('google-services.json')
        if (servicesJSON.text) {
            apply plugin: 'com.google.gms.google-services'
        }
    } catch(Exception e) {
        logger.info("google-services.json not found, google-services plugin not applied. Push Notifications won't work")
    }
    ```
    *You do not need to manually add Firebase BoM or `firebase-messaging` dependencies; the Capacitor Push Notifications plugin handles these.*

### 9.5. Rebuild and Synchronize Capacitor Project

After making these changes, rebuild your web assets and synchronize your Capacitor project to ensure the Android project is updated with the new configurations.

```bash
npm run build-live
npx cap sync android
```

### 9.6. Implement Push Notifications in Your Application Code

In your Angular application, you will use the Capacitor Push Notifications API to register for push notifications, receive tokens, and handle incoming notifications. Refer to the official Capacitor Push Notifications documentation for detailed code examples.

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

// Request permission to send notifications
const addListeners = async () => {
  await PushNotifications.requestPermissions();

  await PushNotifications.addListener('registration', token => {
    console.info('Registration token: ', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.info('Push notification received: ', notification);
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.info('Push notification action performed', notification.actionId, notification.inputValue);
  });
};

addListeners();

// Register for push notifications
PushNotifications.register();



## 10. Building the Debug Android APK

To create an installable Android package (APK) for testing on a physical device, a debug build was performed. This does not require signing credentials, unlike a release build.

*   **Command**:

    ```bash
    cd android && ./gradlew assembleDebug && cd ..
    ```

*   **Output Location**:
    The generated debug APK can be found at:
    `/Users/cyd/code/welfare/welfare-super/android/app/build/outputs/apk/debug/app-debug.apk`

## 11. Installing the APK on a Device

To test the application on your Android phone:

1.  **Transfer the `app-debug.apk` file** from the location above to your Android phone. You can use a USB cable to drag-and-drop the file, or upload it to cloud storage/email it to yourself and download it on your phone.
2.  On your phone, use a file manager app to **locate and tap on the `app-debug.apk` file**.
3.  If prompted, you may need to **enable "Install unknown apps"** in your phone's security settings for the file manager or browser you are using.
4.  Follow the on-screen instructions to **install the application**.
5.  Once installed, launch the app to **verify the new icons and splash screen**.
