import styled from "styled-components";

// Styles for the main content container
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 2rem;
`;

// Styles for the contact form container
export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

// Styles for the form input fields
export const FormInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
  }
`;

// Styles for the form text area
export const FormTextArea = styled.textarea`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
  }
`;

// Styles for the form submit button
export const FormButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fff;
    color: #333;
  }
`;

// Styles for the form input labels
export const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
