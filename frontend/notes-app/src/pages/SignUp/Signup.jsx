import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please create a password.");
      return;
    }

    setError("");

    try {
      setIsSubmitting(true);

      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email,
        password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

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

      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 flex items-center px-4 sm:px-6 lg:px-10 py-10 sm:py-14 transition-all duration-300">
        <div className="relative w-full max-w-5xl mx-auto">
          {/* subtle radial glow for depth */}
          <div className="pointer-events-none absolute -top-24 right-0 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/10 via-sky-400/5 to-transparent dark:from-blue-400/20 dark:via-sky-500/10 dark:to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 w-64 h-64 rounded-full bg-gradient-to-tr from-emerald-400/8 via-primary/5 to-transparent dark:from-emerald-400/18 dark:via-primary/12 dark:to-transparent blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 xl:gap-14 items-center">
            {/* Left: intro copy for new users (hidden on small screens) */}
            <div className="hidden lg:block max-w-xl text-left lg:pr-8 xl:pr-10 mb-10 sm:mb-12 lg:mb-0">
              <p className="inline-flex items-center rounded-full border border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900/20 px-3 py-1 text-xs font-medium text-green-800 dark:text-green-200 mb-4 shadow-sm">
                Create your NotesApp account in moments
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-4">
                Join <span className="text-primary">NotesApp</span> today
              </h1>

              <h3 className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed mb-4">
                Capture ideas, structure projects, and keep everything important in one clean, organized workspace.
              </h3>

              <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/80" />
                  <span>Instant sync across devices with a single secure account.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span>Comfortable light and dark themes for any environment.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/40" />
                  <span>Flexible organization with tags, folders, and collections.</span>
                </li>
              </ul>
            </div>

            {/* Right: signup card */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="border border-slate-200/90 dark:border-slate-700/80 rounded-2xl bg-white/95 dark:bg-slate-900/95 px-6 py-7 sm:px-8 sm:py-8 shadow-lg shadow-blue-500/10 dark:shadow-xl dark:shadow-blue-500/15 backdrop-blur-xl">
                <form onSubmit={handleSignup} className="space-y-6" noValidate>
                  <div className="space-y-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
                      Create your account
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      It only takes a moment to set up your workspace.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-medium text-gray-700 dark:text-gray-300 tracking-wide">
                        Full name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        className="input-box"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="signupEmail" className="text-xs font-medium text-gray-700 dark:text-gray-300 tracking-wide">
                        Email address
                      </label>
                      <input
                        id="signupEmail"
                        type="email"
                        placeholder="you@example.com"
                        className="input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="signupPassword" className="text-xs font-medium text-gray-700 dark:text-gray-300 tracking-wide">
                        Password
                      </label>
                      <PasswordInput
                        id="signupPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a strong password"
                        disabled={isSubmitting}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm leading-snug" role="alert">
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
                      {isSubmitting ? "Creating your workspace..." : "Create account"}
                    </span>
                  </button>

                  <p className="text-xs sm:text-sm text-center text-gray-600 dark:text-gray-400">
                    Already use NotesApp?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary hover:text-blue-600"
                    >
                      Sign in instead
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

export default Signup;
