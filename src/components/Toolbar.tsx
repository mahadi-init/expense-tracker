import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

export default function Toolbar({ title }: { title: string }) {
  return (
    <IonHeader collapse="fade">
      <IonToolbar style={{ paddingTop: "12px" }}>
        <IonTitle size="large">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
