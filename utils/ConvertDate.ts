export const ConvertToDate = (isoString: string) => {
  const dateObject = new Date(isoString);

  const formattedDate = dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};
