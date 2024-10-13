export const customDate = () => {
  const date = new Date();

  // Obtener el mes (añadiendo 1 porque los meses son indexados desde 0)
  const month = String(date.getMonth() + 1).padStart(2, '0');

  // Obtener el día
  const day = String(date.getDate()).padStart(2, '0');

  // Obtener el año
  const year = date.getFullYear() + 2;

  // Formatear la fecha como MM-DD-YYYY
  const formattedDate = `${month}-${day}-${year}`;

  return formattedDate;
};
