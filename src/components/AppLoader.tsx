import { IonApp, IonIcon, IonSpinner } from "@ionic/react";
import { home } from "ionicons/icons";

export default function AppLoader() {
  return (
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
}
