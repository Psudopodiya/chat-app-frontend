import { useState } from "react";

import LoginView from "@/components/Auth/LoginView";
import RegisterView from "@/components/Auth/RegisterView";
import WelcomeView from "@/components/Auth/WelcomeView";

export default function LoginRegister() {
  const [view, setView] = useState<"welcome" | "login" | "signup">("welcome");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c3f39] p-4 font-inconsolata">
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
}
