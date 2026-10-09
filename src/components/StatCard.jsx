import React from "react";

const StatCard = ({ icon: Icon, label, value, total, hint }) => {
  return (
    <div className="bg-white p-5 md:p-6">
      <p className="flex items-center gap-2 text-sm text-ink-soft">
        <Icon size={16} className="text-ink-mute" />
        {label}
      </p>

      <div className="mt-3 font-display text-4xl font-bold">
        {value}
        {total !== undefined && (
          <span className="ml-1.5 text-lg font-medium text-ink-mute">
            of {total}
          </span>
        )}
      </div>

      <p className="mt-1 text-sm text-ink-mute">{hint}</p>
    </div>
  );
};

export default StatCard;
