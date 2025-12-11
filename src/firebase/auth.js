import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


export const createUserEmailPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signOut = () => {
    return auth.signOut();
}