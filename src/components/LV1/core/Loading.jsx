import styled from 'styled-components';

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    border-radius: 50%;
    animation: spinner 1s linear infinite;
    width: ${props => (props.width ? props.width : '20')}px;
    height: ${props => (props.height ? props.height : '20')}px;
    border: 3px solid ${props => props.spinnerColor};
    border-right-color: ${props => props.spinnerRightColor};
  }
  span {
    margin-left: 5px;
    color: ${props => props.theme.white};
  }

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

/**
 * @param width? Spinner width
 * @param height? Spinner height
 * @param spinnerColor Spinner color
 * @param spinnerRightColor Spinner right color
 */

export const Spinner = props => {
  return (
    <Loading {...props}>
      <div style={props.style} />
      {props.children && <span>{props.children}</span>}
    </Loading>
  );
};
