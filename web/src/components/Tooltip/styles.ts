import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    text-align: center;
    background: var(--tooltipInfo);
    color: var(--tooltipText);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500px;
    opacity: 0;
    transition: opacity 0.5s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: var(--blue) transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
