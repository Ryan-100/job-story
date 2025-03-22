import React, { useId } from "react";
import { Controller } from "react-hook-form";
import { PropTypes } from "prop-types";

/**
 * Checkbox component that displays a checkbox with a label.
 *
 * @component
 * @param {string} label - The label to be displayed next to the checkbox.
 * @param {string} name - The name of the input element.
 * @param {function} register - Function to register the checkbox with react-hook-form.
 */
export const CheckBox = ({ label, name, control }) => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={id}
            checked={value}
            onChange={onChange}
            className="form-checkbox h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
          />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer text-black"
            htmlFor={id}
          >
            {label}
          </label>
        </div>
      )}
    />
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.func.isRequired,
};
