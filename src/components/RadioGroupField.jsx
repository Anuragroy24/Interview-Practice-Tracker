import React from "react";

// radio buttons styled as chips, the selected one gets the highlighter colour
const RadioGroupField = ({ legend, name, options, register }) => {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              value={option}
              {...register(name)}
              className="peer sr-only"
            />
            <span className="block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-ink-mute peer-checked:border-ink peer-checked:bg-mark peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroupField;
