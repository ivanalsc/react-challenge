import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import "./App.css";
import { Home } from "./components/Home.tsx";
import { Header } from "./components/Header.tsx";
import { PrivateRoute } from "./components/routes/PrivateRoute.tsx";
import BandDetail from "./components/BandDetail.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />

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

          <Route
            path="/band/:id"
            element={
              <PrivateRoute>
                <BandDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
