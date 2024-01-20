import React, { useState, useEffect } from "react";
import { FormInput, FormWrapper } from "./Admin.styles";
import { Button } from "../general/button.styles";
import { CustomToast } from "../general/toast.style";

export type ZutatApiType = {
  zutatsId: string;
  zutatsname: string;
  zutatseigenschaft: string;
  zutatspreis: number;
  zutatseinheit: string;
  zutatBild: string;
  zutatensparte: string;
};

interface ZutatsformProps {
  defaultValue?: ZutatApiType;
  onSubmit: (values: ZutatApiType) => void;
  newZutat?: boolean;
}

export function Zutatsform({
  defaultValue,
  onSubmit,
  newZutat,
}: ZutatsformProps) {
  const [values, setValues] = useState<ZutatApiType>(
    defaultValue || {
      zutatsId: "",
      zutatsname: "",
      zutatseigenschaft: "",
      zutatspreis: 0,
      zutatseinheit: "",
      zutatBild: "",
      zutatensparte: "",
    }
  );

  useEffect(() => {
    if (defaultValue) {
      setValues(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };
  console.log(newZutat);

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {newZutat ? null : (
        <FormInput
          name="zutatsId"
          value={values.zutatsId}
          onChange={handleChange}
          required
          placeholder="Geben Sie die Zutats-ID ein" // Placeholder hinzugefügt
        />
      )}
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
        required
        value={values.zutatspreis}
        onChange={handleChange}
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
      <Button type="submit" style={{ gridColumn: "1 / -1" }}>
        Submit
      </Button>
    </FormWrapper>
  );
}
