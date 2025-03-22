import JobFilterSection from "@/components/LV3/Jobs/JobFilterSection";
import Head from "next/head";
import React, {useEffect} from "react";
import {getToken} from "@/service/Auth";
import {useRouter} from "next/router";

const JobsPage = () => {
    const router = useRouter();
    useEffect(() => {
        if (window) {
            const token = getToken();
            if (!token) {
                router.push('/login')
            }
        }
    }, [])

    return (
        <>
            <Head>
                <title>Juncture Job Portal</title>
                <meta name="description" content="job portal"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="w-full min-h-screen py-10 space-y-14 px-[16px] lg:px-[156px]">
                <JobFilterSection/>
            </main>
        </>
    );
};

const ProtectedJobsPage = () => <JobsPage/>

export default ProtectedJobsPage;
