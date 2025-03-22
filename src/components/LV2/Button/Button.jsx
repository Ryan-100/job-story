import React, { Fragment } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { Image } from "@/components/LV1";

/**
 * @param size Button size `sm | md | lg`
 * @param type Button type 'button | submit | reset'
 * @param variant `contained | outlined | ghost`  => default contained
 * @param href Link
 * @param fullWidth
 * @param textcolor Custom text color
 * @param bgcolor Custom button color
 * @param bordercolor Custom border color
 * @param startIcon Left icon
 * @param endIcon Right icon
 * @param isLoading If `true` the loading indicator is shown.
 * @param isDisabled If `true` the component is disabled.
 * @param loadingPosition The loading indicator can be positioned on the `start`, `end`, or the `center` of the button.
 */

const getButton = (
  {
    isDisabled = false,
    isLoading = false,
    size = "md",
    startIcon,
    endIcon,
    children,
    ...others
  },
  ref
) => {
  return (
    <ButtonStyled
      {...others}
      disabled={isDisabled || isLoading}
      size={size}
      ref={ref}
    >
      {isLoading ? (
        <Image imageType="loading" width={20} height={20} />
      ) : (
        <>
          {startIcon && <span>{startIcon}</span>}
          {children}
          {endIcon && <span>{endIcon}</span>}
        </>
      )}
    </ButtonStyled>
  );
};

const Button = React.forwardRef((props, ref) => {
  return props.href ? (
    <Link href={props.href}>{getButton(props, ref)}</Link>
  ) : (
    getButton(props, ref)
  );
});

Button.displayName = "Button";

export default Button;

const ButtonStyled = styled.button`
  padding: ${(props) => props.size === "sm" && "3px 8px"};
  padding: ${(props) => props.size === "md" && "6px 12px"};
  padding: ${(props) => props.size === "lg" && "8px 16px"};

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-transform: capitalize;
  font-weight: 600;
  transition: all 0.2s;

  width: ${({ fullWidth }) => fullWidth && "100%"};

  font-size: ${(props) => props.theme.fontSize.sm}px;

  opacity: ${({ disabled }) => disabled && "0.75"};

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  color: ${(props) => (props.textcolor ? props.textcolor : props.theme.white)};

  background-color: ${(props) =>
    props.bgcolor ? props.bgcolor : props.theme.primary};

  border: 1px solid
    ${(props) => props.bordercolor || props.bgcolor || props.theme.primary};

  border-radius: ${(props) =>
    props.borderradius ? props.borderradius : "6"}px;

  /* if hover change button background color */
  &:hover {
    background-color: ${(props) =>
      props.bgcolor ? props.bgcolor : props.theme.violet850};
  }

  /* only add animation if not button is loading or disabled */
  &:active {
    transform: ${(props) => !props.disabled && "scale(1.02) translateY(-2px)"};
  }

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      background-color: ${({ theme }) => theme.white} !important;
      color: ${(props) => props.textcolor || props.theme.primary};
      border: 1px solid ${(props) => props.bordercolor || props.theme.primary};

      &:hover {
        /* color: ${(props) => props.textcolor || props.theme.primary}; */
        background-color: ${({ theme }) => theme.violet200} !important;
      }
    `}

  ${({ variant }) =>
    variant === "ghost" &&
    css`
      background-color: ${({ theme }) => theme.white};
      color: ${(props) => props.theme.primary};
      border: 1px solid ${(props) => props.theme.white};

      &:hover {
        /* color: ${(props) => props.textcolor || props.theme.primary}; */
        background-color: ${({ theme }) => theme.violet200} !important;
      }
    `}
`;
