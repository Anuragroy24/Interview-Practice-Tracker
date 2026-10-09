import React from "react";
import { Laptop } from "lucide-react";
import { STATUSES } from "../config/constants";
import { useTracker } from "../hooks/useTracker";

const MachineCodingCard = () => {
  const { machineStatus, changeMachineStatus } = useTracker();

  return (
    <section className="rounded-2xl border border-line bg-white p-5 md:p-6">
      {/* Heading */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tech/10 text-tech">
          <Laptop size={20} />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold">
            Machine coding round
          </h2>
          <p className="text-sm text-ink-mute">Frontend task, 2.5 hours</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        Build the practice tracker, then ship the repo, live link and demo
        video.
      </p>

      {/* Status switch */}
      <div
        role="group"
        aria-label="Machine coding status"
        className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-paper p-1"
      >
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={machineStatus === status}
            onClick={() => changeMachineStatus(status)}
            className={`cursor-pointer whitespace-nowrap rounded-lg px-1.5 py-2 text-sm font-semibold transition-colors ${
              machineStatus === status
                ? "bg-mark text-ink shadow-sm"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </section>
  );
};

export default MachineCodingCard;
