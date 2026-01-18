import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Save, Camera, AlertCircle, Phone, Globe, MapPin } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/authContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const ProfilePage = () => {
    const { user, login } = useAuth(); // login function can update the user context
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                // Fetch latest user data
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE.replace(":id", user.id || user._id));
                const userData = response.data;

                // Update form data
                setFormData(prev => ({
                    ...prev,
                    name: userData.name || "",
                    email: userData.email || "",
                }));

                // Update context if data changed significantly (optional but good for syncing)
                // We need the token to call 'login' to update the context/localStorage
                const token = localStorage.getItem("token");
                if (token) {
                    // Create a user object that mimics the login response structure if needed, 
                    // but the 'userData' from getProfile usually matches what we want in context (minus token)
                    // getProfile returns { _id, name, email, ... }
                    // context expects { id, ... } or { _id ... } depending on usage.
                    // Let's standardize to what login returns: { id, name, email, ... }
                    const contextUser = {
                        ...userData,
                        id: userData._id || userData.id
                    };
                    login(contextUser, token);
                }

            } catch (error) {
                console.error("Failed to fetch profile:", error);
                // Fallback to context user if fetch fails
                setFormData(prev => ({
                    ...prev,
                    name: user.name || "",
                    email: user.email || "",
                }));
            }
        };

        fetchProfile();
    }, [user?.id]); // Depend on user ID ensuring we have a user to fetch for

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
                toast.error("New passwords do not match");
                setIsLoading(false);
                return;
            }

            const updateData = {
                name: formData.name,
                email: formData.email,
            };

            if (formData.newPassword) {
                updateData.password = formData.newPassword;
            }

            // The backend ignores ID in the URL for updateProfile, but the route requires it.
            // We'll pass the user ID.
            const url = API_PATHS.AUTH.UPDATE_PROFILE.replace(":id", user.id || user._id);

            const response = await axiosInstance.put(url, updateData);

            // Update context with new user data
            // We retain the token, just update the user info
            const token = localStorage.getItem("token");
            if (response.data.user && token) {
                login(response.data.user, token);
            }

            toast.success("Profile updated successfully");

            // Clear password fields
            setFormData(prev => ({
                ...prev,
                newPassword: "",
                confirmPassword: ""
            }));

        } catch (error) {
            console.error("Profile update error:", error);
            toast.error(error.response?.data?.error || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
                        <p className="text-slate-500 mt-1">Manage your account information and preferences</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Profile Info Card */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <div className="flex flex-col md:flex-row gap-8 items-start">

                                {/* Avatar Section */}
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full overflow-hidden bg-violet-100 ring-4 ring-white shadow-lg flex items-center justify-center">
                                            {user?.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-4xl font-bold text-violet-600">
                                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                                </span>
                                            )}
                                        </div>
                                        {/* Placeholder for avatar upload - visually available but disabled logic as per backend */}
                                        <button
                                            type="button"
                                            className="absolute bottom-1 right-1 p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors shadow-md cursor-not-allowed opacity-80"
                                            title="Avatar upload coming soon"
                                            disabled
                                        >
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                                        <p className="text-sm text-gray-500">{user?.email}</p>
                                        {user?.isPro && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-violet-500 to-purple-500 text-white mt-2">
                                                PRO Member
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="flex-1 w-full space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField
                                            label="Full Name"
                                            name="name"
                                            icon={User}
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            required
                                        />
                                        <InputField
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            icon={Mail}
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2 pt-4 border-t border-gray-100">
                                            <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Lock className="w-4 h-4 text-gray-500" />
                                                Change Password
                                            </h4>
                                        </div>
                                        <InputField
                                            label="New Password"
                                            name="newPassword"
                                            type="password"
                                            icon={Lock}
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            placeholder="Leave blank to keep current"
                                            minLength={6}
                                        />
                                        <InputField
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type="password"
                                            icon={Lock}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                icon={Save}
                                className="w-full md:w-auto px-8"
                            >
                                Save Changes
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProfilePage;
