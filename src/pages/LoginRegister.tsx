import LoginView from "@/components/Auth/LoginView";
import RegisterView from "@/components/Auth/RegisterView";
import WelcomeView from "@/components/Auth/WelcomeView";

import { useState } from "react";
const LoginRegister: React.FC = () => {
  const [view, setView] = useState<"welcome" | "login" | "signup">("welcome");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2f3e46] p-4">
      {view === "welcome" && (
        <WelcomeView
          onLoginClick={() => setView("login")}
          onSignupClick={() => setView("signup")}
        />
      )}
      {view === "login" && (
        <LoginView
          onBackClick={() => setView("welcome")}
          onSignupClick={() => setView("signup")}
        />
      )}
      {view === "signup" && (
        <RegisterView
          onBackClick={() => setView("welcome")}
          onLoginClick={() => setView("login")}
        />
      )}
    </div>
  );
};

export default LoginRegister;
