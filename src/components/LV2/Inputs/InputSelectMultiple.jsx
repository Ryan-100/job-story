import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Controller } from "react-hook-form";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

/**
 * @param {control} props control
 * @param {defaultValue} props defaultValue
 * @param {name} props name
 * @param {options} props options
 * @returns InputSelect with multiple value
 */

export const InputSelectMultiple = (props) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue || []}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <Listbox
              onChange={(e) => {
                console.log(e);
                onChange(e);
              }}
              multiple
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm min-h-[40px] border border-slate-300">
                  <span className="text-xs">
                    {value && value?.map((person) => person?.name).join(", ")}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                    {props.options?.map((option, optionIdx) => {
                      return (
                        <Listbox.Option
                          key={optionIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-[#E1D3FF] text-[#5C26D2]"
                                : "text-gray-900"
                            }`
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
                                {option?.role ? (
                                  <span className="ml-3 text-xs text-slate-400">
                                    {option?.role}
                                  </span>
                                ) : null}
                              </span>

                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#5C26D2]">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            //* to change avatar form mui to tailwind
            {/* {props.withGridView ? (
              <div className="grid grid-cols-12 gap-4 my-4">
                {value?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-around items-center border col-span-4 px-3 py-2 rounded-lg shadow-md"
                  >
                    <Avatar>{item?.name}</Avatar>
                    <div className="flex flex-col">
                      <Text size="xs">{item?.name}</Text>
                      <Text size="xs" color="neutral500">
                        {item?.role}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            ) : null} */}
          </>
        );
      }}
    />
  );
};
