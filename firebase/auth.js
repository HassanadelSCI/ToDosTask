import { auth } from "./Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred;
}
async function reset(email) {
  await sendPasswordResetEmail(auth, email);
}

async function logout() {
  await auth.signOut();
}
async function getcred(email, password) {
  const provider = EmailAuthProvider;
  const authCredential = provider.credential(email, password);
  return authCredential;
}
async function checkCredentail(prov) {
  const val = await signInWithCredential(auth, prov);
  if (val) {
    return true;
  } else {
    return false;
  }
}
export { getcred, register, login, reset, logout, checkCredentail };
