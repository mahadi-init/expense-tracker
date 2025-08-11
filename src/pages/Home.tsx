import { IonContent, IonPage } from "@ionic/react";
import "./../styles/home.css";
import Wrapper from "../components/Wrapper";
import Toolbar from "../components/Toolbar";

const Home: React.FC = () => {
  const data = {
    total_income: 500,
    total_expenses: 2300,
    balance: 5_500,
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Toolbar title="Home" />
        <Wrapper>
          <div className="stats-container">
            <div className="stat-card">
              <p className="stat-title">Total Income</p>
              <p className="stat-value">${data.total_income}</p>
            </div>

            <div className="stat-card">
              <p className="stat-title">Total Expenses</p>
              <p className="stat-value">${data.total_expenses}</p>
            </div>
          </div>

          <div className="balance-card">
            <p className="stat-title">Current Balance</p>
            <p className="stat-value">${data.balance}</p>
          </div>

          <p className="section-heading">Monthly Overview</p>

          <div className="monthly-overview">
            <p className="stat-value">$3200</p>
            <p className="subtext">Current Month</p>

            <div className="chart-container">
              <div className="chart-item">
                <div className="chart-bar"></div>
                <p className="chart-label">Income</p>
              </div>

              <div className="chart-item">
                <div className="chart-bar"></div>
                <p className="chart-label">Expenses</p>
              </div>
            </div>
          </div>
        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default Home;
