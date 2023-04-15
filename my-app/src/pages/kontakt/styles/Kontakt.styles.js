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
function ContactMap(): JSX.Element {
  return (
    <MapContainer>
      <iframe
        title="Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2634.236118735561!2d10.152005076637723!3d48.68185011311377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47991673b8ad167b%3A0x128ebc1169c962b2!2sDHBW%20Heidenheim!5e0!3m2!1sde!2sde!4v1681532862141!5m2!1sde!2sde"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      />
    </MapContainer>
  );
}

export const media = {
  tablet: "@media(min-width: 768px)",
  laptop: "@media(min-width: 1024px)",
};
export { ContactMap };
