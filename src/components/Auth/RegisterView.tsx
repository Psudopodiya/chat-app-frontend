import { ArrowLeft, Eye, EyeOff, User } from "lucide-react";
import React, { useEffect, useState } from "react";

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
    <div className="bg-[#f2e8cf] p-8 rounded-3xl max-w-md w-full">
      <button onClick={onBackClick} className="text-[#1c3f39] mb-6">
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-3xl font-bold text-[#1c3f39] mb-8">
        Welcome,
        <br />
        Sign up!
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label
            htmlFor="username"
            className="text-sm text-[#1c3f39] mb-1 block"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={inputData.username}
            onChange={handleInputChange}
            placeholder="example name"
            className="w-full bg-[#f2e8cf] border-2 border-[#1c3f39] rounded-full py-3 px-4 text-[#1c3f39]"
          />
          <User className="absolute right-4 top-10 text-[#1c3f39]" size={20} />
        </div>
        <div className="relative">
          <label htmlFor="email" className="text-sm text-[#1c3f39] mb-1 block">
            Email
          </label>
          <input
            name="email"
            id="email"
            onChange={handleInputChange}
            value={inputData.email}
            type="email"
            placeholder="example@email.com"
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
            onChange={handleInputChange}
            value={inputData.password}
            type={showPassword ? "text" : "password"}
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

        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="text-sm text-[#1c3f39] mb-1 block"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleInputChange}
            value={inputData.confirmPassword}
            type="password"
            placeholder="••••••••••••••"
            className="w-full bg-[#f2e8cf] border-2 border-[#1c3f39] rounded-full py-3 px-4 text-[#1c3f39]"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#1c3f39] text-[#f2e8cf] py-3 rounded-full mt-8 font-semibold"
        >
          Sign up
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[#1c3f39]">
        Have an account?{" "}
        <button onClick={onLoginClick} className="underline font-semibold">
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterView;
