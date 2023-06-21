import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import useAuth from "../hooks/useAuth";
import { auth } from "../firebase.config";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900 p-4">
      {isLoggedIn && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <Image
              src={user?.photoURL as string}
              width="80"
              height="80"
              className="h-20 w-20 rounded-lg shadow-lg"
              alt={user?.displayName as string}
              priority={true}	
            />
            <span className="ml-2 text-white">{user?.displayName}</span>
          </div>
          <button className="text-white mt-8" onClick={() => auth.signOut()}>
            Logout
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <button className="flex items-center justify-center text-white" onClick={() => handleAuth()}>
          <FcGoogle fontSize={30} className="mr-2" />
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Auth;