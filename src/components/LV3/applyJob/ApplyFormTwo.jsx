import {Button} from "@/components/LV2/Button";
import {InputRadioGroup, InputText} from "@/components/LV2/Inputs";
import React, {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import styled, {useTheme} from "styled-components";

const ApplyFormTwo = ({setShowForm, applicationForm, onSubmit: submit, isApplying}) => {
    const theme = useTheme();
    const {control, register, handleSubmit} = useForm();
    const [customInputs, setCustomInputs] = useState();

    function uniqueArray(array) {
        const set = new Set();
        return array.filter((element) => {
            if (!set.has(element)) {
                set.add(element);
                return true;
            }
            return false;
        });
    }

    const getUniqueByLabel = useCallback((objArray) => {
        if (!Array.isArray(objArray)) {
            return [];
        }

        const uniqueMap = new Map();
        let hasDuplicates = false;

        for (const obj of objArray) {
            const {label, description, status, type, options, _id} = obj || {};
            const trimmedLabel = typeof label === "string" ? label.trim() : "";
            const trimmedType = typeof type === "string" ? type.trim() : "";
            const key = trimmedLabel + "|" + trimmedType;

            if (trimmedLabel.length > 0) {
                if (!uniqueMap.has(trimmedLabel) && !uniqueMap.has(key)) {
                    uniqueMap.set(key, {
                        label: trimmedLabel,
                        description,
                        status,
                        type,
                        options,
                        id: _id,
                    });
                } else {
                    hasDuplicates = true;
                }
            }
        }

        const uniqueArray = hasDuplicates
            ? Array.from(uniqueMap.values())
            : objArray;

        return uniqueArray.map((input) => ({
            label: input.label,
            description: input.description,
            status: input.status,
            type: input.type,
            options: input.options,
            id: input._id,
        }));
    }, []);

    useEffect(() => {
        if (applicationForm?.sections) {
            const customSectionInputs = applicationForm.sections.filter((section) => {
                return section.sectionName === "Custom Questions";
            })[0];

            const customInputs = getUniqueByLabel(customSectionInputs.inputs);

            setCustomInputs(customInputs);
        }
    }, [applicationForm, getUniqueByLabel]);

    useEffect(() => {
        if (window) {
            window.scrollTo(0, 0)
        }
    }, [])

    const onSubmitHandler = (data) => {
        const finalArray = [];
        const keys = Object.keys(data);
        keys.sort();

        for (const key of keys) {
            const question = key;
            const customQuestion = customInputs.filter(
                (input) => input.id === question
            )[0];
            if (typeof data[question] !== "object") {
                finalArray.push({
                    question: customQuestion.label,
                    answer: data[question] ? data[question] : "",
                });
            } else {
                finalArray.push({
                    question: customQuestion.label,
                    answer: data[question].join(", "),
                });
            }
        }

        submit(finalArray);
    };


    return (
        <>
            <div className="bg-white p-4">
                <p style={{color: theme.primary}}>STEP 1/2</p>
                <p className="text-xl font-bold my-7">Apply for this job</p>

                <form>
                    {customInputs?.length === 0 ? (
                        <p>No More Questions</p>
                    ) : (
                        <div className="space-y-4">
                            <hr/>
                            <div className="flex items-center gap-3">
                                <p className="text-xl font-bold mb-4 flex items-center gap-3">
                                    Custom Questions
                                </p>
                            </div>
                        </div>
                    )}

                    {customInputs?.map((input, key) => {
                        return (
                            <div key={key} className="mb-3">
                                <p className="mb-1">{input?.label || `Question ${key + 1}`}</p>
                                <p className="mb-2">{input?.description}</p>

                                {input.type === "text" ? (
                                    <div key={key}>
                                        <InputText
                                            key={key}
                                            control={control}
                                            name={String(input.id)}
                                            placeholder=""
                                        />
                                    </div>
                                ) : null}

                                {input.type === "Multiple Choice" ? (
                                    <InputRadioGroup
                                        control={control}
                                        name={String(input.id)}
                                        options={uniqueArray(input.options).map((option) => ({
                                            label: option,
                                            value: option,
                                        }))}
                                    />
                                ) : null}

                                {input.type === "Checkboxes" ? (
                                    <StyledCheckGroup>
                                        {uniqueArray(input.options).map((option, index) => {
                                            return (
                                                <label key={index}>
                                                    <input
                                                        type="checkbox"
                                                        value={option}
                                                        {...register(input.id)}
                                                    />{" "}
                                                    <span>{option}</span>
                                                </label>
                                            );
                                        })}
                                    </StyledCheckGroup>
                                ) : null}
                            </div>
                        );
                    })}
                </form>
            </div>

            <div className="flex items-center justify-between mt-5 ">
                <Button
                    onClick={() => setShowForm(1)}
                    variant="outlined"
                    bordercolor={theme.neutral400}
                    textcolor={theme.neutral600}
                >
                    Back
                </Button>
                <Button isLoading={isApplying}
                        onClick={handleSubmit(onSubmitHandler)}
                >Submit</Button>
            </div>
        </>
    );
};

export default ApplyFormTwo;

const StyledCheckGroup = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  & span {
    margin-left: 10px;
  }
`;

