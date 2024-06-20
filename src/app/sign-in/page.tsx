// app/sign-in/page.tsx
import AuthLayout from "@/components/Layout/AuthLayout";
import LoginForm from "@/components/SignIn/Form";
// import { authOptions } from

const SignInPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default SignInPage;
