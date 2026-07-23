import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, MailCheck } from "lucide-react";
import api from "../../services/api";

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      // Swap for the real endpoint once your teammate builds it, e.g.
      // await api.post("/auth/forgot-password/", { email });
      await new Promise((r) => setTimeout(r, 600));
      setSent(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <MailCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-xl font-bold">Check your inbox</h1>
        <p className="mt-1 text-sm text-ink-400">
          We've sent a password reset link to your email.
        </p>
        <Link to="/login" className="btn-primary mt-6 inline-flex">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Forgot password</h1>
      <p className="mt-1 text-sm text-ink-400">
        Enter your email and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="you@college.edu"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Send reset link
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        Remembered it?{" "}
        <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
