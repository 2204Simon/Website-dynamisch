import React from "react";
import styled from "styled-components";
import { colors, mediaQueries } from "../../general/constants";
export const MainContainer = styled.div`
  max-width: 100%;
  padding: 5%;
  display: center;
  h1 {
    text-align: center;
    color: ${colors.black};
  }

  ul {
    list-style: none;
    padding: 0;
    @media (max-width: ${mediaQueries.small}) {
      display: center;
    }
    @media (min-width: ${mediaQueries.large}) {
      display: flex;
      justify-content: center;
    }

    li {
      display: flex;
      align-items: center;
      margin-bottom: svg {
        margin-right: 0.5rem;
      }

      a {
        color: ${colors.companycolor};
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid ${colors.primarycolor};
  }
`;

export const ContactContainer = styled.div`
  margin-top: 2rem;

  h2 {
    text-align: center;
    color: ${colors.black};
  }

  p {
    text-align: center;
    margin-bottom: 1rem;
    color: var(--black-color);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: ${colors.companycolor};
`;

export const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${colors.companycolor};
  border-radius: 10px;
  font-size: 1rem;
  width: 100%;
  color: var(--black-color);
  background-color: var(--primary-color);
`;

export const FormTextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${colors.companycolor};
  border-radius: 10px;
  font-size: 1rem;
  width: 100%;
  resize: vertical;
  color: var(--black-color);
  background-color: var(--primary-color);
`;

export const FormButton = styled.button`
  background-color: ${colors.companycolor};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
`;

export const ContactList = styled.ul`
  padding: 0;
  margin: 0;
`;

export const ContactListItem = styled.li`
  display: center;
  align-items: center;
  margin-bottom: 1rem;

  svg {
    margin-right: 0.5rem;
  }

  a {
    color: ${colors.companycolor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const MapContainer = styled.div`
  position: relative;
  height: 0;
  overflow: hidden;
  border-radius: 10px;
  padding-bottom: 35%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const media = {
  tablet: "@media(min-width: ${mediaQueries.medium})",
  laptop: "@media(min-width: ${mediaQueries.large})",
};
