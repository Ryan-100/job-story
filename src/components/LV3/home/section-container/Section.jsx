import { Text, Title } from "@/components/LV1";

const Section = ({ title, subTitle, children }) => {
  return (
    <section className="w-full flex flex-col items-center justify-center py-6 space-y-6">
      <div className="text-center">
        {title && (
          <Title as="h2" size="lg" weight="xl" mb="10">
            {title}
          </Title>
        )}

        {subTitle && <Text>{subTitle}</Text>}
      </div>

      {children}
    </section>
  );
};

export default Section;
