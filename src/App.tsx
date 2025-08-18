import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import { lazy, useEffect, useState } from "react";
import AppLoader from "./components/AppLoader";
import { Redirect, Route } from "react-router";
import { cardOutline, home, settings, walletOutline } from "ionicons/icons";

const Home = lazy(() => import("./pages/Home"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Settings = lazy(() => import("./pages/Settings"));
const Income = lazy(() => import("./pages/Income"));
const IncomeList = lazy(() => import("./pages/IncomeList"));

setupIonicReact();

const App: React.FC = () => {
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

        // Simulate critical app initialization
        initPromises.push(
          new Promise((resolve) => {
            setTimeout(resolve, 100);
          }),
        );

        // Wait for all critical tasks to complete
        await Promise.all(initPromises);

        // Small delay to ensure smooth transition
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Hide splash screen after a short delay to prevent flicker
        if (Capacitor.isNativePlatform()) {
          setTimeout(async () => {
            await SplashScreen.hide();
            setInitializing(false);
          }, 100);
        } else {
          // For web, just remove the loading state
          setTimeout(() => {
            setInitializing(false);
          }, 300);
        }
      } catch (error) {
        console.error("App initialization failed:", error);
        setInitializing(false);

        if (Capacitor.isNativePlatform()) {
          await SplashScreen.hide();
        }
      }
    };

    initializeApp();
  }, []);

  if (initializing) {
    return <AppLoader />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/income">
              <Income />
            </Route>
            <Route path="/income/list">
              <IncomeList />
            </Route>
            <Route exact path="/expenses">
              <Expenses />
            </Route>
            <Route exact path="/settings">
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
