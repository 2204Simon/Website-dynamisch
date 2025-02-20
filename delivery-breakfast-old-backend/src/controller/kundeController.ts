import express, { type Request, type Response } from "express";
import {
  findKunde,
  findKundeByEmail,
  getKundeAboenddate
} from "../database/kunde/operation/findKunde";
import { postRequestKunde } from "./kundeHelper/postRequestKunde";
import CustomError from "../utilities/error";
import { ErrorHandle } from "../global/enums";
import { errorChecking, errorValidation } from "../utilities/errorChecking";

export const KundeController = express.Router();

KundeController.get("/kunde", async (req: Request, res) => {
  try {
    const id = req.query.id;
    const email = req.query.email;

    const kunde = await findKunde(id as string)
      .then((kunde) => {
        res.status(200).json(kunde);
      })
      .catch((error: CustomError) => {
        res.status(error.statusCode).send(error.message);
      });
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

KundeController.get("/kundeEndDate/:kundenId", async (req: Request, res) => {
  try {
    const kundenId = req.params.kundenId;
    const EndDate = await getKundeAboenddate(kundenId as string)
      .then((getKundeAboenddate) => {
        res.status(200).json(getKundeAboenddate);
      })
      .catch((error: CustomError) => {
        res.status(error.statusCode).send(error.message);
      });
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

KundeController.post("/kunde", async (req: Request, res) => {
  console.log(req.body);

  postRequestKunde(req)
    .then((kunde) => res.status(201).json(kunde))
    .catch((error: CustomError) => {
      console.log(error);

      if (error.message.includes("the key is unique and already exists")) {
        res.status(409).send("EmailExists");
      } else {
        res.status(error.statusCode).send(error.message);
      }
    });
});

KundeController.post("/kunde/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Suche den Benutzer in der Datenbank
    const kunde = await findKundeByEmail(email);

    // Wenn der Benutzer gefunden wurde, überprüfe das Passwort
    if (kunde && password === kunde.passwort) {
      // Wenn das Passwort übereinstimmt, sende eine Erfolgsmeldung zurück
      res.status(200).json({ kundenId: kunde.kundenId });
    } else {
      // Wenn der Benutzer nicht gefunden wurde oder das Passwort nicht übereinstimmt, sende einen Fehler zurück
      throw new CustomError(
        ErrorHandle.BadRequest,
        "Incorrect email or password"
      );
    }
  } catch (error) {
    const err = errorValidation(error);
    // Wenn ein Fehler auftritt, sende eine Fehlermeldung zurück
    res.status(err.statusCode).send(err.message);
  }
});

KundeController.put("/kunde", (_req, res) => {
  res.send("Kunde put request");
});

KundeController.delete("/kunde", (_req, res) => {
  res.send("Kunde delete request");
});
