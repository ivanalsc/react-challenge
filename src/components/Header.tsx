import {  SignOutButton, useAuth } from '@clerk/clerk-react'

export const Header = () => {
  const { isSignedIn } = useAuth();
 
  return (
    <header>
        Header
        { isSignedIn &&  <SignOutButton/>}
       
    </header>
  )
}
