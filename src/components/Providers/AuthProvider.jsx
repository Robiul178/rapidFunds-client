import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from '../Firebase/firebase.config';


export const AuthContext = createContext();
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();

    const singUpUser = (email, password) => {
        // setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }
    const logInuser = (email, password) => {
        // setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }



    const authInfo = {
        user,
        singUpUser,
        logInuser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;