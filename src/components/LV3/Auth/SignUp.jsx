import React from "react";
import Image from "next/image";

import { Text } from "@/components/LV1";
import { useTheme } from "styled-components";
import AuthForm from "@/components/LV2/Auth/AuthForm";
import * as yup from "yup";

const signUpSchema = yup.object().shape({
  email: yup.string().required("Enter your email").email("Not a proper email!"),
  name: yup.string().required("Enter your name"),
  password: yup
    .string()
    .required("Enter your password")
    .min(6, "Password must be at least 6 characters long!"),
});

const SignUp = () => {
  const theme = useTheme();
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      <div className="lg:flex lg:top-[15%] lg:left-[25%]">
        <div
          className="flex flex-col items-center pb-[10%] rounded-tl-lg rounded-bl-lg"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="flex items-center ">
            <Image src="/images/logo.svg" width="70" height="70" alt="logo" />
            <Text size="xl" weight="lg" color="white">
              Juncture
            </Text>
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            <Image
              src="/images/register.svg"
              width={339}
              height={190}
              alt="Register Icon"
              className="self-center"
            />
          </div>
        </div>
        <div
          className="rounded-tr-lg rounded-br-lg px-8 py-6 flex flex-col items-center"
          style={{ backgroundColor: theme.white }}
        >
          <AuthForm type="signUp" schemaName={signUpSchema} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
