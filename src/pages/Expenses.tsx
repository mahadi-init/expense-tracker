import { IonContent, IonPage } from "@ionic/react";
import "./../styles/expenses.css";
import Wrapper from "../components/Wrapper";

const Expenses: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Wrapper>
          <div className="form-container">
            <input placeholder="Amount" className="form-input" />
            <a href="/categories" style={{ textDecoration: "none" }}>
              <div className="form-select text-muted">Category</div>
            </a>
            <input placeholder="Date" className="form-input" />
            <textarea className="form-textarea" placeholder="Note" />
            <button className="form-button">Add Expense</button>
          </div>
        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default Expenses;
