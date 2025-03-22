import { Text } from "@/components/LV1";
import styled from "styled-components";

const Tag = ({ children, ...others }) => {
  return <StyleTag {...others}>{children}</StyleTag>;
};

export default Tag;

const StyleTag = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  padding: 3px 6px;
  border-radius: 15px;
  color: ${({ theme }) => theme.neutral600};
  background-color: ${(props) =>
    props.bgcolor ? props.bgcolor : props.theme.neutral400};
`;
