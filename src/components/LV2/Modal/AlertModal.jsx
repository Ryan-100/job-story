import React from "react";
import { Image, Text } from "@/components/LV1";
import { Button } from "@/components/LV2/Button";
import Modal from "./Modal";

/**
 * @param title text title
 * @param description text description
 * @param icon alert image icon
 * @param buttonText to render button text
 */

const AlertModal = ({
  title,
  description,
  icon,
  buttonText = "Back",
  open,
  onClose,
}) => {
  return (
    open && (
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col justify-center items-center top-10 bg-white rounded-xl p-3 space-y-4">
          <Image imageType={icon} width="50" height="50" />
          {title && <Text weight="lg">{title}</Text>}
          {description && <Text>{description}</Text>}
          <Button onClick={() => onClose(false)}>{buttonText}</Button>
        </div>
      </Modal>
    )
  );
};

export default AlertModal;
