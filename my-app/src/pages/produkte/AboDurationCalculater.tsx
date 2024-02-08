import { useState, useEffect } from "react";
import { BestellungsInformation } from "../../redux/types";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { CustomToast } from "../general/toast.style";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";

//TODO Not Working Currently
function AboDurationCalculator() {
  const [cookies] = useCookies([KUNDEN_ID]);
  const [bestellungen, setBestellungen] =
    useState<Array<BestellungsInformation> | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverBestellungen = await getRequest(
          `/Bestellungen/${cookies.kundenId}`
        );
        if (!serverBestellungen) {
          throw new Error("Keine Daten gefunden");
        }
        setBestellungen(serverBestellungen);
      } catch (error) {
        if (error instanceof Error && error.message === "404") {
          setBestellungen(null);
          return;
        }
        CustomToast.error("Fehler beim Laden der Daten");
      }
    };

    fetchData();
  }, []);

  interface ProductInformation {
    produktId: string;
    titel: string;
    preis: number;
    bestellmenge: number;
    createdAt: string;
  }

  function getAllNewspaperOrders(
    orders: BestellungsInformation[] | null
  ): ProductInformation[] | null {
    const newspaperOrders: ProductInformation[] = [];
    if (orders !== null) {
      orders.forEach(order => {
        const newspaperOrder = order.produktInformationen.find(
          product => product.titel === "Zeitung"
        );
        if (newspaperOrder) {
          newspaperOrders.push(newspaperOrder);
        }
      });

      return newspaperOrders;
    } else return null;
  }
  //TODO
  interface Intervall {
    start: number;
    end: number;
  }
  function RemainingDays(
    subscriptions: Array<ProductInformation> | null
  ): number | null {
    if (subscriptions === null) {
      return null;
    } else {
      const StartEndArray: Array<Intervall> = [];
      subscriptions.forEach(subscription => {
        const createdAt = new Date(subscription.createdAt);
        createdAt.setDate(createdAt.getDate() + 1); //Damit das Abo nicht am selben Bestelltag gilt, sondern erst ab den nächsten Tag das Abo startet
        const orderDay = createdAt.getTime();
        const duration = new Date(
          orderDay + subscription.bestellmenge * 24 * 60 * 60 * 1000
        );
        const aboEndDay = duration.getTime();
        const abo: Intervall = {
          start: orderDay,
          end: aboEndDay,
        };
        StartEndArray.push(abo);
      });
      IntervalsToDays(StartEndArray);
      return null; //remainingDaysCount > 0 ? remainingDaysCount - 1 : 0;
    }
  }

  function IntervalsToDays(intervals: Array<Intervall>) {
    intervals.sort((a, b) => a.start - b.start); // Sortiere nach Startdatum
    let remainingDaysCount = 0;

    for (let i = 1; i < intervals.length; i++) {
      const currentInterval = intervals[i];
      const previousInterval = intervals[i - 1];

      // Überprüfen auf Überlappung
      if (currentInterval.start < previousInterval.end) {
        // Verschiebe Startdatum des aktuellen Intervalls
        currentInterval.start = previousInterval.end;

        // Überprüfen, ob zwischen dem Enddatum des vorherigen Intervalls
        // und dem Startdatum des aktuellen Intervalls eine Lücke ist
        if (currentInterval.start > currentInterval.end) {
          // Es gibt eine Lücke, füge ein neues Objekt ein
          const freeInterval = {
            start: previousInterval.end,
            end: currentInterval.start,
          };
          intervals.splice(i, 0, freeInterval);
        }
      }
    }

    return intervals;
  }

  const newspaperOrder = getAllNewspaperOrders(bestellungen);
  console.log(RemainingDays(newspaperOrder));
  //TODO Ende
  return <p>Dein Abonnement läuft noch bis zum </p>;
}

export default AboDurationCalculator;
