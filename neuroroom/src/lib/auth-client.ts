// In this code i expor the auth-client that is used in the client side to make the request to the server
//function sing
//function signIn.email is used to sign in the user with the email and password
//function signOut is used to sign out the user
//function getSession is used to get the session of the user
//function getUser is used to get the user of the session
//function getSession is used to get the session of the user

import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({});
