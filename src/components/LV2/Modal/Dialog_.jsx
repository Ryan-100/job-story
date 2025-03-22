import React from "react";

const Dialog = ({ title, description, onClose }) => {
  return (
    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all opacity-100 scale-100">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        {title}
      </h3>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
      <div className="mt-4">
        <button
          onClick={onClose}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Dialog;
