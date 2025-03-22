import Head from "next/head";
import { Inter } from "@next/font/google";
import Button from "@/components/LV2/Button/Button";
import Home from "@/components/LV3/home/Home";
import { getToken } from "@/service";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Juncture Job Portal</title>
        <meta name="description" content="job portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen pb-10 space-y-14">
        <Home />
      </main>
    </>
  );
}

HomePage.protected = true;
