export const ConvertToDate = (isoString: string) => {
  const dateObject = new Date(isoString);

  const formattedDate = dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};

export const ConvertToAge = (isoString: string) => {
  const birthDate = new Date(isoString);

  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const m = currentDate.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};