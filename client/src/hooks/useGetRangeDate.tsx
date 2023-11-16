import dayjs, { Dayjs } from "dayjs";

export const useBookingTicketWithDate = (dateStart = dayjs().startOf("week"), dateEnd?: Dayjs) => {
  let arrayDate = [];
  let dateCount = 7;
  if (!!dateEnd) {
    dateCount = dayjs(dateStart).diff(dateEnd, "day");
  }

  for (let i = 1; i <= dateCount; i++) {
    const date = dayjs(dateStart.add(i, "day")).toDate();
    arrayDate = [...arrayDate, date];
  }

  return arrayDate;
};
