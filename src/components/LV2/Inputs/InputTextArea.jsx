import PropTypes from "prop-types";
import { useController } from "react-hook-form";

/**
 * An input component for multiple lines of text.
 *
 * @param {object} props - Component props
 * @param {string} props.name - Name of the input field.
 * @param {string} [props.label] - Optional label for the input field.
 * @param {string} [props.placeholder] - Placeholder text for the input field.
 * @param {string} [props.className] - Optional class for the input field.
 * @param {string} [props.defaultValue] - Default value for the input field.
 * @param {object} props.control - Control object from react-hook-form.
 * @param {object} [props.errors] - Errors object from react-hook-form.
 */
export function InputTextArea(props) {
  const { name, label, placeholder, className, defaultValue, control, errors } =
    props;

  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
    defaultValue: defaultValue || "",
  });

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-2 text-gray-700 text-sm font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${className}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

InputTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,
};
