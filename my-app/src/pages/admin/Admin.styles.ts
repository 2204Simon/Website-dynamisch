import styled from "styled-components";
import { colors } from "../general/constants";

export const AdminPageWrapper = styled.div`
  padding: 20, 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.primarycolor};
  width: 100vw;
`;

export const CRUDCardWrappper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${colors.primarycolor};
  flex-grow: 1;
  width: 200px;
  height: 250px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;
