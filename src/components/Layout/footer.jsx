import React from "react";
import Link from "next/link";
import {FaFacebook, FaLinkedin} from "react-icons/fa";

const SOCAL_ICONS = [
    {
        icon: <FaFacebook color="black" size={20}/>,
        link: 'https://www.facebook.com/juncturerecruitment'
    },
    {
        icon: <FaLinkedin color="black" size={20}/>,
        link: 'https://www.linkedin.com/company/junctureai/'
    },
];

const Footer = () => {
    return (
        <footer>
            <div
                className="grid grid-cols-1 lg:grid-cols-2 bg-black min-h-[260px] items-center w-full p-[16px] lg:px-[156px]">
                <div className="text-white w-fit">
                    <Link href="/">
                        <p className="text-2xl font-bold">Juncture</p>
                    </Link>
                    <p className="w-[265px] mt-1">
                        Unlock the full potential of your workforce with Juncture
                    </p>
                    <Link href="/">
                        <p className="font-bold mt-4 uppercase">Stay Connected</p>
                    </Link>

                    <ul className="flex gap-3 mt-3">
                        {SOCAL_ICONS.map(({icon, link}, index) => (
                            <li
                                className="rounded-full bg-white w-[32px] h-[32px] relative"
                                key={index}
                            >
                                <a href={link}>
                                    <div
                                        className="top-[50%] left-[50%] -translate-x-[50%]  -translate-y-[50%]  absolute z-10">
                                        {icon}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-10 lg:mt-0 grid grid-cols-2 lg:grid-cols-3 text-white">
                    <div className="font-bold space-y-3  w-fit">
                        <p>
                            <Link href="/">Home</Link>
                        </p>

                        <p>
                            <Link href="/">Companies</Link>
                        </p>

                        <p>
                            <Link href="/jobs">Jobs</Link>
                        </p>
                    </div>

                    <div className="space-y-3  w-fit">
                        <p className="font-bold">Info</p>
                        <div className="text-[14px] space-y-3">
                            <p>
                                <Link href="/">About Us</Link>
                            </p>
                            <p>
                                <Link href="/jobs">Contact Us</Link>
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3  w-fit mt-10 lg:mt-0">
                        <p className="font-bold">Support</p>
                        <div className="text-[14px] space-y-3">
                            <p>
                                <Link href="/">FAQs</Link>
                            </p>
                            <p>
                                <Link href="/">Privacy Policy</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
