import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button, Input, Label } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";

interface RegisterProps {
  onLoginClick: () => void;
  onBackClick: () => void;
}

const RegisterView: React.FC<RegisterProps> = ({
  onBackClick,
  onLoginClick,
}) => {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputData.confirmPassword !== inputData.password) {
      setError("Passwords do not match.");
      return;
    }

    const { username, password, email } = inputData;
    const response = await register({ username, email, password });
    if (response.success) {
      onLoginClick();
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
    <div className="w-full max-w-md rounded-3xl bg-[#f2e8cf] p-8">
      <Button onClick={onBackClick} variant={"vintage_icon"} className="mb-4">
        <ArrowLeft size={24} />
      </Button>
      <h1 className="mb-8 text-3xl font-bold text-[#1c3f39]">
        Welcome,
        <br />
        Sign up!
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label
            htmlFor="username"
            className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
          >
            Username
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={inputData.username}
            onChange={handleInputChange}
            placeholder="example name"
            className="border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
          />
        </div>
        <div>
          <Label
            htmlFor="email"
            className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
          >
            Email
          </Label>
          <Input
            name="email"
            id="email"
            onChange={handleInputChange}
            value={inputData.email}
            type="email"
            placeholder="example@email.com"
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
              onChange={handleInputChange}
              value={inputData.password}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••••"
              className="border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
            />
            <Button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              variant={"vintage_icon"}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </Button>
          </div>
        </div>

        <div>
          <Label
            htmlFor="confirmPassword"
            className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
          >
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleInputChange}
            value={inputData.confirmPassword}
            type="password"
            placeholder="••••••••••••••"
            className="border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
          />
        </div>

        {error && <p className="text-center text-red-500">{error}</p>}
        <Button type="submit" variant={"vintage_primary"} className="w-full">
          Sign up
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[#1c3f39]">
        Have an account?{" "}
        <Button
          onClick={onLoginClick}
          variant={"vintage_secondary"}
          className="underline"
        >
          Login
        </Button>
      </p>
    </div>
  );
};

export default RegisterView;
