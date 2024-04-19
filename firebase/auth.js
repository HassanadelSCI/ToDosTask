import { db, auth } from "./Config";
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
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function register(email, password) {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await setDoc(doc(db, "users", auth.currentUser.uid), {
    email: email,
    Todos: [],
  });
  return credentials; // return some 'credentials' of the created user.
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

async function updateTodos(todos) {
  const washingtonRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(washingtonRef, {
    Todos: todos,
  });
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
export {
  getcred,
  register,
  login,
  reset,
  logout,
  updateTodos,
  checkCredentail,
};
