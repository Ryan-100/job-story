import Modal from "@/components/LV2/Modal/Modal";
import React from "react";

import { Tab } from "@headlessui/react";
import { Image, ListShow, Text } from "@/components/LV1";
import { Button } from "@/components/LV2/Button";
import { useTheme } from "styled-components";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PreviewModal = ({ isModalVisible, setIsModalVisible, jobData }) => {
  const theme = useTheme();
  const categories = {
    "Job Description": [
      {
        content: (
          <div className="space-y-4">
            <div>
              <Text weight="lg" size="lg" className="pb-2 pt-3">
                Description
              </Text>
              <ListShow>
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobData?.data?.jobDescription,
                  }}
                />
              </ListShow>
            </div>

            <div>
              <Text weight="lg" size="lg" className="pb-2 pt-3">
                Requirements
              </Text>
              <ListShow>
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobData?.data?.jobRequirements,
                  }}
                />
              </ListShow>
            </div>

            {jobData?.data?.benefits ? (
              <div>
                <Text weight="lg" size="lg" className="pb-2 pt-3">
                  Benefits
                </Text>
                <div
                  dangerouslySetInnerHTML={{ __html: jobData?.data?.benefits }}
                />
              </div>
            ) : (
              void 0
            )}

            {jobData?.data?.otherDescriptions.map((desc) => (
              <div>
                <Text weight="lg" size="lg" className="pb-2 pt-3">
                  {desc.name}
                </Text>
                <div dangerouslySetInnerHTML={{ __html: desc.description }} />
              </div>
            ))}
          </div>
        ),
      },
    ],
    "About Company": [
      {
        content: (
          <div>
            <div>
              <Text weight="lg" size="lg" className="pb-2 pt-3">
                Company Name
              </Text>
              <Text>{jobData?.data?.company?.name || "-"}</Text>
            </div>

            <div>
              <Text weight="lg" size="lg" className="pb-2 pt-3">
                About the company
              </Text>
              <Text>{jobData?.data?.company?.description || "-"}</Text>
            </div>

            <div>
              <Text weight="lg" size="lg" className="pb-2 pt-3">
                Social Links
              </Text>
              <Text>
                {jobData?.data?.company?.socialLinks?.length > 0
                  ? jobData?.data?.company?.socialLinks.map((link) => (
                      <p>{link.link}</p>
                    ))
                  : "-"}
              </Text>
            </div>

            <div>
              <Text weight="lg" size="lg" className="pb-2 pt-3">
                Website Links
              </Text>
              <Text>
                {jobData?.data?.company?.websiteLinks?.length > 0
                  ? jobData?.data?.company?.websiteLinks.map((link) => (
                      <p>{link}</p>
                    ))
                  : "-"}
              </Text>
            </div>
          </div>
        ),
      },
    ],
  };

  return (
    <Modal open={isModalVisible} onClose={setIsModalVisible}>
      <div className="p-4 space-y-4 w-[800px] h-[600px] bg-white overflow-y-scroll">
        <div className="flex justify-between items-center px-2">
          <Text size="xl" weight="lg">
            Job Details
          </Text>
          <Button
            variant="outlined"
            bordercolor={theme.neutral400}
            textcolor={theme.neutral600}
          >
            <Image
              width="20"
              imageType="close"
              className="cursor-pointer"
              onClick={() => setIsModalVisible(false)}
            />
          </Button>
        </div>
        <hr />

        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl  p-1">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm font-medium leading-5 text-black",
                      "focus:outline-none",
                      selected
                        ? "border-b-2 border-black"
                        : "border-b-2 border-transparent hover:border-slate-400"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames("rounded-xl bg-white p-3")}
                >
                  <ul>
                    {posts.map((post) => (
                      <li
                        key={post.content.toString()}
                        className="relative rounded-md p-3 "
                      >
                        <div>{post.content}</div>
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
