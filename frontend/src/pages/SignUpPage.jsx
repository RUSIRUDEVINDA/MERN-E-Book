import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { useAuth } from "../context/authContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const SignUpPage = () => {
  // State to store form input values (name, email, password)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State to track if the form is being submitted (for button loading state)
  const [isLoading, setIsLoading] = useState(false);

  // Hook to programmatically navigate to different routes after successful signup
  const navigate = useNavigate();

  // Get the login function from AuthContext to save user session
  const { login } = useAuth();

  // Update form state as user types in input fields
  const handleChange = (e) => {
    // Spread previous form data and update only the changed field
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission when user clicks "Create Account" button
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Show loading state to disable button and show spinner
    setIsLoading(true);

    try {
      // Step 1: Send registration request with user's form data to backend
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        formData
      );

      // Extract JWT token from registration response
      const { token } = response.data;

      // Step 2: Fetch user's profile data using the new token for authentication
      const profileResponse = await axiosInstance.get(
        API_PATHS.AUTH.GET_PROFILE,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Step 3: Save user data and token to AuthContext (persist login state)
      login(profileResponse.data, token);

      // Show success message to user
      toast.success("Account created successfully!");

      // Step 4: Redirect user to login page
      navigate("/login");
    } catch (error) {
      // If registration fails, show error message from backend or generic error
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      // Always stop the loading state regardless of success or failure
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-400 to-blue-500 rounded-full mb-4 shadow-md">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Create an Account
          </h1>
          <p className="text-slate-600 mt-2">
            Start your journey with AI eBook Creator
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              placeholder="Rusiru Devinda"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="you@gmail.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Minimum 6 characters"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-violet-600 hover:text-violet-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
