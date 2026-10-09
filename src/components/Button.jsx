import React from "react";

const VARIANTS = {
  primary: "bg-ink text-white hover:bg-ink-soft",
  mark: "bg-mark text-ink hover:brightness-95",
  secondary: "border border-line bg-white text-ink hover:border-ink-mute",
  ghost: "text-ink-soft hover:bg-white hover:text-ink",
  onDark: "border border-white/30 text-white hover:bg-white/10",
};

const Button = ({
  variant = "primary",
  icon: Icon,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
