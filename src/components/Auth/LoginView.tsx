import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input, Label } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onBackClick: () => void;
  onSignupClick: () => void;
}

const LoginView: React.FC<LoginProps> = ({ onBackClick, onSignupClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const nav = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset errors
    setErrors({ username: "", password: "" });

    // Validate inputs
    let hasError = false;
    if (!inputData.username.trim()) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
      hasError = true;
    }
    if (!inputData.password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    }

    if (hasError) return;

    const response = await login(inputData);

    if (response.success) {
      nav("/");
    } else {
      toast({
        title: "Login Error",
        description: response.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-none border-4 border-double border-[#1c3f39] bg-[#f2e8cf] p-8 shadow-[4px_4px_0_0_#1c3f39]">
      <Button onClick={onBackClick} variant="vintage_icon" className="mb-4">
        <ArrowLeft size={24} />
      </Button>
      <h1 className="mb-8 text-3xl font-bold uppercase tracking-wide text-[#1c3f39]">
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
            className={`border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39] ${
              errors.username ? "border-[#991b1b]" : ""
            }`}
          />
          {errors.username && (
            <p className="mt-1 text-sm font-medium text-[#991b1b]">
              {errors.username}
            </p>
          )}
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
              className={`border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39] ${
                errors.password ? "border-[#991b1b]" : ""
              }`}
            />
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              variant="vintage_icon"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </Button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm font-medium text-[#991b1b]">
              {errors.password}
            </p>
          )}
        </div>
        <div className="text-right">
          <a href="#" className="text-sm text-[#1c3f39] underline">
            Forget password?
          </a>
        </div>
        <Button type="submit" variant="vintage_primary" className="w-full">
          Log In
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[#1c3f39]">
        Don't have account?{" "}
        <Button
          onClick={onSignupClick}
          variant="vintage_secondary"
          className="underline"
        >
          Sign up
        </Button>
      </p>
    </div>
  );
};

export default LoginView;
