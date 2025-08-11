import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

export default function Toolbar({ title }: { title: string }) {
  return (
    <IonHeader collapse="fade">
      <IonToolbar>
        <IonTitle size="large">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
