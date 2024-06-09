import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile , signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import PropTypes from "prop-types";
import auth from "../firebase/firebase.config";


export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);   
            // if (currentUser) {
            //     axios.post('https://node-blogs-lyart.vercel.app/jwt', email, {withCredentials: true})
            // } else{
            //   axios.post('https://node-blogs-lyart.vercel.app/logout', email, {withCredentials: true})
            // }
        })
        return () => {
            unSubscribe();
        }
      },[])

      const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
      };

      const logInWithEmailPass = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
      };

      const GoogleProvider = new GoogleAuthProvider();

    const logInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider)
    };

    const profileUpdate = (obj) => {
        return updateProfile(auth.currentUser, obj)
      };

    const logOut = () => {
        setLoading(true);
        signOut(auth)
      };



return (
    <AuthContext.Provider
      value={{ 
        user,
        loading,
        createUser, 
        logInWithEmailPass,
        logInWithGoogle,
        logOut,
        profileUpdate
        }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;