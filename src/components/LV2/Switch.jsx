import React from "react";
import { useTheme } from "styled-components";

/**
 * @param open 'Boolean to open and close switch'
 * @param setOpen 'function to set open and close state'
 **/

const Switch = ({ open, setOpen }) => {
  const theme = useTheme();
  return (
    <div
      className="rounded-full w-12 h-6 flex items-center px-1 cursor-pointer"
      style={{ backgroundColor: open ? theme.primary : theme.neutral400 }}
      onClick={() => setOpen((p) => !p)}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white  ${
          open ? "translate-x-6" : ""
        } transition-all`}
      />
    </div>
  );
};

export default Switch;
