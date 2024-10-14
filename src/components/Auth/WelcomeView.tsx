import React from "react";

interface WelcomeProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const WelcomeView: React.FC<WelcomeProps> = ({
  onLoginClick,
  onSignupClick,
}) => {
  return (
    <div className="bg-[#f2e8cf] p-8 rounded-3xl max-w-md w-full">
      <div className="mb-8">
        <img
          src="/welcome.png"
          alt="Welcome Illustration"
          className="w-full h-auto"
        />
      </div>
      <h1 className="text-2xl font-bold text-[#1c3f39] mb-4">Hello!</h1>
      <p className="text-[#1c3f39] mb-8">
        Create your account and if you have one, log in
      </p>
      <button
        onClick={onLoginClick} // Use the onLoginClick prop
        className="w-full bg-[#1c3f39] text-[#f2e8cf] py-3 rounded-full mb-4 font-semibold"
      >
        Log In
      </button>
      <button
        onClick={onSignupClick} // Use the onSignupClick prop
        className="w-full border-2 border-[#1c3f39] text-[#1c3f39] py-3 rounded-full font-semibold"
      >
        Sign up
      </button>
    </div>
  );
};

export default WelcomeView;
