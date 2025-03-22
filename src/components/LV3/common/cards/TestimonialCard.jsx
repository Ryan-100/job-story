import Image from "next/image";
import React from "react";

import { Text } from "@/components/LV1";
import { Card } from "@/components/LV2/Card";

/**
 * @param logoImg
 * @param name
 * @param job
 */

const TestimonialCard = (props) => {
  return (
    <Card as="article" className="space-y-4" width={300}>
      <div className="flex items-center gap-8">
        <div className="rounded-full">
          <Image src={props.logoImg} width={40} height={40} alt="alt img" />
        </div>

        <div className="">
          <Text weight="lg">{props.name}</Text>
          <Text color="neutral500">{props.job}</Text>
        </div>
      </div>

      <Text color="neutral600" className="text-center">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur ut
        ullam delectus ipsam assumenda, aliquid veniam totam voluptas! Velit,
        eum! dolor sit amet consectetur adipisicing elit. Quaerat, dolorum!
      </Text>
    </Card>
  );
};

export default TestimonialCard;
