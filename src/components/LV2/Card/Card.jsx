import React from "react";
import styled from "styled-components";

/**
 * @param width Card width
 * @param bgcolor Card background color
 * @param className Card background color
 * @param noBorder remove border color
 */

const Card = React.forwardRef((props, ref) => {
  return (
    <StyledCard ref={ref} className={props.className} {...props}>
      {props.children}
    </StyledCard>
  );
});

Card.displayName = "Card";

export default Card;

const StyledCard = styled.div`
  width: ${({ width, fullWidth }) =>
    fullWidth ? "100%" : width ? width + "px" : "250px"};

  display: inline-block;
  padding: 14px 24px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, noBorder }) => (noBorder ? theme.white : theme.neutral300)};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);

  background-color: ${({ bgcolor, theme }) =>
    bgcolor ? bgcolor : theme.white};
`;
