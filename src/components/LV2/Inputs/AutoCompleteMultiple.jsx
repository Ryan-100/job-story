import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { Image } from "@/components/LV1";
import { useTheme } from "styled-components";

/**
 * AutoComplete Component
 * A controlled component that displays a search input with autocomplete dropdown list of options and returns the selected value.
 * @param {string} defautlValue - The default value of the input element.
 * @param {array} options - An array of objects representing the options to be displayed in the dropdown list.
 * @param {number} width - The width of the dropdown list in pixels.
 * @param {string} name - The name to be used for the input element.
 * @param {object} control - The React Hook Form control object.
 * @param {string} error - An optional error message to be displayed below the dropdown list.
 * @param {string} placeholder - Placeholder text
 * @returns {JSX.Element} The Left icon of component.
 *
 */

export function AutoCompleteMultiple(props) {
  const {
    defautlValue,
    options,
    width,
    control,
    name,
    error,
    placeholder,
    prefixIcon,
  } = props;
  const [selected, setSelected] = useState(defautlValue ? [defautlValue] : []);

  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? options
      : options.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Combobox
          value={selected}
          onChange={(value) => {
            if (selected.includes(value)) {
              setSelected(selected.filter((item) => item !== value));
            } else {
              setSelected([...selected, value]);
            }
          }}
        >
          <div className={`relative${width ? width + "px" : " w-full"}`}>
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className={`${
                  error ? "border border-red-500" : "border border-gray-300"
                } w-full py-2 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus-visible:outline-0 rounded-lg placeholder-gray-400 ${
                  prefixIcon ? "pl-10" : "pl-3"
                }`}
                displayValue={(item) =>
                  item?.map((item) => item.name).join(", ")
                }
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
              />

              <Combobox.Button>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {prefixIcon}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Image
                    imageType="downArrow"
                    color="neutral500"
                    fillColor="neutral500"
                    width={13}
                    height={13}
                  />
                </div>
              </Combobox.Button>
            </div>

            {error ? (
              <div className="text-sm text-red-500 ml-1 mt-1">{error}</div>
            ) : null}

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
                {filteredItems?.map((item) => (
                  <Combobox.Option
                    key={item?.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-[#5C26D2] text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                    selected={selected.includes(item)}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item?.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-[#5C26D2]"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      )}
    />
  );
}

AutoCompleteMultiple.propTypes = {
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  width: PropTypes.number,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};
