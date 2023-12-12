type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(
  date: Date | null,
  dateStyle: DateStyle = "medium",
  locales = "en"
) {
  if (!date) return date;
  const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return formatter.format(date);
}
