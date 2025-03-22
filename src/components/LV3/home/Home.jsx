import { Button } from "@/components/LV2/Button";
import { useFetchJobFunctionQuery } from "@/store/modules/jobs/jobsModules";
import Image from "next/image";
import CategorySection from "./CategorySection";
import HeroSection from "./HeroSection";
import JobSection from "./JobSection";
import TrustedBySection from "./TrustedBySection";

const Home = () => {
  const { data: jobFunctionData } = useFetchJobFunctionQuery({
    populate: "jobs",
  });

  return (
    <>
      <HeroSection jobFunctionData={jobFunctionData?.data} />

      <CategorySection jobFunctionData={jobFunctionData?.data} />

      <div className="relative w-full h-16">
        <Image
          src="/images/divider-image.svg"
          alt="divider"
          fill
          className="object-cover"
        />
      </div>

      <JobSection />

      <div className="relative w-full h-20">
        <Image
          src="/images/divider-image.svg"
          alt="divider"
          fill
          className="object-cover"
        />
      </div>

      <TrustedBySection />
    </>
  );
};

export default Home;
