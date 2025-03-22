import PropTypes from "prop-types";
import {Controller} from "react-hook-form";
import Select, {components} from "react-select";
import React from "react";
import {Image as NativeImage} from "./../../LV1";
import {useTheme} from "styled-components";


/**
 * A wrapper component for React Select that works with react-hook-form.
 *
 * @param {object} props - The component props.
 * @param {object} props.control - The react-hook-form control object.
 * @param {array} [props.defaultValue=[]] - The default value for the select input.
 * @param {string} props.name - The name of the input field.
 * @param {array} props.options - The options for the select input.
 * @param {placeholder} props.placeholder - The options for the select input.
 * @param {isMulti} props.isMulti - The options for the multi select input.
 * @param {onClear} props.onClear - The function for onClear event.
 * @param {onRemoveItem} props.onRemoveItem - The function for onRemoveItem event.
 * @returns {JSX.Element} - The React Select component.
 */

const ReactSelectDropDown = ({
                                 control,
                                 image,
                                 defaultValue = [],
                                 name,
                                 options,
                                 placeholder,
                                 isMulti,
                                 disabled,
                                 onClear = () => {
                                 },
                                 onRemoveItem = () => {
                                 },
                             }) => {
    const theme = useTheme();
    const ValueContainer = ({children, ...props}) => {
        return (
            components.ValueContainer && (
                <components.ValueContainer {...props}>
                    {!!children && (
                        <div style={{position: "absolute", left: 6}}>
                            {image ? <NativeImage
                                imageType={image}
                                width={21}
                                height={21}
                                color={theme.primary}
                                fillColor={theme.primary}
                            /> : null}
                        </div>
                    )}
                    {children}
                </components.ValueContainer>
            )
        );
    };

    const styles = {
            valueContainer: base => ({
                    ...base,
                    paddingLeft: image ? 30 : 4
                }
            )
        }
    ;

    return (
        <Controller
            control={control}
            defaultValue={defaultValue}
            name={name}
            render={({field: {onChange, value, ...rest}}) => {
                return <Select
                    styles={styles}
                    components={{ValueContainer}}
                    options={options}
                    isMulti={isMulti}
                    value={value}
                    {...rest}
                    onChange={(selectedValue, triggeredAction) => {
                        const difference = value?.length > 0 && isMulti && value?.filter(x => !selectedValue.includes(x)); // calculates diff
                        if (isMulti && difference.length > 0) {
                            onRemoveItem(difference, name)
                        }
                        onChange(selectedValue);
                        if (triggeredAction.action === 'clear') {
                            onClear()
                        }
                    }
                    }
                    placeholder={placeholder}
                    isDisabled={disabled}

                />
            }
            }
        />
    );
};

ReactSelectDropDown.propTypes = {
    control: PropTypes.object.isRequired,
    defaultValue: PropTypes.array,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onClear: PropTypes.func,
    onRemoveItem: PropTypes.func

};

export default ReactSelectDropDown;
