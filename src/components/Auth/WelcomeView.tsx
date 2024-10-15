import React from "react";

import { Button } from "@/components/ui";

interface WelcomeProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const WelcomeView: React.FC<WelcomeProps> = ({
  onLoginClick,
  onSignupClick,
}) => {
  return (
    <div className="w-full max-w-md bg-[#f2e8cf] p-8">
      <div className="mb-8">
        <img
          src="/welcome.png"
          alt="Welcome Illustration"
          className="h-auto w-full"
        />
      </div>
      <h1 className="mb-4 text-2xl font-bold text-[#1c3f39]">Hello!</h1>
      <p className="mb-8 text-[#1c3f39]">
        Create your account and if you have one, log in
      </p>
      <Button
        onClick={onLoginClick} // Use the onLoginClick prop
        variant={"vintage_primary"}
        className="mb-4 w-full"
      >
        Log In
      </Button>
      <Button
        onClick={onSignupClick} // Use the onSignupClick prop
        variant={"vintage_secondary"}
        className="w-full"
      >
        Sign up
      </Button>
    </div>
  );
};

export default WelcomeView;
