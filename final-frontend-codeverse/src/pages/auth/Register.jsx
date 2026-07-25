import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, GraduationCap, Presentation } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("STUDENT");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await registerUser({ ...formData, role });
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Create your account</h1>
      <p className="mt-1 text-sm text-ink-400">Start solving, learning, and competing.</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {[
          { value: "STUDENT", label: "Student", icon: GraduationCap },
          { value: "FACULTY", label: "Faculty", icon: Presentation },
        ].map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setRole(value)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
              role === value
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-ink-100 text-ink-500 hover:bg-ink-50"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">First name</label>
            <input className="input" placeholder="Ananya" {...register("first_name", { required: true })} />
          </div>
          <div>
            <label className="label">Last name</label>
            <input className="input" placeholder="Rao" {...register("last_name", { required: true })} />
          </div>
        </div>

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

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
            })}
          />
          {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
        </div>

        <div>
          <label className="label">Confirm password</label>
          <input
            type="password"
            className="input"
            placeholder="••••••••"
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (v) => v === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirm_password && (
            <p className="mt-1 text-xs text-rose-500">{errors.confirm_password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
