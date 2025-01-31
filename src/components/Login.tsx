import { SignIn } from "@clerk/clerk-react";
import { Header } from "./Header";


const Login = () => {
  return (
    <div>
        <Header/>
        <SignIn />
    </div>
  )
}

export default Login