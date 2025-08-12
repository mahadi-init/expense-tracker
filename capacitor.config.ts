import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "ionic-app-base",
  webDir: "dist",
  plugins: {
    StatusBar: {
      style: "DARK",
      backgroundColor: "#ffffff",
      overlaysWebView: false,
    },
    SplashScreen: {
      // Don't auto-hide - we'll control this manually
      launchAutoHide: false,

      // Fast fade out for smooth transition
      launchFadeOutDuration: 200,

      // Match your app's background color exactly
      backgroundColor: "#ffffff",

      // Android specific
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",

      // Spinner configuration
      showSpinner: false, // Disable default spinner for custom control
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#007bff",

      // Fullscreen splash
      splashFullScreen: true,
      splashImmersive: true,

      // iOS specific
      layoutName: "launch_screen",
      useDialog: false, // Better performance without dialog
    },
    // Add Keyboard plugin for better UX
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true,
    },
    // App plugin for better lifecycle management
    App: {
      launchAutoHide: false,
    },
  },
  // Performance optimizations
  server: {
    // Enable for development
    // url: "http://localhost:3000",
    // cleartext: true,
  },
  // iOS specific configurations
  ios: {
    contentInset: "automatic",
    backgroundColor: "#ffffff",
  },
  // Android specific configurations
  android: {
    backgroundColor: "#ffffff",
    // Enable hardware acceleration
    allowMixedContent: true,
    captureInput: true,
  },
};

export default config;
