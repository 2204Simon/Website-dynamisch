import React from "react";
import styled from "styled-components";
import { colors, mediaQueries } from "../../general/constants";
import hintergrund_dunkel from '../../../img/Hintergrund_Croissant_verdunkelt.webp';


export const Produktteaser = styled.div`
  // padding-top: 20%;
  // padding-bottom: 20%;
  text-align: center;
  color: ${colors.black};
  height: calc(100vh - 130px);
  display: flex;
  justify-content: center; 
  align-items: center;


  h2 {
    // text-align: center;
    padding: 0;
    color: ${colors.white};  


  }

  p {
    text-align: center;
    margin-bottom: 1rem;
    color: ${colors.companycolor};
  }

`;

export const Cooperation = styled.div`
  // padding-bottom: 5%;
  background-color: ${colors.black};
  height: calc(100vh - 134.5px);
  display: flex;
  justify-content: center; 
  align-items: center;

  

  h1 {
    text-align: center;
    color: ${colors.white};
    color: config.textColor;
    margin-top: 0px;

  }

  p {
    text-align: center;
    padding-bottom: 0;
    padding-left: 0;
    color: ${colors.companycolor};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Image = styled.img`
  // width: 20%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.3s ease-in-out;
  border-radius: 150px;
  border: 2px;
  border-color: ${colors.black};
`;

export const ImageBox = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const media = {
  tablet: "@media(min-width: ${mediaQueries.medium})",
  laptop: "@media(min-width: ${mediaQueries.large})",
};

export const Dunkel = styled.div`
background-color: rgba(0, 0, 0, 0.8); /* Hier kannst du die Farbe und Transparenz anpassen */
`;

export const Bg = styled.div`
background-image: url(${hintergrund_dunkel});
background-attachment: fixed;
background-position: center;
background-repeat: no-repeat;
background-size: cover;

`;