import React from "react";
import { Image, Text } from "@/components/LV1";
import { Button } from "@/components/LV2/Button";
import Modal from "./Modal";

/**
 * @param title text title
 * @param description text description
 */

const ConfirmModal = ({ title, description, open, onClose, onConfirm }) => {
  return (
    open && (
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col justify-center items-center top-10 bg-white rounded-xl py-3 w-auto">
          <div className="flex items-center justify-between w-full px-3">
            <Text className="required" size="lg">
              {title}
            </Text>
            <Image
              imageType="close"
              width="14"
              className="cursor-pointer"
              onClick={() => {
                onClose(false);
              }}
            />
          </div>
          <div className="py-6 my-3  border-b-slate-200 border-t-slate-200 border border-l-transparent border-r-transparent max-w-[500px] min-w-[300px]">
            <Text className="px-3">{description}</Text>
          </div>
          <div className="flex self-end space-x-2 px-3">
            <Button
              size="md"
              type="button"
              variant="outlined"
              onClick={() => {
                onClose(false);
              }}
            >
              Cancel
            </Button>
            <Button size="md" type="button" onClick={() => onConfirm()}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default ConfirmModal;
