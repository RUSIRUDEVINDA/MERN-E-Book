import React from 'react'
import { ChevronDown, LogOut, User } from 'lucide-react'

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  userRole,
  onLogout,
}) => {
  return (
    <div className="relative">
      {/* Dropdown Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        {avatar ? (
          <img
            src={avatar}
            alt={companyName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-600 transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold text-gray-900">{companyName}</p>
            <p className="text-sm text-gray-600">{email}</p>
            {userRole && (
              <p className="text-xs text-gray-500 mt-1 capitalize">{userRole}</p>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <a
              href="/profile"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition"
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </a>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-200 py-2">
            <button
              onClick={onLogout}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown
