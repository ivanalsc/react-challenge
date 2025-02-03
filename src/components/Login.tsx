import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="flex justify-center pt-2">
      <SignIn />
    </div>
  );
};

export default Login;
