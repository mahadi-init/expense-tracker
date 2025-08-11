import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./../styles/income.css";
import Wrapper from "../components/Wrapper";

const Income: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Wrapper>
          <div className="form-container">
            <input placeholder="Amount" className="form-input" />
            <input placeholder="Source" className="form-input" />
            <input placeholder="Date" className="form-input" />
            <textarea placeholder="Note" className="form-textarea"></textarea>
            <button className="form-button">Save</button>
          </div>
        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default Income;
