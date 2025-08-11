import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonSpinner,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { cardOutline, home, settings, walletOutline } from "ionicons/icons";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.always.css";
import "./theme/variables.css";

import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { useEffect, useState } from "react";

setupIonicReact();

// Loading component that matches splash screen design
const AppLoader: React.FC = () => (
  <IonApp>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "var(--ion-background-color, #ffffff)",
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        {/* Your app logo/icon here */}
        <IonIcon
          icon={home}
          style={{
            fontSize: "4rem",
            color: "var(--ion-color-primary)",
          }}
        />
      </div>
      <IonSpinner
        name="crescent"
        color="primary"
        style={{ transform: "scale(1.2)" }}
      />
    </div>
  </IonApp>
);

const App: React.FC = () => {
  const [appReady, setAppReady] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Start initialization immediately
        const initPromises = [];

        // Configure status bar for native platforms
        if (Capacitor.isNativePlatform()) {
          initPromises.push(
            StatusBar.setStyle({ style: Style.Dark }),
            StatusBar.setBackgroundColor({ color: "#ffffff" }),
          );
        }

        // Add your async initialization tasks here
        // Examples:
        // - Database initialization
        // - User authentication check
        // - App configuration loading
        // - Cache warming

        // Simulate critical app initialization
        initPromises.push(
          new Promise((resolve) => {
            // Replace with actual initialization logic
            setTimeout(resolve, 100); // Minimal delay for critical tasks only
          }),
        );

        // Wait for all critical tasks to complete
        await Promise.all(initPromises);

        // Small delay to ensure smooth transition
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Set app as ready
        setAppReady(true);

        // Hide splash screen after a short delay to prevent flicker
        if (Capacitor.isNativePlatform()) {
          setTimeout(async () => {
            await SplashScreen.hide();
            setInitializing(false);
          }, 150);
        } else {
          // For web, just remove the loading state
          setTimeout(() => {
            setInitializing(false);
          }, 300);
        }
      } catch (error) {
        console.error("App initialization failed:", error);
        // Handle initialization errors gracefully
        setAppReady(true);
        setInitializing(false);

        if (Capacitor.isNativePlatform()) {
          await SplashScreen.hide();
        }
      }
    };

    initializeApp();
  }, []);

  // Show loader during initialization
  if (initializing) {
    return <AppLoader />;
  }

  // Main app content
  return (
    <IonApp
      style={{
        opacity: appReady ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/income">
              <Income />
            </Route>
            <Route path="/expenses">
              <Expenses />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="income" href="/income">
              <IonIcon aria-hidden="true" icon={cardOutline} />
              <IonLabel>Income</IonLabel>
            </IonTabButton>
            <IonTabButton tab="expenses" href="/expenses">
              <IonIcon aria-hidden="true" icon={walletOutline} />
              <IonLabel>Expenses</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon aria-hidden="true" icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
