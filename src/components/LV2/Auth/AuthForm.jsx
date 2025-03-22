import { Image as Icon, Text } from "@/components/LV1";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { Button } from "../Button";
import { CheckBox, InputText } from "../Inputs";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  useLoginMutation,
  useRegisterMutation,
  useResetPassMutation,
  useResetingMutation,
} from "@/store/modules/auth/authModule";
import Link from "next/link";
import { setRememberMe, setToken, setUserInfo } from "@/service";
import { useRouter } from "next/router";
import Modal from "../Modal/Modal";

const AuthForm = ({ type, schemaName }) => {
  const [showPass, setShowPass] = useState(false);
  const [open, setOpen] = useState(false);
  const [notSamePass, setNotSamePass] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaName),
  });
  const [login, { error: login_error }] = useLoginMutation(); // login
  const [register, { error: register_error }] = useRegisterMutation(); // register
  const [resetPass, { error: forgotPass_error }] = useResetPassMutation(); // resetPass
  let [reseting, { error: reseting_error }] = useResetingMutation(); // resetPass

  const handleTogglePass = () => {
    setShowPass(!showPass);
  };

  const onSubmit = async (data) => {
    if (type === "login") {
      const res = await login({
        email: data.email,
        password: data.password,
      });
      data.remember ? setRememberMe(true) : setRememberMe(false);
      if (res?.data?.status === "success") {
        setToken({
          j_token: res?.data?.token,
        });
        setUserInfo({ user_data: res?.data.data });
        router.push("/");
      }
      console.log(res, "res data");
    } else if (type === "signUp") {
      const res = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (res.data?.status === "success") {
        router.push("/login");
      }
      console.log(res, "res data");
    } else if (type === "resetPass") {
      const res = await resetPass({
        email: data.email,
      });
      if (res.data?.status === "success") {
        setOpen(true);
      }
      console.log(forgotPass_error?.data?.message, "res data");
    } else if (type === "reseting") {
      if (data.new_password === data.confirm_password) {
        const res = await reseting({
          token: data.code,
          password: data.new_password,
        });
        if (res.data?.status === "success") {
          router.push("/login");
        }
        console.log(res, "res data");
      } else {
        setNotSamePass("Enter the same password!");
      }
    }
    console.log(data);
  };

  const theme = useTheme();
  return (
    <>
      {type === "login" && (
        <div className="items-center">
          <div className="flex flex-col space-y-4">
            <Text weight="xxl">Welocme back !</Text>
            <Text>Sign in to continue</Text>
          </div>
        </div>
      )}
      {type === "signUp" && (
        <div className="items-center flex flex-col space-y-4 text-center pb-6">
          <Text weight="xxl">Let’s Get Started</Text>
          <Text className="px-2">
            Sign up and get access to all the features of Juncture
          </Text>
        </div>
      )}
      {type === "resetPass" && (
        <div className="items-center">
          <div className="flex flex-col space-y-4 text-center pb-6 ">
            <Text weight="xxl">Reset Password</Text>
            <Text>Reset your Password with Juncture</Text>
          </div>
        </div>
      )}
      {type === "reseting" && (
        <div className="items-center">
          <div className="flex flex-col space-y-4 text-center pb-6 ">
            <Text weight="xxl">Create Your New Password !</Text>
          </div>
        </div>
      )}
      <form
        className="input-form space-y-6 w-full items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {type === "signUp" && (
          <div className="items-center">
            <Text>Username</Text>
            <InputText
              placeholder="Enter Your Username"
              control={control}
              name="name"
              error={errors?.name?.message}
            />
          </div>
        )}
        {type === "reseting" && (
          <div className="space-y-3">
            <div className="items-center">
              <Text>Code Number</Text>
              <InputText
                placeholder="Enter Code Number Sent To Your Email"
                control={control}
                name="code"
                error={errors?.code?.message}
              />
            </div>
            <div className="items-center">
              <Text>New Password</Text>
              <InputText
                placeholder="Enter Your Password"
                control={control}
                name="new_password"
                error={errors?.new_password?.message}
                width="296px"
                type={showPass ? "text" : "password"}
                onClick={handleTogglePass}
                showPass={showPass}
              />
            </div>
            <div className="items-center">
              <Text>Re-type New Password</Text>
              <InputText
                placeholder="Enter Your Password"
                control={control}
                name="confirm_password"
                error={errors?.confirm_password?.message}
                width="296px"
                type={showPass ? "text" : "password"}
                onClick={handleTogglePass}
                showPass={showPass}
              />
            </div>
          </div>
        )}

        {type === "resetPass" && (
          <Text
            className="rounded-lg p-2"
            style={{ backgroundColor: theme.black, color: theme.white }}
          >
            Enter your Email and the instruction will be sent to you.
          </Text>
        )}

        {type !== "reseting" && (
          <div className="items-center">
            <Text>Email</Text>
            <InputText
              placeholder="Enter Your Email"
              control={control}
              name="email"
              error={errors?.email?.message}
              width="296px"
            />
          </div>
        )}

        {(type === "signUp" || type === "login") && (
          <div className="items-center">
            <Text>Password</Text>
            <InputText
              placeholder="Enter Your Password"
              control={control}
              name="password"
              error={errors?.password?.message}
              width="296px"
              type={showPass ? "text" : "password"}
              onClick={handleTogglePass}
              showPass={showPass}
            />
          </div>
        )}

        {type === "login" && (
          <div className="space-y-6">
            <div className="flex justify-between space-x-6">
              <CheckBox label="Remember Me" name="remember" control={control} />
              <Link href="/forgetPass">Forgot Password?</Link>
            </div>
            <div>
              <Button fullWidth>Sign In</Button>
              {login_error && (
                <Text className="required" size="xs">
                  {login_error?.data?.message}
                </Text>
              )}
            </div>
            <Text size="md">
              Don't have an account?
              <Link href="/signUp" className="cursor-pointer underline">
                Sign Up
              </Link>
            </Text>
          </div>
        )}

        {type === "signUp" && (
          <div className="space-y-6">
            <CheckBox
              label="I agree to the Terms and Conditions"
              name="terms"
              control={control}
            />
            <div>
              <Button fullWidth>Sign Up</Button>
              {register_error && (
                <Text className="required" size="xs">
                  {register_error?.data?.message}
                </Text>
              )}
            </div>
            <Text className="text-center" size="md">
              Already a member?
              <Link href="/login" className="cursor-pointer underline">
                Sign In
              </Link>
            </Text>
          </div>
        )}

        {type === "resetPass" && (
          <div className="space-y-6">
            <div>
              <Button fullWidth>Send Request</Button>
              {forgotPass_error && (
                <Text className="required" size="xs">
                  {forgotPass_error?.data?.message}
                </Text>
              )}
            </div>
            <Text className="text-center" size="md">
              Remembered it?
              <Link href="/login" className="cursor-pointer underline">
                Sign In
              </Link>
            </Text>
          </div>
        )}
        {type === "reseting" && (
          <div>
            <Button fullWidth>Set The New Password</Button>{" "}
            {(reseting_error || notSamePass) && (
              <Text className="required" size="xs">
                {notSamePass ? notSamePass : reseting_error?.data?.message}
              </Text>
            )}
          </div>
        )}
      </form>
      <Modal open={open} onClose={setOpen}>
        <div className="flex flex-col items-center bg-white rounded-xl lg:max-w-[360px] min-w-[90%] p-4 space-y-3">
          <Icon imageType="success" width="70" height="70" />
          <Text weight="xxl">Success !</Text>
          <Text className="text-center">
            Password reset request was sent successfully. Plerase check your
            email to reset your password.
          </Text>
          <Button
            onClick={() => {
              setOpen(false);
              router.push("/resetPass");
            }}
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AuthForm;
