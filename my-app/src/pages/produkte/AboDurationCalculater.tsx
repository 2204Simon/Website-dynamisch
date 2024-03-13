import { useState, useEffect } from "react";
import { CustomToast } from "../general/toast.style";
import { useCookies } from "react-cookie";
import { KUNDEN_ID, baseUrl } from "../../globalVariables/global";

interface AboDurationCalculatorProps {
  endDate: string;
}

function AboDurationCalculator(input: AboDurationCalculatorProps) {
  const { endDate } = input;
  const [cookies] = useCookies([KUNDEN_ID]);

  function dateTransformer(date: string): string {
    const parts = date.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }

  const currentDate = new Date();
  const formattedCurrentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  return (
    <p>
      {endDate !== "" && new Date(endDate) >= formattedCurrentDate
        ? "Dein Abonnement läuft ab am " + dateTransformer(endDate)
        : "Kein laufendes Abonnement gefunden"}
    </p>
  );
}
export default AboDurationCalculator;
/*
  interface ProductInformation {
    produktId: string;
    titel: string;
    preis: number;
    bestellmenge: number;
    createdAt: string;
  }

  interface Intervall {
    start: number;
    end: number;
  }

  const [cookies] = useCookies([KUNDEN_ID]);
  const [bestellungen, setBestellungen] =
    useState<Array<BestellungsInformation> | null>([]);
  const [date, setDate] = useState<string | null>(null);

  //Testzweck
  function millisekundenZuDatum(intervalle: Array<Intervall>) {
    return intervalle.map(interval => ({
      start: new Date(interval.start),
      end: new Date(interval.end),
    }));
  }

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

  useEffect(() => {
    if (bestellungen !== null) {
      const newspaperArray = getAllNewspaperOrders(bestellungen);
      const intervals = Intervals(newspaperArray);
      const sortedintervals = IntervalSorter(intervals);
      const endDate = EndDate(sortedintervals);
      setDate(endDate);
    }
  }, [bestellungen]);

  function getAllNewspaperOrders(
    orders: BestellungsInformation[]
  ): ProductInformation[] {
    const newspaperOrders: ProductInformation[] = [];

    orders.forEach(order => {
      const newspaperOrder = order.produktInformationen.find(
        product => product.titel === "Zeitung"
      );
      if (newspaperOrder) {
        newspaperOrder.createdAt = order.bestellDatum;
        newspaperOrders.push(newspaperOrder);
      }
    });

    return newspaperOrders;
  }

  function Intervals(
    subscriptions: Array<ProductInformation>
  ): Array<Intervall> {
    const intervals: Array<Intervall> = [];
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
      intervals.push(abo);
    });
    return intervals;
  }

  function IntervalSorter(intervals: Array<Intervall>) {
    //Falls Array weniger als einen Eintrag hat, wird diese Funktion übersprungen
    if (intervals.length > 1) {
      intervals.sort((a, b) => a.start - b.start); // Sortiere nach Startdatum
      for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        const previousInterval = intervals[i - 1];
        // Überprüfen auf Überlappung
        if (currentInterval.start < previousInterval.end) {
          const gap =
            previousInterval.end - currentInterval.start + 24 * 60 * 60 * 1000; //Zeit der Überlappung berechnen + 1 Tag
          currentInterval.start += gap;
          currentInterval.end += gap;
          intervals[i] = currentInterval; //Intervall in Zukunft schieben
        } else if (currentInterval.start === previousInterval.end) {
          currentInterval.start += 24 * 60 * 60 * 1000;
          currentInterval.end += 24 * 60 * 60 * 1000;
          intervals[i] = currentInterval; //Intervall in Zukunft schieben
        } /*else if (currentInterval.start > previousInterval.end) {
          //Alle Intervalle, welche nicht relevant sind entschärfen
          for (let j = 0; j < i; j++) {
            intervals[j].start = 0;
            intervals[j].end = 0;
          }
        }*/

//Alle entschärften Intervalle entfernen
/*for (let k = intervals.length - 1; k >= 0; k--) {
        if (intervals[k].start === 0 && intervals[k].end === 0) {
          intervals.splice(k, 1);
        }
      }
    }
    return intervals;
  }

  function EndDate(intervals: Array<Intervall>): string | null {
    if (intervals.length !== 0) {
      const lastInterval = intervals[intervals.length - 1];
      const today = new Date().getTime();
      const remainingTime = lastInterval.end - today;
      if (remainingTime < 1) {
        return null;
      } else {
        const AboEnd = new Date(today + remainingTime);
        const day = AboEnd.getDate().toString().padStart(2, "0"); // Tag mit führender Null, wenn nötig
        const month = (AboEnd.getMonth() + 1).toString().padStart(2, "0"); // Monat mit führender Null, wenn nötig
        const year = AboEnd.getFullYear();
        const endDate = `${day}.${month}.${year}`;
        return endDate;
      }
    } else {
      return null;
    }
  }

  /*     if (today < currentInterval.end) {
          durationMs = currentInterval.end - today;
        }

    
  } 
  return (
    <p>
      {date !== null
        ? "Dein Abonnement läuft ab am " + date
        : "Kein Abonnement gefunden"}
      .
    </p>
  );
} */
