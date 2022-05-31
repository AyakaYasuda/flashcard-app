import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { CardProvider } from "./context/card-context";
import { AuthContext } from "./context/auth-context";

import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateCard from "./pages/CreateCard";
import AllCards from "./pages/AllCards";
import EditCard from "./pages/EditCard";
import ShuffleCards from "./pages/ShuffleCards";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useContext(AuthContext);

  if (!authUser) {
    return <Navigate to="/auth" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthContextProvider>
      <CardProvider>
        <Header />
        <main>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/auth" />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/new"
                element={
                  <ProtectedRoute>
                    <CreateCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards/*"
                element={
                  <ProtectedRoute>
                    <AllCards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards/:cid/edit"
                element={
                  <ProtectedRoute>
                    <EditCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards/shuffle"
                element={
                  <ProtectedRoute>
                    <ShuffleCards />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </main>
      </CardProvider>
    </AuthContextProvider>
  );
};

export default App;
