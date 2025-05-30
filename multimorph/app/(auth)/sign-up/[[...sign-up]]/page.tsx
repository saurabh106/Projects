import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="flex min-h-screen items-center justify-center">
    <SignUp 
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      afterSignUpUrl="/" // Should match your middleware
      afterSignInUrl="/" // Should match sign-in page
    />
  </div>
);

export default SignUpPage;