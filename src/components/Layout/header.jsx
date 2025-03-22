import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../LV2/Avatar/Avatar";
import {getToken, logout} from "@/service";
import {Button} from "../LV2/Button";
import {Text} from "../LV1";
import {useRouter} from "next/router";

const NAVS = [
    ['Home', ''],
    ['Jobs', 'jobs'],
    ['Companies', 'companies'],
]

const Header = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [token, setToken] = useState(null);
    const [activeRoute, setActiveRoute] = useState("home");
    const router = useRouter();
    const pathname = router.pathname;

    useEffect(() => {
        if (window) {
            const token = getToken();
            setToken(token);
        }
        if (pathname.includes("/jobs")) {
            setActiveRoute("jobs");
        } else if (pathname.includes("/companies")) {
            setActiveRoute("companies");
        } else {
            setActiveRoute("");
        }
    }, [pathname]);

    return (
        <section className="fixed top-0 w-full bg-white z-[1000]">
            <div className="flex items-center justify-between h-auto px-[16px] lg:px-[156px]">
                <Link href="/">
                    <div className="w-[50px] lg:w-[80px] flex items-center">
                        <Image
                            src="/images/logo.svg"
                            width="70"
                            height="70"
                            alt="Juncture logo"
                        />
                        <h1 className="text-[#6705DB] text-3xl font-bold invisible lg:visible">
                            Juncture
                        </h1>
                    </div>
                </Link>
                <nav className="flex items-center gap-4 lg:gap-4">
                    {NAVS.map(([label, link]) => (
                        <Link
                            key={link}
                            href={"/" + link || '/'}
                            className={`border-b-2 hover:border-slate-600 py-3 px-4 hover:opacity-70 transition-all`}
                            style={{
                                borderColor: activeRoute === link ? "gray" : "transparent",
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="w-[100px] relative lg:w-auto flex items-center">
                    <div className={token ? "visible" : "invisible absolute"}>
                        <div onClick={() => setShowDropDown((p) => !p)}>
                            <Avatar
                                name="john doe"
                                url={
                                    "https://images.freeimages.com/images/large-previews/7cb/woman-05-1241044.jpg"
                                }
                                width="40"
                                height="40"
                            />
                        </div>
                    </div>
                    <div className={token ? "invisible absolute" : "visible"}>
                        <Button href="/login">Login</Button>
                    </div>
                </div>
                {showDropDown && (
                    <div
                        className="absolute flex flex-col right-[80px] top-[50px] space-y-2 bg-white rounded-lg p-2 border">
                        <Text
                            className="p-2 cursor-pointer lg:text-[14px] text-xs"
                            onClick={() => {
                                router.push("/profile");
                                setShowDropDown(false);
                            }}
                        >
                            My Profile
                        </Text>
                        <Text
                            className="p-2 cursor-pointer lg:text-[14px] text-xs"
                            onClick={() => {
                                logout();
                                // dispatch(authSliceActions.logout());
                                router.push("/login");
                                setShowDropDown(false);
                            }}
                        >
                            Log Out
                        </Text>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Header;
