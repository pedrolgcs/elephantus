import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: var(--red);
  height: 56px;
  border-radius: 1rem;
  border: 0;
  padding: 0 1.6rem;
  width: 100%;
  color: var(--white);
  font-weight: 500;
  margin-top: 1.6rem;
  transition: background-color 0.5s;

  &:hover {
    background: ${shade(0.1, '#f25748')};
  }
`;
