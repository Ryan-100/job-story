import styled, { css } from "styled-components";
import {
  TrashBinIcon,
  WithdrawIcon,
  DotsVerticalIcon,
  Bookmark,
  Filter,
  Folder,
  Loading,
  CompletedStep,
  UndoneStep,
  Circle,
  Location,
  DownArrow,
  GreaterThanIcon,
  MovieIcon,
  CarShippingIcon,
  BoltIcon,
  EmergencyIcon,
  AccountCircleIcon,
  DesignServiceIcon,
  AeroplaneIcon,
  AccountBalanceIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedInIcon,
  FacebookIcon,
  AdjustHorizontal,
  BriefCase,
  MapPointer,
  List,
  ProfileIcon,
  DocumentIcon,
  CloseIcon,
  EditIcon,
  EditIcon2,
  SuccessIcon,
  ClockIcon,
  Correct,
  CalendarIcon,
} from "./Icons";

const ImageWrap = (props) => {
  const obj = props?.sx;
  const entries = obj && Object.entries(obj);

  return (
    <Wrap {...props} entries={entries}>
      <div>
        {!props.bgimg ? (
          <img src={props.src} alt={props.name || props.src} />
        ) : (
          <BGImg src={props.src} width={props.width} height={props.height} />
        )}
      </div>
    </Wrap>
  );
};

const ImageComponent = (props) => {
  switch (props.imageType) {
    case "image":
      return <ImageWrap {...props} />;

    case "withdraw":
      return <WithdrawIcon {...props} />;

    case "trashBin":
      return <TrashBinIcon {...props} />;

    case "dotsVertical":
      return <DotsVerticalIcon {...props} />;

    case "filter":
      return <Filter {...props} />;

    case "correct":
      return <Correct {...props} />;

    case "undone":
      return <UndoneStep {...props} />;

    case "circle":
      return <Circle {...props} />;

    case "completed":
      return <CompletedStep {...props} />;

    case "success":
      return <SuccessIcon {...props} />;

    case "edit":
      return <EditIcon {...props} />;

    case "edit2":
      return <EditIcon2 {...props} />;

    case "briefcase":
      return <BriefCase {...props} />;

    case "mapPointer":
      return <MapPointer {...props} />;

    case "adjustHorizontal":
      return <AdjustHorizontal {...props} />;

    case "close":
      return <CloseIcon {...props} />;

    case "document":
      return <DocumentIcon {...props} />;

    case "profileIcon":
      return <ProfileIcon {...props} />;

    case "loading":
      return <Loading {...props} />;

    case "folder":
      return <Folder {...props} />;

    case "location":
      return <Location {...props} />;

    case "bookmark":
      return <Bookmark {...props} />;

    case "downArrow":
      return <DownArrow {...props} />;

    case "greaterThan":
      return <GreaterThanIcon {...props} />;

    case "movie":
      return <MovieIcon {...props} />;

    case "bolt":
      return <BoltIcon {...props} />;

    case "bolt":
      return <BoltIcon {...props} />;

    case "facebook":
      return <FacebookIcon {...props} />;

    case "linkedIn":
      return <LinkedInIcon {...props} />;

    case "twitter":
      return <TwitterIcon {...props} />;

    case "instagram":
      return <InstagramIcon {...props} />;

    case "carShipping":
      return <CarShippingIcon {...props} />;

    case "emergency":
      return <EmergencyIcon {...props} />;

    case "accountCircle":
      return <AccountCircleIcon {...props} />;

    case "designService":
      return <DesignServiceIcon {...props} />;

    case "aeroplane":
      return <AeroplaneIcon {...props} />;

    case "accountBalance":
      return <AccountBalanceIcon {...props} />;

    case "list":
      return <List {...props} />;

    case "clock":
      return <ClockIcon {...props} />;

    case "calendar":
      return <CalendarIcon {...props} />;

    default:
      return null;
  }
};

export default ImageComponent;

const Wrap = styled.div`
  width: ${(props) => (props.width ? props.width : "50")}px;
  height: ${(props) => (props.height ? props.height : "50")}px;
  ${(props) =>
    props?.entries &&
    props.entries.map(
      ([key, val]) => css`
        ${key}: ${val};
      `
    )}
  img,
  svg {
    width: ${(props) => (props.width ? props.width : "36")}px;
    height: ${(props) => (props.width ? props.height : "36")}px;
    color: ${(props) => (props.color ? props.color : "black")};
    ${({ fullWidth }) =>
      fullWidth &&
      css`
        width: 100%;
        height: 100%;
      `}
  }
`;

const BGImg = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: url(${(props) => props.src}) no-repeat center / cover;
`;
