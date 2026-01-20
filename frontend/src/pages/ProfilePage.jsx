import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, User, Calendar, Award } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          navigate("/login");
          return;
        }

        const parsedUser = JSON.parse(userData);
        const response = await axiosInstance.get(
          API_PATHS.AUTH.GET_PROFILE.replace(":id", parsedUser.id),
        );

        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      toast.loading("Updating profile...");

      const updatePayload = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password) {
        updatePayload.password = formData.password;
      }

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE.replace(":id", user._id),
        updatePayload,
      );

      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.dismiss();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.error || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-slate-600">User not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
          <p className="text-slate-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:p-8 mb-6">
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-slate-200">
            <div className="w-24 h-24 bg-gradient-to-br from-violet-400 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                {user.name}
              </h2>
              <p className="text-slate-600 mb-3">{user.email}</p>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                {user.isPro && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
                    <Award className="w-4 h-4" />
                    Pro Member
                  </span>
                )}
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          {!isEditing ? (
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <User className="w-5 h-5 text-slate-400" />
                  <p className="text-slate-900">{user.name}</p>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <p className="text-slate-900">{user.email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setIsEditing(true)} className="flex-1">
                  Edit Profile
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password (optional)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Confirm Password Input */}
              {formData.password && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.name,
                      email: user.email,
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Account Status</p>
            <p className="text-lg font-semibold text-slate-900">
              {user.isPro ? "Pro" : "Free"}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Member Since</p>
            <p className="text-lg font-semibold text-slate-900">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Last Updated</p>
            <p className="text-lg font-semibold text-slate-900">
              {new Date(user.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
