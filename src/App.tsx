import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import "./App.css";
import { Home } from "./components/Home.tsx";
import { Header } from "./components/Header.tsx";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { PrivateRoute } from "./components/routes/PrivateRoute.tsx";

function App() {
  return (
    <>

<Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        
     
      </Routes>
    </Router>
    </>
  );
}

export default App;
