import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewAdressData } from "../../redux/action";
import { AdressDataState, AdressData } from "../../redux/types";
import {
  Card,
  Container,
  LogoutButton,
  Paragraph,
  Title,
} from "./UserInformation.styles";
import { Pencil } from "phosphor-react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { FaPaypal, FaApplePay, FaEuroSign } from "react-icons/fa";
import { BlackColorButton } from "../general/button";
import { Link } from "react-router-dom";
import {
  PopupWrapper,
  SideBarWrapper,
} from "../bestellung/stylesBestellung/SideBarBuy.styles";
import SideBarBuy from "../bestellung/SideBarBuy";

export default function AdressInformation(): JSX.Element {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<AdressData | null>(null);
  const adressInformation = useSelector(
    (state: { adress: AdressDataState }) => state.adress.AdressData
  );

  const handleEdit = (data: AdressData) => {
    setEditedData(data);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditedData(null);
    setEditMode(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const preparedData: AdressData = {
      street: data.get("street") as string,
      city: data.get("city") as string,
      // housenumber: data.get("hausnummer") as unknown as number,
      housenumber: data.get("hausnummer") as string,
      payment: data.get("payment") as string,
    };
    console.log(preparedData);
    dispatch(addNewAdressData(preparedData));
    setEditedData(null);
    setEditMode(false);
    console.log("adress information", adressInformation);
  };

  return (
    <Container>
      <Card>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Grid>
              <Title>Adresse:</Title>
              <TextField
                fullWidth
                required
                id="street"
                label="Straße"
                name="street"
                defaultValue={editedData?.street}
                InputLabelProps={{
                  sx: {
                    backgroundColor: "white",
                  },
                }}
              />
              <TextField
                fullWidth
                required
                id="hausnummer"
                label="Hausnummer"
                name="hausnummer"
                defaultValue={editedData?.housenumber}
                InputLabelProps={{
                  sx: {
                    backgroundColor: "white",
                  },
                }}
              />
              <TextField
                fullWidth
                required
                id="city"
                label="Stadt"
                name="city"
                defaultValue={editedData?.city}
                InputLabelProps={{
                  sx: {
                    backgroundColor: "white",
                  },
                }}
              />

              <Title>Zahlungsmöglichkeiten:</Title>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Zahlung"
                  name="payment"
                  defaultValue={"bar"}
                >
                  <FormControlLabel
                    value="Barzahlung"
                    control={<Radio />}
                    label={
                      <div>
                        <FaEuroSign /> Bar
                      </div>
                    }
                  />
                  <FormControlLabel
                    value="SEPA Lastschriftmandat"
                    control={<Radio />}
                    label={
                      <div>
                        <AccountBalanceOutlinedIcon fontSize="small" /> SEPA
                        Lastschrift
                      </div>
                    }
                  />
                  <FormControlLabel
                    value="Paypal"
                    control={<Radio />}
                    label={
                      <div>
                        <FaPaypal size={20} />
                        <span></span>
                      </div>
                    }
                  />
                  <FormControlLabel
                    value="Apple Pay"
                    control={<Radio />}
                    label={
                      <div>
                        <FaApplePay size={40} />
                      </div>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Button type="submit">Speichern</Button>
            <Button onClick={handleCancel}>Abbrechen</Button>
          </form>
        ) : (
          <div>
            <Title>persönliche Daten:</Title>
            <Paragraph>
              <strong>Straße: </strong>
              {adressInformation?.street}
            </Paragraph>
            <Paragraph>
              <strong>Stadt: </strong>
              {adressInformation?.city}
            </Paragraph>
            <Paragraph>
              <strong>Hausnummer: </strong>
              {adressInformation?.housenumber}
            </Paragraph>
            <Paragraph>
              <strong>Zahlungsart: </strong>
              {adressInformation?.payment}
            </Paragraph>

            <LogoutButton
              className="black-color white-orange "
              onClick={() => handleEdit(adressInformation)}
            >
              <Pencil size={20} />
            </LogoutButton>
          </div>
        )}
      </Card>
    </Container>
  );
}
