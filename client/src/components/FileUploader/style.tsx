import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 300px;
  margin: auto;
  margin-top: 3rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 30px;
  color: black;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Button = styled.button`
  width: fit-content;
  padding: 10px;
  border-radius: 8px;
  color: white;
  background: black;
`;
