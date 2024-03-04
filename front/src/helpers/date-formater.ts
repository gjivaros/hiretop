import dayjs from "dayjs";

// dayjs.locale("fr");

export function formatDate(options: { format: string; date: string }) {
  console.log("format date", options);
  return dayjs(options.date).format(options.format);
}
