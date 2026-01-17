import React from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      {/* Dropdown Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 px-3"
      >
        {avatar ? (
          <img
            src={avatar}
            alt={companyName}
            className="w-9 h-9 rounded-xl object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {companyName ? companyName.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">{companyName}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold text-gray-900">{companyName}</p>
            <p className="text-sm font-medium text-gray-900">{email}</p>
          </div>

          <a
            onClick={() => navigate("/profile")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors cursor-pointer"
          >
            View Profile
          </a>
          {/* Logout */}
          <div className="border-t border-gray-100 mt-2 py-2">
            <a
              href="#"
              onClick={onLogout}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2 transition-colors cursor-pointer"
            >
              Sign Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
