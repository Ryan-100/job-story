import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController } from "react-hook-form";
import { FiCalendar } from "react-icons/fi";

/**
 * A datepicker component using react-datepicker and styled with TailwindCSS.
 *
 * @param {object} props - Component props
 * @param {string} props.name - Name of the input field.
 * @param {string} [props.label] - Optional label for the input field.
 * @param {Date} [props.value] - The currently selected date value.
 * @param {Function} props.onChange - Function to be called when the date value changes.
 * @param {object} props.control - Control object from react-hook-form.
 */
export function DatePickerInput(props) {
  const { name, label, value, onChange, control } = props;

  const {
    field: { onChange: onInputChange, onBlur, value: inputVal },
  } = useController({
    name,
    control,
    defaultValue: value || null,
  });

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-2 text-gray-700 text-sm font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative">
        <DatePicker
          selected={inputVal}
          onChange={(date) => {
            onInputChange(date);
            onChange && onChange(date);
          }}
          onBlur={onBlur}
          className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <FiCalendar className="h-6 w-6 text-gray-500" />
        </div>
      </div>
    </div>
  );
}

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
};
