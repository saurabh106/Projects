// //This is the authentication components using a firebase google authentication we can use it in different by using a wrap component 

// "use client";

// import React from "react";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../configs/firebaseConfig";

// function Authentication({ children }) {
//   const provider = new GoogleAuthProvider();

//   const onSignInClick = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         const user = result.user;
//         console.log("User signed in:", user);
//       })
//       .catch((error) => {
//         console.error("Sign-in error:", error);
//       });
//   };

//   // ✅ Safely call children if it's a function
//   return typeof children === "function" ? children(onSignInClick) : null;
// }

// export default Authentication;
