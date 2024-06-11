import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile , signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import PropTypes from "prop-types";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
             
            if (currentUser) {
              // get token and store in client side
              const user = {email: currentUser.email}
              axiosPublic.post('/jwt', user)
              .then(res => {
                if(res.data.token){
                  localStorage.setItem('token', res.data.token);
                }
              })
            } else{
              // remove token from client side
              localStorage.removeItem('token');
            }

            setLoading(false); 
        })
        return () => {
            unSubscribe();
        }
      },[user, axiosPublic])

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
        setUser(null);
        signOut(auth)
      };



return (
    <AuthContext.Provider
      value={{ 
        user,
        loading,
        setLoading,
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