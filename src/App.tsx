import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import { Home, LoginRegister, Profile } from "./pages";

import { AuthProvider } from "@/context/AuthContext";
import PrivateRoute from "@/router/PrivateRoute";
import "./App.css";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex h-screen flex-col overflow-hidden">
          <Routes>
            <Route path="/login" element={<LoginRegister />} />
            <Route
              path=""
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Home />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
