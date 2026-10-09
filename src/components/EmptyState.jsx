import React from "react";

const EmptyState = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-ink-mute/40 bg-white/60 px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mark text-ink">
        <Icon size={26} />
      </div>

      <h2 className="mt-5 font-display text-2xl font-bold">{title}</h2>
      <p className="mt-2 max-w-sm text-ink-soft">{description}</p>

      {children && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
