import dayjs from "dayjs";

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

export const ConvertToYearsWorked = (isoString: string) => {
  const birthDate = new Date(isoString);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();

  if (currentDate.getDate() < birthDate.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  let result = "";

  // Add years to the result
  if (years > 0) {
    result += years === 1 ? "1 year" : `${years} years`;
  }

  // Add months to the result
  if (months > 0) {
    if (result) result += " "; // if there's a year value, add a space
    result += months === 1 ? "1 month" : `${months} months`;
  }

  // If the duration is only a few months (e.g., 2 months), then mention it as a trial period.
  if (years === 0 && months <= 2) {
    return "Trial Period";
  }

  return result;
};

export const DaysBetweenDates = (date1: string, date2: string): string => {
  // Tarihleri doğrudan dayjs objesine dönüştürüyoruz.
  const firstDate = dayjs(date1);
  const secondDate = dayjs(date2);

  // İki tarih arasındaki farkı gün cinsinden buluyoruz.
  const differenceInDays = firstDate.diff(secondDate, 'day');

  // Sonucu istediğiniz string formatında döndürüyoruz.
  return Math.abs(differenceInDays) === 1 ? "1 day" : `${Math.abs(differenceInDays)} days`;
};