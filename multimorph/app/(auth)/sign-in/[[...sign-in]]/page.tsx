import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex min-h-screen items-center justify-center">
    <SignIn 
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      afterSignInUrl="/" // Your protected page
      afterSignUpUrl="/" // Same or different as needed
    />
  </div>
);

export default SignInPage;