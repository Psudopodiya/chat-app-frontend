import React, { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onBackClick: () => void;
  onSignupClick: () => void;
}

const LoginView: React.FC<LoginProps> = ({ onBackClick, onSignupClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const nav = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(inputData);

    if (response.success) {
      nav("/");
    } else {
      setError(response.error);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="bg-[#f2e8cf] p-8 rounded-3xl max-w-md w-full relative">
      <button onClick={onBackClick} className="text-[#1c3f39] mb-6">
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-3xl font-bold text-[#1c3f39] mb-8">
        Welcome Back,
        <br />
        Log In!
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label
            htmlFor="username"
            className="text-sm text-[#1c3f39] mb-1 block"
          >
            Enter Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={inputData.username}
            onChange={handleInputChange}
            placeholder="username"
            className="w-full bg-[#f2e8cf] border-2 border-[#1c3f39] rounded-full py-3 px-4 text-[#1c3f39]"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="text-sm text-[#1c3f39] mb-1 block"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={inputData.password}
            onChange={handleInputChange}
            placeholder="••••••••••••••"
            className="w-full bg-[#f2e8cf] border-2 border-[#1c3f39] rounded-full py-3 px-4 text-[#1c3f39]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-10 text-[#1c3f39]"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        <div className="text-right">
          <a href="#" className="text-sm text-[#1c3f39] underline">
            Forget password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-[#1c3f39] text-[#f2e8cf] py-3 rounded-full font-semibold"
        >
          Log In
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[#1c3f39]">
        Don't have account?{" "}
        <button onClick={onSignupClick} className="underline font-semibold">
          Sign up
        </button>
      </p>
      {error && (
        <div
          className="absolute top-4 left-0 right-0 mx-auto w-11/12 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-full"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};

export default LoginView;
