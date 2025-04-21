//So this is for the dark themes we are using shadcn for the dark themes we are created a provider.js in that we are just taking a children as a props and wrap with the nextthemesprovider and just adding a attribute that given in the document
//We can follow the docs but it is the simple way to do it . I thinks so

"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
import { AuthContext } from "./_context/AuthContext";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

const Provider = ({ children }) => {
  const [user, setUser] = useState();
  const CreateUser = useMutation(api.users.CreateNewUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log(user);
    if(user){
      //After the convexclientProvider create the user then only they save in db
      const result = await CreateUser({
        name: user?.displayName,
        email: user?.email,
        pictureURL: user?.photoURL,
      });
      setUser(result)
      // console.log(result);
    } 
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ user }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default Provider;
