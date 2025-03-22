import React from "react";
import Image from "next/image";

import { Text } from "@/components/LV1";
import { useTheme } from "styled-components";
import AuthForm from "@/components/LV2/Auth/AuthForm";

import * as yup from "yup";

const resetPassSchema = yup.object().shape({
  email: yup.string().required("Enter your email").email("Not a proper email!"),
});

const ForgotPsw = () => {
  const theme = useTheme();
  // absolute lg:flex lg:top-[20%] top-[10%] lg:left-[30%]
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      <div className="lg:flex lg:top-[20%] lg:left-[30%]">
        <div
          className="flex flex-col items-center px-10 pb-[8%] lg:rounded-tl-lg lg:rounded-bl-lg rounded-tl-lg rounded-tr-lg"
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
              src="/images/resetPass.svg"
              width={285}
              height={190}
              alt="restPass Icon"
            />
          </div>
        </div>
        <div
          className="rounded-tr-lg rounded-br-lg px-6 py-6"
          style={{ backgroundColor: theme.white }}
        >
          <AuthForm type="resetPass" schemaName={resetPassSchema} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPsw;
