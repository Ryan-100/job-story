import React, { useEffect, useState } from "react";
import { Image, Text } from "@/components/LV1";
import { InputText } from "@/components/LV2/Inputs";
import { useForm } from "react-hook-form";
import { Button } from "@/components/LV2/Button";
import ReactSelectDropDown from "@/components/LV2/Inputs/ReactSelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserDetailsMutation } from "@/store/modules/user/userModule";
import { setCurrentUser } from "@/store/modules/user/user-slice";

const Overview = () => {
  const user = useSelector((state) => state.user.userDetails?.data);

  const dispatch = useDispatch();

  const [updateUserDetails, { isLoading, isError }] =
    useUpdateUserDetailsMutation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: user?.email,
      name: user?.name,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      salaryExpectation: user?.salaryExpectation,
    },
  });

  const onSubmit = async (data) => {
    const updatedDetails = {
      _id: user?._id,
      name: data.name ? data.name : user?.name,
      isActive: user?.isActive,
      email: user?.email,
      address: data.address ? data.address : user?.address,
      eduLevel: data.eduLevel?.value ? data.eduLevel?.value : user?.eduLevel,
      gender: data.gender?.value ? data.gender?.value : user?.gender,
      maritalStatus: data.maritalStatus?.value
        ? data.maritalStatus?.value
        : user?.maritalStatus,
      nationality: data.nationality?.value
        ? data.nationality?.value
        : user?.nationality,
      phoneNumber: data.phoneNumber ? data.phoneNumber : user?.phoneNumber,
      salaryExpectation: data.salaryExpectation
        ? data.salaryExpectation
        : user?.salaryExpectation,
      specialization: data.specialization?.value
        ? data.specialization?.value
        : user?.specialization,
    };
    const res = await updateUserDetails(updatedDetails);
    console.log("data&res", res, data);
    if (res?.data?.status === "success") {
      dispatch(setCurrentUser(res));
    }
  };
  const [isDisabled, setIsDisabled] = useState(true);

  const options = [
    { value: "Graphic Designer", label: "Graphic Designer" },
    { value: "Office Staff", label: "Office Staff" },
    { value: "Android developer", label: "Android developer" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  const maritalStatusOptions = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Others", label: "Others" },
  ];

  const eduOptions = [
    { value: "Bachelor's", label: "Bachelor's" },
    { value: "Master's", label: "Master's" },
    { value: "Ph.d", label: "Ph.d" },
  ];

  const nationalityOptions = [
    { value: "Myanmar", label: "Myanmar" },
    { value: "Thai", label: "Thai" },
    { value: "Singaporean", label: "Singaporean" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Unable to Send data to backend.</div>;
  }

  return (
    <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <Text weight="xxl">Personal Information</Text>
        <Button
          startIcon={<Image imageType="edit2" width={14} height={14} />}
          variant="outlined"
          onClick={() => setIsDisabled((p) => !p)}
        >
          Edit
        </Button>
      </div>
      <div className="">
        <Text className="pl-2">
          Full name<span className="required">*</span>
        </Text>
        <InputText
          name="name"
          control={control}
          placeholder="Enter your name"
          disabled={isDisabled}
          defaultValue={user?.name}
        />
      </div>

      <div className="">
        <Text className="pl-2">
          Specialized Job<span className="required">*</span>
        </Text>
        <ReactSelectDropDown
          control={control}
          name="specialization"
          options={options}
          // defaultValue={[
          //   { value: user?.specialization, label: user?.specialization },
          // ]}
          disabled={isDisabled}
        />
      </div>

      <div className="">
        <Text className="pl-2">Email address</Text>
        <InputText
          name="email"
          control={control}
          placeholder="Enter your email"
          disabled
          defaultValue={user?.email}
        />
      </div>

      <div className="">
        <Text className="pl-2">Phone number</Text>
        <InputText
          name="phoneNumber"
          control={control}
          defaultValue={user?.phoneNumber}
          placeholder="Enter your contact number"
          disabled={isDisabled}
        />
      </div>

      <div className="flex w-full space-x-2">
        <div className="w-[50%]">
          <Text className="pl-2">Gender</Text>

          <ReactSelectDropDown
            control={control}
            name="gender"
            options={genderOptions}
            defaultValue={[{ value: user?.gender, label: user?.gender }]}
            disabled={isDisabled}
          />
        </div>
        <div className="w-[50%]">
          <Text className="pl-2">Nationality</Text>
          <ReactSelectDropDown
            options={nationalityOptions}
            control={control}
            defaultValue={[
              { value: user?.nationality, label: user?.nationality },
            ]}
            name="nationality"
            disabled={isDisabled}
          />
        </div>
      </div>

      <div className="">
        <Text className="pl-2">Highest education level</Text>
        <ReactSelectDropDown
          options={eduOptions}
          control={control}
          defaultValue={[{ value: user?.eduLevel, label: user?.eduLevel }]}
          name="eduLevel"
          disabled={isDisabled}
        />
      </div>

      <div className="">
        <Text className="pl-2">Address</Text>
        <InputText
          name="address"
          defaultValue={user?.address}
          control={control}
          placeholder="Enter your Address"
          disabled={isDisabled}
        />
      </div>

      <div className="lg:flex  lg:items-center lg:space-x-2 justify-center w-full space-y-4 ">
        <div className="lg:w-[50%]">
          <Text className="pl-2">Marital Status</Text>
          <ReactSelectDropDown
            options={maritalStatusOptions}
            control={control}
            defaultValue={[
              { value: user?.maritalStatus, label: user?.maritalStatus },
            ]}
            name="maritalStatus"
            disabled={isDisabled}
          />
        </div>
        <div className="lg:w-[50%] lg:mt-0 mt-0">
          <Text className="pl-2">Salary expectation</Text>
          <InputText
            // className="h-[37.6px]"
            control={control}
            defaultValue={user?.salaryExpectation}
            name="salaryExpectation"
            placeholder="Enter Your Salary Expectation"
            disabled={isDisabled}
            endPrefix={"MMK"}
          />
        </div>
      </div>
      {!isDisabled && (
        <div className="flex self-end space-x-2">
          <Button size="md" type="button" variant="outlined">
            Cancel
          </Button>
          <Button size="md" type="submit">
            Submit
          </Button>
        </div>
      )}
    </form>
  );
};

export default Overview;
