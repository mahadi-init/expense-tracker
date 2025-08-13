import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";
import { cardOutline, home, settings, walletOutline } from "ionicons/icons";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";
import { useAtomValue } from "jotai";
import { userAtom } from "./lib/atoms";
import { useEffect } from "react";

export default function TabView() {
  const user = useAtomValue(userAtom);
  const { push } = useIonRouter();

  useEffect(() => {
    if (!user) {
      push("/login", "root");
    }
  }, [push, user]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/income">
          <Income />
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
  );
}
