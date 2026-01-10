import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      setIsSubmitting(true);

      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error happened. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-4rem)] flex items-center bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="relative w-full max-w-5xl mx-auto">
          {/* subtle radial glow for depth */}
          <div className="pointer-events-none absolute -top-24 right-0 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/10 via-sky-400/5 to-transparent dark:from-blue-400/20 dark:via-sky-500/10 dark:to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 w-64 h-64 rounded-full bg-gradient-to-tr from-emerald-400/8 via-primary/5 to-transparent dark:from-emerald-400/18 dark:via-primary/12 dark:to-transparent blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 xl:gap-14 items-center">
            {/* Left: intro copy (hidden on small screens for a focused mobile experience) */}
            <div className="hidden lg:block max-w-xl mx-auto text-left lg:pr-8 xl:pr-10 mb-10 sm:mb-12 lg:mb-0">
              <p className="inline-flex items-center rounded-full border border-blue-100/80 dark:border-blue-900/50 bg-blue-50/80 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-200 mb-4 shadow-sm">
                Seamless note‑taking, wherever you work
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 mb-4">
                Welcome back to <span className="text-primary">NotesApp</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed mb-4">
                Pick up exactly where you left off. Access every notebook, tag,
                and idea in a calm, distraction‑free workspace.
              </p>
              <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300 max-w-xl">
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/80" />
                  <span>
                    Search instantly across all your notes and collections.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span>
                    Thoughtful dark mode designed for long reading and writing
                    sessions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/40" />
                  <span>Stay securely in sync on every device you use.</span>
                </li>
              </ul>
            </div>

            {/* Right: auth card */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="border border-slate-200/90 dark:border-slate-700/80 rounded-2xl bg-white/95 dark:bg-slate-900/95 px-6 py-7 sm:px-8 sm:py-8 shadow-lg shadow-blue-500/10 dark:shadow-xl dark:shadow-blue-500/15 backdrop-blur-xl">
                <form onSubmit={handleLogin} className="space-y-6" noValidate>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-snug">
                      Sign in to NotesApp
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter your credentials to access your notes dashboard.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-medium text-gray-700 dark:text-gray-300 tracking-wide"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="password"
                        className="text-xs font-medium text-gray-700 dark:text-gray-300 tracking-wide"
                      >
                        Password
                      </label>
                      <PasswordInput
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                        autoComplete="current-password"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <p
                      className="text-red-500 text-sm pb-1 leading-snug"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-primary flex items-center justify-center gap-2 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <span className="inline-block w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                    )}
                    <span>
                      {isSubmitting ? "Signing you in..." : "Sign in"}
                    </span>
                  </button>

                  <p className="text-[13px] sm:text-sm text-center text-gray-600 dark:text-gray-400 mt-1.5">
                    New to NotesApp?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-primary hover:text-blue-600"
                    >
                      Create an account in seconds
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
