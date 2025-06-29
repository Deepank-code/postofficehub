"use client";
import React from "react";
import classNames from "classnames";

const Button = ({
  children,
  className = "",
  type = "button",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
        "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
