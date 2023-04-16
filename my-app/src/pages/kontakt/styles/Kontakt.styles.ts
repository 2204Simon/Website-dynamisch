import React from "react";
import styled from "styled-components";

export const MainContainer = styled.div`
  margin: 2rem auto;
  max-width: 600px;
  padding: 0 1rem;

  h1 {
    text-align: center;
    color: #000;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      margin-bottom: svg {
        margin-right: 0.5rem;
      }

      a {
        color: #aa7d03;
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
    border-top: 1px solid #ccc;
  }
`;

export const ContactContainer = styled.div`
  margin-top: 2rem;

  h2 {
    text-align: center;
    color: #000;
  }

  p {
    text-align: center;
    margin-bottom: 1rem;
    color: #aa7d03;
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
  color: #aa7d03;
`;

export const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

export const FormTextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  resize: vertical;
`;

export const FormButton = styled.button`
  background-color: #aa7d03;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
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
    color: #aa7d03;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const MapContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 15px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const media = {
  tablet: "@media(min-width: 768px)",
  laptop: "@media(min-width: 1024px)",
};
