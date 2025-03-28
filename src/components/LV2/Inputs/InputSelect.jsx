import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

/**
 * InputSelect Component
 * A controlled component that displays a dropdown list of options and returns the selected value.
 * @param {array} options - An array of objects representing the options to be displayed in the dropdown list.
 * @param {number} width - The width of the dropdown list in pixels.
 * @param {string} name - The name to be used for the input element.
 * @param {object} control - The React Hook Form control object.
 * @param {string} error - An optional error message to be displayed below the dropdown list.
 */

export function InputSelect(props) {
  const { options, width, name, control, error, disabled, defaultValue } =
    props;
  const [selected, setSelected] = useState(options[0]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Listbox
          disabled={disabled}
          value={defaultValue ? defaultValue : selected}
          onChange={(value) => {
            setSelected(value);
            onChange(value);
          }}
          className={`${disabled ? "text-gray-500" : "text-gray-900"}`}
        >
          <div className={`relative mt-1 ${width ? width + "px" : "w-full"}`}>
            <Listbox.Button
              className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border ${
                error ? "border-red-500" : " border-gray-300"
              }`}
            >
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            {error ? (
              <div className="text-sm text-red-500 ml-1 mt-1">{error}</div>
            ) : null}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
                {options?.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      } `
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option?.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    />
  );
}

InputSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  width: PropTypes.number,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  error: PropTypes.string,
};
