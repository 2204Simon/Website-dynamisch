export const formatGermanDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  // Erstelle ein neues Datum mit dem angegebenen Datum und der Zeit auf 00:00:00
  const localDate = new Date(date);
  localDate.setDate(localDate.getDate());

  return localDate.toLocaleDateString("de-DE", options);
};
