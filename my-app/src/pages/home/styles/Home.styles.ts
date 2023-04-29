import React from "react";
import styled from "styled-components";
import { colors, mediaQueries } from "../../general/constants";

export const Produktteaser = styled.div`
  padding-top: 20%;
  padding-bottom: 40%;
  text-align: center;


  h2 {
    text-align: center;
    padding: 0;
    // color: ${colors.black};
  }

  p {
    text-align: center;
    margin-bottom: 1rem;
    color: ${colors.companycolor};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Cooperation = styled.div`
  padding-bottom: 5%;
  

  h1 {
    text-align: center;
    color: ${colors.black};
  }

  p {
    text-align: center;
    margin-bottom: 1rem;
    // color: ${colors.companycolor};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Image = styled.img`
  width: 20%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.3s ease-in-out;
  border-radius: 10px;
  border: 2px;
  border-color: ${colors.black};
`;

export const ImageBox = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const media = {
  tablet: "@media(min-width: ${mediaQueries.medium})",
  laptop: "@media(min-width: ${mediaQueries.large})",
};
