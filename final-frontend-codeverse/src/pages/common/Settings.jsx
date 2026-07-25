import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Moon, Bell, Shield } from "lucide-react";
import authService from "../../services/authService";

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`h-6 w-11 rounded-full transition ${checked ? "bg-indigo-600" : "bg-ink-200"}`}
  >
    <span
      className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </button>
);

const Settings = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [contestReminders, setContestReminders] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await authService.changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      });
      toast.success("Password changed successfully");
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not change password.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-sm text-ink-400">Manage your account preferences.</p>
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-semibold">Change password</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Current password</label>
            <input type="password" className="input" {...register("old_password", { required: true })} />
          </div>
          <div>
            <label className="label">New password</label>
            <input
              type="password"
              className="input"
              {...register("new_password", { required: true, minLength: 8 })}
            />
          </div>
          <div>
            <label className="label">Confirm new password</label>
            <input
              type="password"
              className="input"
              {...register("confirm_password", {
                required: true,
                validate: (v) => v === watch("new_password") || "Passwords do not match",
              })}
            />
            {errors.confirm_password && (
              <p className="mt-1 text-xs text-rose-500">{errors.confirm_password.message}</p>
            )}
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Update password
          </button>
        </form>
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-700">Email notifications</p>
              <p className="text-xs text-ink-400">Get updates about your courses and submissions.</p>
            </div>
            <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-700">Contest reminders</p>
              <p className="text-xs text-ink-400">Get notified before contests you've registered for.</p>
            </div>
            <Toggle checked={contestReminders} onChange={setContestReminders} />
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Moon className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-semibold">Appearance</h2>
        </div>
        <p className="text-sm text-ink-400">Dark mode is coming soon.</p>
      </div>
    </div>
  );
};

export default Settings;
