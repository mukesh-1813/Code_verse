import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Camera } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import authService from "../../services/authService";
import Loader from "../../components/common/Loader";

const Profile = () => {
  const { user, setUser, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    refreshProfile()
      .catch(() => {})
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) reset({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  }, [user, reset]);

  const onSubmit = async (formData) => {
    try {
      // Uses PUT /api/auth/profile/ - swap to authService.patchProfile for partial updates
      const { data } = await authService.updateProfile(formData);
      const updated = data?.data || data;
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not update profile.");
    }
  };

  if (loading) return <Loader />;

  const initials = `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Profile</h1>
        <p className="text-sm text-ink-400">Manage your personal information.</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-500 hover:bg-ink-50">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-ink-800">
              {user?.first_name} {user?.last_name}
            </p>
            <span className="badge bg-indigo-50 text-indigo-600">{user?.role}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label">First name</label>
              <input className="input" {...register("first_name", { required: true })} />
            </div>
            <div>
              <label className="label">Last name</label>
              <input className="input" {...register("last_name", { required: true })} />
            </div>
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" disabled {...register("email")} />
            <p className="mt-1 text-xs text-ink-300">Email cannot be changed.</p>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
