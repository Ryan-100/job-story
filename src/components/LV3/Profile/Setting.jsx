import React, { useState } from "react";
import { Button } from "@/components/LV2/Button";
import { Image, Text } from "@/components/LV1";
import { useTheme } from "styled-components";
import Switch from "@/components/LV2/Switch";
import { InputText } from "@/components/LV2/Inputs";
import { useForm } from "react-hook-form";
import ConfirmModal from "@/components/LV2/Modal/ConfirmModal";
import Modal from "@/components/LV2/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMeQuery,
  useUpdateUserDetailsMutation,
} from "@/store/modules/user/userModule";
import { setCurrentUser } from "@/store/modules/user/user-slice";

const Setting = () => {
  const { handleSubmit, control } = useForm();

  const [openSwitch, setOpenSwitch] = useState(false);
  const [isDeactive, setIsDeactive] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);

  const user = useSelector((state) => state.user.userDetails?.data);

  const dispatch = useDispatch();

  const [updateUserDetails, { isLoading, isError }] =
    useUpdateUserDetailsMutation();

  const onSubmit = async (data) => {
    if (data.new_email === data.confirm_email) {
      const updatedData = { ...user, email: data.new_email };
      const res = await updateUserDetails(updatedData);
      console.log(res, updatedData, "change email data.");
      if (res?.data?.status === "success") {
        dispatch(setCurrentUser(res));
        setIsChangeEmail(false);
      }
    }
  };

  const deactivation = async () => {
    const updatedData = { ...user, isActive: false };
    const res = await updateUserDetails(updatedData);
    // console.log(res, "deactivated");
    if (res?.data?.status === "success") {
      dispatch(setCurrentUser(res));
      setIsDeactive(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Unable to Send data to backend.</div>;
  }

  // const theme = useTheme();
  return (
    <div className="space-y-4">
      <div className="flex justify-between py-3 border border-b-slate-300">
        <div className="space-y-4">
          <Text weight="xl">Account Setting</Text>
          <Text color="neutral400">{user?.email}</Text>
        </div>
        <div className="flex flex-col justify-end lg:w-40 w-20">
          <Button onClick={() => setIsChangeEmail(true)}>
            <p className="lg:text-[14px] text-[8px]">Change Email</p>
          </Button>
        </div>
      </div>
      <div className="flex justify-between py-3 border border-b-slate-300">
        <div className="space-y-4">
          <Text weight="xl">Subscription</Text>
          <Text color="neutral400">Email Job Alert</Text>
        </div>
        <div className="flex flex-col justify-end">
          <Switch open={openSwitch} setOpen={setOpenSwitch} />
        </div>
      </div>
      {/* <div className="flex items-center justify-center">
        <Button
          variant="outlined"
          textcolor={theme.red600}
          bordercolor={theme.neutral750}
          onClick={() => {
            setIsDeactive(true);
          }}
        >
          Deactivate Account
        </Button>
      </div> */}
      <Modal open={isChangeEmail} onClose={setIsChangeEmail}>
        <form
          className="min-w-[380px] flex flex-col justify-center bg-white rounded-lg py-3 px-5 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between items-center w-full">
            <Text weight="xl">Change Email</Text>
            <Image
              imageType="close"
              width="14"
              className="cursor-pointer"
              onClick={() => {
                setIsChangeEmail(false);
              }}
            />
          </div>
          <div className="">
            <Text className="pl-2">New Email Address</Text>
            <InputText
              width="368"
              name="new_email"
              control={control}
              placeholder="Enter your new email"
            />
          </div>
          <div className="">
            <Text className="pl-2">Confirm Email Address</Text>
            <InputText
              width="368"
              name="confirm_email"
              control={control}
              placeholder="Enter your new email again"
            />
          </div>
          <div className="flex self-end space-x-2">
            <Button
              size="md"
              type="button"
              variant="outlined"
              onClick={() => {
                setIsChangeEmail(false);
              }}
            >
              Cancel
            </Button>
            <Button size="md" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
      <ConfirmModal
        open={isDeactive}
        onClose={setIsDeactive}
        onConfirm={() => deactivation()}
        title="Deactivate Account"
        description="Are you sure you want to deactivate your account?"
      />
    </div>
  );
};

export default Setting;
