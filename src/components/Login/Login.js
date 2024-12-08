import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

const app = initializeApp (firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: {pathname: '/'}};
    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signInUser = {name: displayName, email}
            setLoggedInUser(signInUser);
            storeAuthToken();
            navigate(from); 
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

        const storeAuthToken = () => {
            getAuth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function(idToken) {
                sessionStorage.setItem('token', idToken);
              }).catch(function(error) {
                // Handle error
              });
        }
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;