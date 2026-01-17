import React from "react";

const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  icon: Icon,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-violet-400 to-violet-500 hover:bg-violet-700 text-white shadow-sm hover:shadow-md",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    danger: "bg-transparent hover:bg-red-50 text-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm h-8 rounded-lg",
    md: "px-4 py-2.5 text-sm h-11 rounded-xl",
    lg: "px-6 py-3 text-base h-12 rounded-xl",
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:curser-not-allowed whitescpace-nowrap ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
