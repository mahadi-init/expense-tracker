import { IonContent, IonIcon, IonPage } from "@ionic/react";
import "./../styles/settings.css";
import { arrowForwardOutline, cloudUploadOutline } from "ionicons/icons";
import Wrapper from "../components/Wrapper";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Wrapper>
          <div className="settings-container">
            {/* General */}
            <div className="settings-section">
              <p className="settings-heading">General</p>
              <div className="settings-list">
                <div className="settings-item">
                  <p>Currency</p>
                  <p>USD</p>
                </div>
                <div className="settings-item">
                  <p>Language</p>
                  <p>English</p>
                </div>
                <div className="settings-item">
                  <p>Theme</p>
                  <p>System</p>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="settings-section">
              <p className="settings-heading">Notifications</p>
              <div className="settings-list">
                <div className="settings-item">
                  <p>Daily Reminders</p>
                  <p>TODO</p>
                </div>
                <div className="settings-item">
                  <p>Transaction Alerts</p>
                  <p>TODO</p>
                </div>
              </div>
            </div>

            {/* Data */}
            <div className="settings-section">
              <p className="settings-heading">Data</p>
              <div className="settings-list">
                <div className="settings-item">
                  <p>Backup Data</p>
                  <IonIcon aria-hidden="true" icon={cloudUploadOutline} />
                </div>
                <div className="settings-item">
                  <p>Restore Data</p>
                  <IonIcon aria-hidden="true" icon={cloudUploadOutline} />
                </div>
              </div>
            </div>

            {/* About */}
            <div className="settings-section">
              <p className="settings-heading">About</p>
              <div className="settings-list">
                <div className="settings-item">
                  <p>App Version</p>
                  <p>1.2.3</p>
                </div>
                <div className="settings-item">
                  <p>Terms of Service</p>
                  <IonIcon aria-hidden="true" icon={arrowForwardOutline} />
                </div>
                <div className="settings-item">
                  <p>Privacy Policy</p>
                  <IonIcon aria-hidden="true" icon={arrowForwardOutline} />
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
