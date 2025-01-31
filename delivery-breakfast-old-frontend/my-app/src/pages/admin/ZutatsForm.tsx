import React, { useState, useEffect } from "react";
import { FormInput, FormWrapper } from "./Admin.styles";
import { Button } from "../general/button.styles";
import { CustomToast } from "../general/toast.style";
import { sendPostRequest } from "../../serverFunctions/generelAPICalls";
import { Stage } from "../konfigurator/styles/Konfigurator.styles";

export type ZutatApiType = {
  zutatsId: string;
  zutatsname: string;
  zutatseigenschaft: string;
  zutatspreis: number;
  zutatseinheit: string;
  zutatBild: string;
  zutatensparte: string;
};

const ZutatCreation: React.FC<any> = ({}) => {
  const [values, setValues] = useState<ZutatApiType>({} as ZutatApiType);
  const [price, setPrice] = useState<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  async function addZutat() {
    if (values) {
      await handleCreateZutat();
      CustomToast.success(
        `${values.zutatsname} wurde gespeichert und kann unter Produkte eingesehen werden!`
      );
      setValues({} as ZutatApiType);
    } else {
      CustomToast.error(`Du musst mindestens eine Zutat auswählen!`);
    }
  }
  async function handleCreateZutat() {
    const itemObjekt = {
      zutatsname: values.zutatsname,
      zutatseigenschaft: values.zutatseigenschaft,
      zutatspreis: price,
      zutatseinheit: values.zutatseinheit,
      zutatBild: values.zutatBild,
      zutatensparte: values.zutatensparte,
    };

    let response = await sendPostRequest("/zutat", itemObjekt);
    return response;
  }

  return (
    <FormWrapper
      onSubmit={event => {
        event.preventDefault();
        addZutat();
        setValues({
          zutatsId: "",
          zutatsname: "",
          zutatseigenschaft: "",
          zutatspreis: 0,
          zutatseinheit: "",
          zutatBild: "",
          zutatensparte: "",
        });
        setPrice(0);
      }}
    >
      <FormInput
        name="zutatsname"
        required
        value={values.zutatsname}
        onChange={handleChange}
        placeholder="Geben Sie den Zutatsnamen ein" // Placeholder hinzugefügt
      />
      <FormInput
        name="zutatseigenschaft"
        required
        value={values.zutatseigenschaft}
        onChange={handleChange}
        placeholder="Geben Sie die Zutatseigenschaft ein" // Placeholder hinzugefügt
      />
      <FormInput
        name="zutatspreis"
        type="number"
        step="0.01"
        min={0}
        required
        value={price}
        // onChange={event => handlePriceChange(event.target.value)}
        onChange={event =>
          setPrice(parseFloat(parseFloat(event.target.value).toFixed(2)))
        }
        placeholder="Geben Sie den Zutatspreis ein" // Placeholder hinzugefügt
      />
      <FormInput
        name="zutatseinheit"
        required
        value={values.zutatseinheit}
        onChange={handleChange}
        placeholder="Geben Sie die Zutatseinheit ein" // Placeholder hinzugefügt
      />
      <FormInput
        name="zutatBild"
        value={values.zutatBild}
        onChange={handleChange}
        placeholder="Geben Sie das ZutatBild ein" // Placeholder hinzugefügt
      />
      <FormInput
        name="zutatensparte"
        required
        value={values.zutatensparte}
        onChange={handleChange}
        placeholder="Geben Sie die Zutatensparte ein" // Placeholder hinzugefügt
      />
      <Button className="black-color white-orange" type="submit">
        Zutat speichern
      </Button>
    </FormWrapper>
  );
};

export default ZutatCreation;
