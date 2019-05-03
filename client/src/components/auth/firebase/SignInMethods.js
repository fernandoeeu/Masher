import firebaseApp from "./FirebaseConfig";
import firebase from "firebase";

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(res => {
      return this.props.history.push({
        pathname: "/home",
        state: { status: 200 },
        from: this.props.location
      });
    })
    .catch(e => console.log(e));
};
