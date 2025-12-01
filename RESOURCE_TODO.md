# Image Resources TODO - Checklist for Icon and Splash Screen

This checklist outlines the tasks required to prepare the primary source image assets for your Capacitor project. Once these are in place, the system will automatically generate all necessary platform-specific icons and splash screens and configure the Android application.

## Core Asset Preparation

*   **- [x] Create `resources/icon.png` (Source Icon)**
    *   **Description**: This is the primary source image for generating all app icons.
    *   **Requirements**:
        *   **Dimensions**: At least `1024x1024 pixels`.
        *   **Shape**: Square, with transparent background if desired.
        *   **Content**: Your app's main icon design.
        *   **Location**: `welfare-super/resources/icon.png`

*   **- [x] Create `resources/splash.png` (Source Splash Screen)**
    *   **Description**: This is the primary source image for generating all splash screens.
    *   **Requirements**:
        *   **Dimensions**: At least `2732x2732 pixels`.
        *   **Content**: Your app's splash screen design (consider safe areas for text/logos).
        *   **Location**: `welfare-super/resources/splash.png`