import styled from "styled-components";

export const Timeline_image = styled.img`
  width: 100%;
  height: auto;
  transition: transform 0.3s ease-in-out;
`;

export const Timeline_year = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
  color: black;
`;

export const Timeline_header_sentence = styled.h3`
`;

export const Timeline_further_information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;









export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  max-width: 250px;
  margin: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 1rem;
`;









export const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
