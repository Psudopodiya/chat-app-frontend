// import React, { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useEffect } from "react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// const LoginRegister: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const { login, register } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     let errorMessage: string | null = null;
//     if (isLogin) {
//       errorMessage = await login({ username, password });
//     } else {
//       errorMessage = await register({ username, password, email });
//     }
//     if (errorMessage) {
//       setError(errorMessage);
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 2000); // Clear error after 5 seconds

//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {isLogin ? "Sign in to your account" : "Create a new account"}
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             {!isLogin && (
//               <div>
//                 <label htmlFor="email" className="sr-only">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             )}
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {isLogin ? "Sign in" : "Register"}
//             </button>
//           </div>
//         </form>
//         <div className="text-center">
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="font-medium text-indigo-600 hover:text-indigo-500"
//           >
//             {isLogin
//               ? "Need an account? Register"
//               : "Already have an account? Sign in"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;
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
