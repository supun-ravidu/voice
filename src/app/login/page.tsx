"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Chrome,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/**
 * Form data structure for login
 */
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * GradientMesh Component - Abstract animated graphic for desktop
 */
const GradientMesh: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Main gradient mesh */}
      <div className="gradient-mesh absolute inset-0" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-72 h-72 bg-neon-purple/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
      />

      {/* Tagline overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-4 leading-tight">
          Empower Your Voice
        </h2>
        <p className="text-xl text-white/70 font-light max-w-md">
          Master Your Craft
        </p>

        {/* Decorative underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-1 bg-gradient-to-r from-neon-purple to-purple-400 rounded-full mt-6"
        />
      </motion.div>
    </motion.div>
  );
};

/**
 * FormField Component - Reusable input field with animations
 */
interface FormFieldProps {
  label: string;
  name: keyof LoginFormData;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
  register: any;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  index: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  error,
  register,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="mb-5"
    >
      <label htmlFor={name} className="block text-sm font-medium text-white/90 mb-2">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 group-hover:text-neon-purple transition-colors">
          {icon}
        </div>
        <input
          id={name}
          type={
            showPasswordToggle
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          {...register(name)}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all duration-300 hover:border-white/30"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-neon-purple transition-colors"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mt-2 text-red-400 text-sm gap-1"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

/**
 * Main Login Page Component
 */
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login data:", data);
      setSubmitStatus("success");
      setSuccessMessage(`Welcome back! Signing in as ${data.email}`);
      setTimeout(() => {
        // In a real app, redirect to dashboard
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-deep-purple via-purple-900 to-black overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main container */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left Panel - Form (Mobile first, then left on desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center px-4 py-8 md:py-0 order-2 md:order-1"
        >
          <div className="w-full max-w-sm">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ boxShadow: ["0 0 20px rgba(217, 70, 239, 0.3)", "0 0 40px rgba(217, 70, 239, 0.5)", "0 0 20px rgba(217, 70, 239, 0.3)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <img
                    src="https://ibb.co/39N1Db27"
                    alt="Voice Logo"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Form Card */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="glass-dark p-8 md:p-10 rounded-3xl"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-white/70">
                  Sign in to continue to your Voice experience
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  icon={<Mail className="w-5 h-5" />}
                  error={errors.email?.message}
                  register={register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  index={0}
                />

                {/* Password Field */}
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  icon={<Lock className="w-5 h-5" />}
                  error={errors.password?.message}
                  showPasswordToggle
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  register={register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  index={1}
                />

                {/* Remember Me & Forgot Password */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between py-2"
                >
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register("rememberMe")}
                      className="w-4 h-4 rounded border border-white/30 bg-white/10 checked:bg-neon-purple checked:border-neon-purple cursor-pointer accent-neon-purple transition-all"
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-sm text-neon-purple hover:text-purple-300 transition-colors font-medium"
                  >
                    Forgot password?
                  </motion.a>
                </motion.div>

                {/* Submit Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 flex items-center gap-2 text-green-300"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{successMessage}</span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-300"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Sign in failed. Please try again.</span>
                  </motion.div>
                )}

                {/* Sign In Button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-neon-purple to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-purple-600/50 disabled:to-purple-700/50 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-neon-purple/50 disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-transparent border-t-white rounded-full"
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="relative my-8"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/50 text-white/60">
                    or continue with
                  </span>
                </div>
              </motion.div>

              {/* Google Sign In */}
              <motion.button
                variants={itemVariants}
                type="button"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Chrome className="w-5 h-5" />
                Continue with Google
              </motion.button>

              {/* Sign Up Link */}
              <motion.p
                variants={itemVariants}
                className="text-center mt-8 text-white/70"
              >
                Don't have an account?{" "}
                <motion.a
                  href="#"
                  whileHover={{ color: "#d946ef" }}
                  className="text-neon-purple font-semibold hover:text-purple-300 transition-colors"
                >
                  Create one
                </motion.a>
              </motion.p>
            </motion.div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center text-white/50 text-xs mt-6"
            >
              By signing in, you agree to our{" "}
              <a href="#" className="text-neon-purple hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-neon-purple hover:underline">
                Privacy Policy
              </a>
            </motion.p>
          </div>
        </motion.div>

        {/* Right Panel - Graphic (Desktop only) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex md:items-center md:justify-center relative order-1 md:order-2 overflow-hidden rounded-3xl"
        >
          <GradientMesh />
        </motion.div>
      </div>
    </div>
  );
}
