import { useState } from "react";

import { LoginView, RegisterView, WelcomeView } from "@/components/Auth";

export default function LoginRegister() {
  const [view, setView] = useState<"welcome" | "login" | "signup">("welcome");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1c3f39] p-4">
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
