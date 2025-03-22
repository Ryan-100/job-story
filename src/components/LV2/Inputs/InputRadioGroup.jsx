import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

/**
 * InputRadioGroup component for displaying a group of radio buttons
 * @param {Object} props - component props
 * @param {string} props.name - the name of the input field
 * @param {Object[]} props.options - an array of objects containing value and label for each radio button
 * @param {Object} props.control - the control object from react-hook-form
 * @returns {JSX.Element} - rendered InputRadioGroup component
 */
export function InputRadioGroup(props) {
  const { name, options, control, error } = props;
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="flex flex-col">
      {options?.map((option) => (
        <div key={option.value} className="flex items-center mb-2">
          <input
            id={option.value}
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
          />
          <label htmlFor={option.value} className="ml-3 text-sm mr-3">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}

InputRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  control: PropTypes.object.isRequired,
};
