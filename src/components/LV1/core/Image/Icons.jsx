import styled from "styled-components";
import { FaFilter } from "react-icons/fa";

export const Filter = (props) => {
  return (
    <IconWrap {...props}>
      <FaFilter />
    </IconWrap>
  );
};

export const Correct = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="15"
        height="11"
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33336 8.64325L12.9934 0.982422L14.1725 2.16076L5.33336 10.9999L0.0300293 5.69659L1.20836 4.51826L5.33336 8.64325Z"
          fill="#03053D"
        />
      </svg>
    </IconWrap>
  );
};

export const Circle = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="15" stroke="#E4E5E7" stroke-width="2" />
      </svg>
    </IconWrap>
  );
};

export const UndoneStep = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="15" stroke="#6705DB" stroke-width="2" />
        <circle cx="16" cy="16" r="5" fill="#6705DB" />
      </svg>
    </IconWrap>
  );
};

export const CompletedStep = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#6705DB" />
        <path
          d="M10.1667 16.8335L13.5001 20.1668L21.8334 11.8335"
          stroke="#F6F6F7"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </IconWrap>
  );
};

export const SuccessIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M33.9998 67.3332C15.5898 67.3332 0.666504 52.4098 0.666504 33.9998C0.666504 15.5898 15.5898 0.666504 33.9998 0.666504C52.4098 0.666504 67.3332 15.5898 67.3332 33.9998C67.3332 52.4098 52.4098 67.3332 33.9998 67.3332ZM33.9998 60.6665C41.0723 60.6665 47.8551 57.857 52.856 52.856C57.857 47.8551 60.6665 41.0723 60.6665 33.9998C60.6665 26.9274 57.857 20.1446 52.856 15.1437C47.8551 10.1427 41.0723 7.33317 33.9998 7.33317C26.9274 7.33317 20.1446 10.1427 15.1437 15.1437C10.1427 20.1446 7.33317 26.9274 7.33317 33.9998C7.33317 41.0723 10.1427 47.8551 15.1437 52.856C20.1446 57.857 26.9274 60.6665 33.9998 60.6665ZM30.6765 47.3332L16.5332 33.1898L21.2465 28.4765L30.6765 37.9065L49.5298 19.0498L54.2465 23.7632L30.6765 47.3332Z"
          fill="#11892D"
        />
      </svg>
    </IconWrap>
  );
};

export const EditIcon2 = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.16667 13.8333H3.345L11.1067 6.07167L9.92833 4.89334L2.16667 12.655V13.8333ZM15.5 15.5H0.5V11.9642L11.6958 0.768342C11.8521 0.612116 12.064 0.524353 12.285 0.524353C12.506 0.524353 12.7179 0.612116 12.8742 0.768342L15.2317 3.12584C15.3879 3.28211 15.4757 3.49404 15.4757 3.71501C15.4757 3.93598 15.3879 4.1479 15.2317 4.30418L5.7025 13.8333H15.5V15.5ZM11.1067 3.71501L12.285 4.89334L13.4633 3.71501L12.285 2.53667L11.1067 3.71501Z"
          fill="#6705DB"
        />
      </svg>
    </IconWrap>
  );
};

export const EditIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 17H3.9L12.525 8.375L11.125 6.975L2.5 15.6V17ZM16.8 6.925L12.55 2.725L13.95 1.325C14.3333 0.941667 14.8043 0.75 15.363 0.75C15.921 0.75 16.3917 0.941667 16.775 1.325L18.175 2.725C18.5583 3.10833 18.7583 3.571 18.775 4.113C18.7917 4.65433 18.6083 5.11667 18.225 5.5L16.8 6.925ZM15.35 8.4L4.75 19H0.5V14.75L11.1 4.15L15.35 8.4Z"
          fill="#6705DB"
        />
      </svg>
    </IconWrap>
  );
};

export const TrashBinIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.8335 17.5C5.37516 17.5 4.98294 17.3369 4.65683 17.0108C4.33016 16.6842 4.16683 16.2917 4.16683 15.8333V5H3.3335V3.33333H7.50016V2.5H12.5002V3.33333H16.6668V5H15.8335V15.8333C15.8335 16.2917 15.6704 16.6842 15.3443 17.0108C15.0177 17.3369 14.6252 17.5 14.1668 17.5H5.8335ZM14.1668 5H5.8335V15.8333H14.1668V5ZM7.50016 14.1667H9.16683V6.66667H7.50016V14.1667ZM10.8335 14.1667H12.5002V6.66667H10.8335V14.1667Z"
          fill="#1C1B1F"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const WithdrawIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.5 13.3334L11.6667 11.1667L13.8333 13.3334L15 12.1667L12.8333 10L15 7.83335L13.8333 6.66669L11.6667 8.83335L9.5 6.66669L8.33333 7.83335L10.5 10L8.33333 12.1667L9.5 13.3334ZM2.5 10L6.125 4.87502C6.27778 4.6528 6.47556 4.47919 6.71833 4.35419C6.96167 4.22919 7.22222 4.16669 7.5 4.16669H15.8333C16.2917 4.16669 16.6842 4.33002 17.0108 4.65669C17.3369 4.9828 17.5 5.37502 17.5 5.83335V14.1667C17.5 14.625 17.3369 15.0175 17.0108 15.3442C16.6842 15.6703 16.2917 15.8334 15.8333 15.8334H7.5C7.22222 15.8334 6.96167 15.7709 6.71833 15.6459C6.47556 15.5209 6.27778 15.3472 6.125 15.125L2.5 10ZM4.54167 10L7.5 14.1667H15.8333V5.83335H7.5L4.54167 10Z"
          fill="#1C1B1F"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const DotsVerticalIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="4"
        height="17"
        viewBox="0 0 4 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 16.5C1.45 16.5 0.979334 16.3043 0.588 15.913C0.196 15.521 0 15.05 0 14.5C0 13.95 0.196 13.479 0.588 13.087C0.979334 12.6957 1.45 12.5 2 12.5C2.55 12.5 3.021 12.6957 3.413 13.087C3.80433 13.479 4 13.95 4 14.5C4 15.05 3.80433 15.521 3.413 15.913C3.021 16.3043 2.55 16.5 2 16.5ZM2 10.5C1.45 10.5 0.979334 10.304 0.588 9.912C0.196 9.52067 0 9.05 0 8.5C0 7.95 0.196 7.479 0.588 7.087C0.979334 6.69567 1.45 6.5 2 6.5C2.55 6.5 3.021 6.69567 3.413 7.087C3.80433 7.479 4 7.95 4 8.5C4 9.05 3.80433 9.52067 3.413 9.912C3.021 10.304 2.55 10.5 2 10.5ZM2 4.5C1.45 4.5 0.979334 4.304 0.588 3.912C0.196 3.52067 0 3.05 0 2.5C0 1.95 0.196 1.47933 0.588 1.088C0.979334 0.696 1.45 0.5 2 0.5C2.55 0.5 3.021 0.696 3.413 1.088C3.80433 1.47933 4 1.95 4 2.5C4 3.05 3.80433 3.52067 3.413 3.912C3.021 4.304 2.55 4.5 2 4.5Z"
          fill="#1C1B1F"
        ></path>
      </svg>
    </IconWrap>
  );
};
export const AccountBalanceIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        fill="none"
        viewBox="0 0 25 24"
      >
        <path
          fill="#6705DB"
          d="M4.1 19.2v-8.4h2.4v8.4H4.1zm7.2 0v-8.4h2.4v8.4h-2.4zM.5 24v-2.4h24V24H.5zm18-4.8v-8.4h2.4v8.4h-2.4zM.5 8.4V6l12-6 12 6v2.4H.5zM5.84 6h13.32L12.5 2.7 5.84 6z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const AeroplaneIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        fill="none"
        viewBox="0 0 21 20"
      >
        <path
          fill="#6705DB"
          d="M6.667 20v-1.5l2-1.5v-5.5L.167 14v-2l8.5-5V1.5c0-.417.146-.77.438-1.062A1.444 1.444 0 0110.167 0c.416 0 .77.146 1.062.438.292.291.438.645.438 1.062V7l8.5 5v2l-8.5-2.5V17l2 1.5V20l-3.5-1-3.5 1z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const DesignServiceIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          fill="#6705DB"
          d="M16.683 7.4l-4.25-4.25 1.425-1.425a1.921 1.921 0 011.413-.575 1.92 1.92 0 011.412.575l1.425 1.425c.384.384.575.854.575 1.412a1.92 1.92 0 01-.575 1.413L16.683 7.4zM.833 19v-4.25l4.5-4.5L.058 4.925 4.783.2l5.3 5.325 2.35-2.375 4.25 4.25-2.35 2.35 5.275 5.325-4.7 4.7-5.325-5.3L5.083 19H.833zM6.758 8.825l1.9-1.9-1.2-1.2-1.2 1.175-1.4-1.4 1.175-1.2-1.275-1.25-1.875 1.9 3.875 3.875zm8.125 8.125l1.9-1.9-1.275-1.25-1.175 1.175-1.425-1.4 1.2-1.2-1.225-1.2-1.9 1.9 3.9 3.875zM2.833 17h1.4l9.625-9.6-1.425-1.425-9.6 9.625V17z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const AccountCircleIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        fill="none"
        viewBox="0 0 21 20"
      >
        <path
          fill="#6705DB"
          d="M4.35 15.1c.85-.65 1.8-1.163 2.85-1.538A9.744 9.744 0 0110.5 13c1.15 0 2.25.187 3.3.562 1.05.375 2 .888 2.85 1.538a7.737 7.737 0 001.363-2.325A7.845 7.845 0 0018.5 10c0-2.217-.779-4.104-2.337-5.663C14.604 2.779 12.717 2 10.5 2s-4.104.779-5.662 2.337C3.279 5.896 2.5 7.783 2.5 10c0 .983.163 1.908.488 2.775A7.72 7.72 0 004.35 15.1zM10.5 11c-.983 0-1.813-.337-2.488-1.012S7 8.483 7 7.5c0-.983.337-1.813 1.012-2.488S9.517 4 10.5 4c.983 0 1.813.337 2.488 1.012S14 6.517 14 7.5c0 .983-.337 1.813-1.012 2.488S11.483 11 10.5 11zm0 9a9.733 9.733 0 01-3.9-.788 10.092 10.092 0 01-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.732 9.732 0 01.5 10c0-1.383.263-2.683.788-3.9a10.092 10.092 0 012.137-3.175c.9-.9 1.958-1.613 3.175-2.138A9.743 9.743 0 0110.5 0c1.383 0 2.683.262 3.9.787a10.105 10.105 0 013.175 2.138c.9.9 1.612 1.958 2.137 3.175A9.733 9.733 0 0120.5 10a9.733 9.733 0 01-.788 3.9 10.092 10.092 0 01-2.137 3.175c-.9.9-1.958 1.612-3.175 2.137a9.733 9.733 0 01-3.9.788zm0-2c.883 0 1.717-.129 2.5-.387.783-.259 1.5-.63 2.15-1.113A7.542 7.542 0 0013 15.387 7.942 7.942 0 0010.5 15c-.883 0-1.717.129-2.5.387-.783.259-1.5.63-2.15 1.113.65.483 1.367.854 2.15 1.113a7.942 7.942 0 002.5.387zm0-9c.433 0 .792-.142 1.075-.425.283-.283.425-.642.425-1.075 0-.433-.142-.792-.425-1.075C11.292 6.142 10.933 6 10.5 6c-.433 0-.792.142-1.075.425C9.142 6.708 9 7.067 9 7.5c0 .433.142.792.425 1.075.283.283.642.425 1.075.425z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const EmergencyIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="18"
        fill="none"
        viewBox="0 0 19 18"
      >
        <path
          fill="#6705DB"
          d="M7.75 18v-5.95L2.6 15.025.85 12 6 9 .85 6.025 2.6 3l5.15 2.975V0h3.5v5.975L16.4 3l1.75 3.025L13 9l5.15 3-1.75 3.025-5.15-2.975V18h-3.5z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const BoltIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="18"
        fill="none"
        viewBox="0 0 11 18"
      >
        <path
          fill="#6705DB"
          d="M3.167 18l1-7h-3.5c-.25 0-.405-.067-.463-.2-.058-.133-.02-.317.113-.55L6.167 0h1l-1 7h3.5c.25 0 .404.067.462.2.058.133.021.317-.112.55L4.167 18h-1z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const CarShippingIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="16"
        fill="none"
        viewBox="0 0 23 16"
      >
        <path
          fill="#6705DB"
          d="M5.833 16a2.893 2.893 0 01-2.125-.875A2.893 2.893 0 012.833 13h-2V2c0-.55.196-1.02.588-1.412A1.923 1.923 0 012.833 0h14v4h3l3 4v5h-2c0 .833-.291 1.542-.875 2.125a2.893 2.893 0 01-2.125.875 2.893 2.893 0 01-2.125-.875A2.893 2.893 0 0114.833 13h-6c0 .833-.291 1.542-.875 2.125A2.893 2.893 0 015.833 16zm0-2a.968.968 0 00.713-.288.967.967 0 00.287-.712.967.967 0 00-.287-.712.968.968 0 00-.713-.288.968.968 0 00-.713.288.967.967 0 00-.287.712c0 .283.096.52.287.712.192.192.43.288.713.288zm-3-3h.8c.284-.3.609-.542.975-.725A2.701 2.701 0 015.833 10c.45 0 .859.092 1.225.275.367.183.692.425.975.725h6.8V2h-12v9zm15 3c.284 0 .521-.096.712-.288a.965.965 0 00.288-.712.965.965 0 00-.288-.712.965.965 0 00-.712-.288.965.965 0 00-.712.288.965.965 0 00-.288.712c0 .283.096.52.288.712a.965.965 0 00.712.288zm-1-5h4.25l-2.25-3h-2v3z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const MovieIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="16"
        fill="none"
        viewBox="0 0 21 16"
      >
        <path
          fill="#6705DB"
          d="M2.5 0l2 4h3l-2-4h2l2 4h3l-2-4h2l2 4h3l-2-4h3c.55 0 1.021.196 1.413.588.391.391.587.862.587 1.412v12c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0118.5 16h-16c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 01.5 14V2c0-.55.196-1.02.588-1.412A1.923 1.923 0 012.5 0zm0 6v8h16V6h-16z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const FacebookIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.129 20 14.99 20 10c0-5.523-4.477-10-10-10z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const LinkedInIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          fill="currentColor"
          d="M15.335 15.339H12.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25H7.013V6.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715h-.001zM4.003 5.575a1.546 1.546 0 01-1.287-2.409 1.548 1.548 0 111.286 2.409h.001zm1.336 9.764H2.666V6.75H5.34v8.589h-.001zM16.67 0H1.329C.593 0 0 .58 0 1.297v15.406C0 17.42.594 18 1.328 18h15.338C17.4 18 18 17.42 18 16.703V1.297C18 .58 17.4 0 16.666 0h.004z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const InstagramIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M10 0c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153A4.904 4.904 0 01.525 16.55C.277 15.913.11 15.187.06 14.122.013 13.056 0 12.717 0 10c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 013.45.525C4.088.277 4.812.11 5.878.06 6.944.013 7.283 0 10 0zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM10 7a3 3 0 110 6 3 3 0 010-6z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const TwitterIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="18"
        fill="none"
        viewBox="0 0 22 18"
      >
        <path
          fill="currentColor"
          d="M21.162 2.656a8.383 8.383 0 01-2.402.658A4.196 4.196 0 0020.6 1c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.73 1.86 3.48a4.168 4.168 0 01-1.894-.522v.052a4.185 4.185 0 003.355 4.1 4.208 4.208 0 01-1.89.073A4.185 4.185 0 006.97 13.65a8.393 8.393 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.495 8.495 0 002.087-2.165l-.001-.001z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const GreaterThanIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="12"
        fill="none"
        viewBox="0 0 8 12"
      >
        <path
          stoke="currentColor"
          d="M4.977 6L.852 1.875 2.03.697 7.333 6 2.03 11.303.852 10.125 4.977 6z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const CloseIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.49999 5.58599L11.45 0.635986L12.864 2.04999L7.91399 6.99999L12.864 11.95L11.45 13.364L6.49999 8.41399L1.54999 13.364L0.135986 11.95L5.08599 6.99999L0.135986 2.04999L1.54999 0.635986L6.49999 5.58599Z"
          fill="#03053D"
        />
      </svg>
    </IconWrap>
  );
};

export const DocumentIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="17"
        height="20"
        viewBox="0 0 17 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 16H12.5V14H4.5V16ZM4.5 12H12.5V10H4.5V12ZM2.5 20C1.95 20 1.47933 19.8043 1.088 19.413C0.696 19.021 0.5 18.55 0.5 18V2C0.5 1.45 0.696 0.979 1.088 0.587C1.47933 0.195667 1.95 0 2.5 0H10.5L16.5 6V18C16.5 18.55 16.3043 19.021 15.913 19.413C15.521 19.8043 15.05 20 14.5 20H2.5ZM9.5 7V2H2.5V18H14.5V7H9.5Z"
          fill="#8C9196"
        />
      </svg>
    </IconWrap>
  );
};

export const ClockIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
      >
        <g clipPath="url(#clip0_284_7214)">
          <path d="M12.5 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16.001A8 8 0 0012.5 20zm1-8h4v2h-6V7h2v5z"></path>
        </g>
        <defs>
          <clipPath id="clip0_284_7214">
            <path
              fill="#fff"
              d="M0 0H24V24H0z"
              transform="translate(.5)"
            ></path>
          </clipPath>
        </defs>
      </svg>
    </IconWrap>
  );
};

export const CalendarIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
      >
        <g clipPath="url(#clip0_284_7219)">
          <path d="M17.5 3h4a1 1 0 011 1v16a1 1 0 01-1 1h-18a1 1 0 01-1-1V4a1 1 0 011-1h4V1h2v2h6V1h2v2zm-2 2h-6v2h-2V5h-3v4h16V5h-3v2h-2V5zm5 6h-16v8h16v-8z"></path>
        </g>
        <defs>
          <clipPath id="clip0_284_7219">
            <path
              fill="#fff"
              d="M0 0H24V24H0z"
              transform="translate(.5)"
            ></path>
          </clipPath>
        </defs>
      </svg>
    </IconWrap>
  );
};

export const ProfileIcon = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="51"
        height="57"
        viewBox="0 0 51 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25.5 24.3094C32.1274 24.3094 37.5 18.9368 37.5 12.3094C37.5 5.68197 32.1274 0.309387 25.5 0.309387C18.8726 0.309387 13.5 5.68197 13.5 12.3094C13.5 18.9368 18.8726 24.3094 25.5 24.3094ZM25.5 56.3094C35.5831 56.3094 44.5924 51.6209 50.4623 44.3097C44.5924 36.9981 35.5829 32.3094 25.4995 32.3094C15.4164 32.3094 6.40705 36.9979 0.537231 44.3091C6.40704 51.6207 15.4166 56.3094 25.5 56.3094Z"
          fill="#6705DB"
        />
      </svg>
    </IconWrap>
  );
};

export const Bookmark = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="21"
        fill="none"
        viewBox="0 0 16 21"
      >
        <path
          fill="currentColor"
          d="M1 0h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L8 16.03.766 20.566A.5.5 0 010 20.143V1a1 1 0 011-1zm13 2H2v15.432l6-3.761 6 3.761V2z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const BriefCase = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
      >
        <path d="M6.333 4.167v-2.5a.833.833 0 01.834-.834h6.666a.833.833 0 01.834.834v2.5H18a.833.833 0 01.833.833v11.667A.833.833 0 0118 17.5H3a.833.833 0 01-.833-.833V5A.833.833 0 013 4.167h3.333zm-2.5 9.166v2.5h13.334v-2.5H3.833zm0-1.666h13.334V5.833H3.833v5.834zM8 2.5v1.667h5V2.5H8zm1.667 6.667h1.666v1.666H9.667V9.167z"></path>
      </svg>
    </IconWrap>
  );
};

export const MapPointer = (props) => {
  return (
    <IconWrap {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20">
        <path d="M10.167 17.417l4.125-4.125a5.833 5.833 0 10-8.25 0l4.125 4.125zm0 2.356L4.863 14.47a7.5 7.5 0 1110.607 0l-5.303 5.303zm0-8.94a1.667 1.667 0 100-3.333 1.667 1.667 0 000 3.333zm0 1.667a3.333 3.333 0 110-6.667 3.333 3.333 0 010 6.667z"></path>
      </svg>
    </IconWrap>
  );
};

export const List = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
      >
        <path d="M7.5 3.333h10.834V5H7.5V3.333zm-4.167-.416h2.5v2.5h-2.5v-2.5zm0 5.833h2.5v2.5h-2.5v-2.5zm0 5.833h2.5v2.5h-2.5v-2.5zM7.5 9.167h10.834v1.666H7.5V9.167zM7.5 15h10.834v1.667H7.5V15z"></path>
      </svg>
    </IconWrap>
  );
};

export const AdjustHorizontal = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
      </svg>
    </IconWrap>
  );
};

export const DownArrow = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="8"
        viewBox="0 0 13 8"
      >
        <path d="M6.5 5.172l4.95-4.95 1.414 1.414L6.5 8 .136 1.636 1.55.222l4.95 4.95z"></path>
      </svg>
    </IconWrap>
  );
};

export const Folder = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="16"
        fill="none"
        viewBox="0 0 18 16"
      >
        <path
          fill="currentColor"
          d="M.667 5.5H16.5a.833.833 0 01.833.833v8.334a.833.833 0 01-.833.833h-15a.833.833 0 01-.833-.833V5.5zM1.5.5H14v3.333H.667v-2.5A.833.833 0 011.5.5zm10 9.167v1.666H14V9.667h-2.5z"
        ></path>
      </svg>
    </IconWrap>
  );
};
export const Location = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="19"
        fill="none"
        viewBox="0 0 16 19"
      >
        <path
          fill="currentColor"
          d="M13.303 13.47L8 18.773 2.697 13.47a7.5 7.5 0 1110.606 0zM8 11.5a3.333 3.333 0 100-6.667A3.333 3.333 0 008 11.5zm0-1.667A1.667 1.667 0 118 6.5a1.667 1.667 0 010 3.333z"
        ></path>
      </svg>
    </IconWrap>
  );
};

export const Loading = (props) => {
  return (
    <IconWrap {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block animate-spin"
      >
        <path
          opacity="0.2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill="currentColor"
        />
        <path
          d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
          fill="currentColor"
        />
      </svg>
    </IconWrap>
  );
};

const IconWrap = styled.div`
  width: ${(props) => (props.width ? props.width : "35")}px;
  height: ${(props) => (props.height ? props.height : "35")}px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
    padding: 0;
    fill: ${(props) =>
      props.fillColor ? props.fillColor : props.theme.neutral300};
    color: ${(props) => (props.color ? props.color : props.theme.neutral300)};
  }
`;
