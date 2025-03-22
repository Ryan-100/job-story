import React from "react";
import jobdetailsImage from "./jobdetails.jpeg";

const JobDetailsHero = () => {
  return (
    <div className="w-screen h-[200px] sm:h-[200px] md:h-[250px] lg:h-[400px]">
      <img src={jobdetailsImage.src} class="object-cover w-full h-full" />
    </div>
  );
};

export default JobDetailsHero;
