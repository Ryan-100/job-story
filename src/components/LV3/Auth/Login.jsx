import React, { useEffect } from "react";
import Image from "next/image";

import { Text } from "@/components/LV1";
import { useTheme } from "styled-components";
import AuthForm from "@/components/LV2/Auth/AuthForm";

import * as yup from "yup";
import { useRouter } from "next/router";

const loginSchema = yup.object().shape({
  email: yup.string().required("Enter your email"),
  password: yup
    .string()
    .required("Enter your password")
    .min(6, "Password must be at least 6 characters long!"),
});
// const { data: session } = useSession();

// const router = useRouter();
// const { redirect } = router.query;

// //*=============== When user is login and if there is a redirect do it alse go index ==================
// useEffect(() => {
//   if (session?.user) {
//     router.push(redirect || "/");
//   }
// }, [router, session, redirect]);

const Login = () => {
  const theme = useTheme();
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      <div className="lg:flex lg:top-[20%] lg:left-[30%]">
        <div
          className="flex flex-col items-center px-10 pb-[10%] rounded-tl-lg rounded-bl-lg"
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
              src="/images/login.svg"
              width={238}
              height={190}
              alt="Login Icon"
            />
          </div>
        </div>
        <div
          className="rounded-tr-lg rounded-br-lg px-8 py-6  flex flex-col items-center"
          style={{ backgroundColor: theme.white }}
        >
          <AuthForm type="login" schemaName={loginSchema} />
        </div>
      </div>
    </div>
  );
};

export default Login;
