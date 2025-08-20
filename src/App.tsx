import { IonApp, setupIonicReact } from "@ionic/react";
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
import { useEffect, useState } from "react";
import AppLoader from "./components/AppLoader";
import TabRoutes from "./pages/TabRoutes";
import AuthRoutes from "./pages/AuthRoutes";
import { useAtomValue } from "jotai";
import { userAtom } from "./lib/atoms";

setupIonicReact();

const App: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const user = useAtomValue(userAtom);

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
      <IonReactRouter>{user ? <TabRoutes /> : <AuthRoutes />}</IonReactRouter>
    </IonApp>
  );
};

export default App;
