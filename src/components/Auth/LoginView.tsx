import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input, Label } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";

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
    <div className="relative w-full max-w-md rounded-3xl bg-[#f2e8cf] p-8">
      <Button onClick={onBackClick} variant={"vintage_icon"} className="mb-4">
        <ArrowLeft size={24} />
      </Button>
      <h1 className="mb-8 text-3xl font-bold text-[#1c3f39]">
        Welcome Back,
        <br />
        Log In!
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Label
            htmlFor="username"
            className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
          >
            Enter Username
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={inputData.username}
            onChange={handleInputChange}
            placeholder="username"
            className="border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
          />
        </div>
        <div>
          <Label
            htmlFor="password"
            className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
          >
            Password
          </Label>
          <div className="flex gap-5">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={inputData.password}
              onChange={handleInputChange}
              placeholder="••••••••••••••"
              className="border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
            />
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              variant={"vintage_icon"}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </Button>
          </div>
        </div>
        <div className="text-right">
          <a href="#" className="text-sm text-[#1c3f39] underline">
            Forget password?
          </a>
        </div>
        <Button type="submit" variant={"vintage_primary"} className="w-full">
          Log In
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[#1c3f39]">
        Don't have account?{" "}
        <Button
          onClick={onSignupClick}
          variant={"vintage_secondary"}
          className="underline"
        >
          Sign up
        </Button>
      </p>
      {error && (
        <div
          className="absolute left-0 right-0 top-4 mx-auto w-11/12 rounded-full border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};

export default LoginView;
