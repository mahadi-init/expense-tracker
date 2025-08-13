import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import Wrapper from "../components/Wrapper";
import { logoGoogle } from "ionicons/icons";
import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from "../lib/firebase";
import { useSetAtom } from "jotai";
import { userAtom } from "../lib/atoms";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebase);

export default function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [present, dismiss] = useIonLoading();
  const setUserAtom = useSetAtom(userAtom);
  const [alert] = useIonAlert();

  const handleSubmit = async () => {
    await present({
      message: "Loading..",
      duration: 5000,
    });
  };

  const signinwithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        setUserAtom({
          id: token,
          name: user.displayName,
          email: user.email,
        });
      })
      .catch((error) => {
        alert({
          header: error.code,
          message: error.message,
          buttons: ["OK"],
        });
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Wrapper className="w-screen h-screen bg-[url(/login.jpg)] flex flex-col text-center justify-center">
          <div className="absolute inset-0 bg-black opacity-90"></div>

          <div className="flex z-20 flex-col mt-10 gap-6">
            <IonText className="text-2xl font-semibold">
              Login To Continue
            </IonText>

            <input
              placeholder="Enter email"
              className="border p-4 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Enter password"
              className="border p-4 rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />

            <IonButton color={"tertiary"} onClick={handleSubmit}>
              <IonText className="text-gray-100">Login</IonText>
            </IonButton>

            <IonButton color={"dark"} onClick={signinwithGoogle}>
              <IonIcon icon={logoGoogle} />
              <IonText className="ml-4">Login With Google</IonText>
            </IonButton>
          </div>
        </Wrapper>
      </IonContent>
    </IonPage>
  );
}
