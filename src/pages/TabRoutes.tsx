import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import ExpenseList from "./ExpensesList";
import { lazy } from "react";
import { Redirect, Route } from "react-router";
import { cardOutline, home, settings, walletOutline } from "ionicons/icons";
import { useAtomValue } from "jotai";
import { userAtom } from "../lib/atoms";

const Home = lazy(() => import("./Home"));
const Expenses = lazy(() => import("./Expenses"));
const Settings = lazy(() => import("./Settings"));
const Income = lazy(() => import("./Income"));
const IncomeList = lazy(() => import("./IncomeList"));

const routes = [
  { path: "/home", component: Home },
  { path: "/income", component: Income },
  { path: "/income/list", component: IncomeList },
  { path: "/expenses", component: Expenses },
  { path: "/expenses/list", component: ExpenseList },
  { path: "/settings", component: Settings },
];

export default function TabRoutes() {
  const user = useAtomValue(userAtom);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        {routes.map(({ path, component: Component }) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}
      </IonRouterOutlet>

      {user && (
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="income" href="/income">
            <IonIcon icon={cardOutline} />
            <IonLabel>Income</IonLabel>
          </IonTabButton>
          <IonTabButton tab="expenses" href="/expenses">
            <IonIcon icon={walletOutline} />
            <IonLabel>Expenses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      )}
    </IonTabs>
  );
}
