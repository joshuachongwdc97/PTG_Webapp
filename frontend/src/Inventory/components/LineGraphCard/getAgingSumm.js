import getDrv from "../../../Shared/functions/getDrv";

const getAgingSumm = (invoices, drives, period, category) => {
  // dataPoints is the number of data points
  let dataPoints;
  // interval is the time gap between 2 points
  let interval;
  // dateFormat is the date format according to the period
  let dateFormat;
  // count is a counter to track the number of data points
  let count = 0;

  if (period === "past year") {
    dataPoints = 12;
    interval = 30;
    dateFormat = { month: "short" };
  } else if (period === "past 6 months") {
    dataPoints = 12;
    interval = 15;
    dateFormat = { day: "numeric", month: "short" };
  } else if (period === "past 3 months") {
    dataPoints = 12;
    interval = 8;
    dateFormat = { day: "numeric", month: "short" };
  }

  let data = [
    { id: "<= 30 days", data: [] },
    { id: "31-60 days", data: [] },
    { id: "61-90 days", data: [] },
    { id: "> 90 days", data: [] },
  ];

  dataPoints = [...Array(dataPoints)];

  dataPoints.forEach(() => {
    let first_month = 0;
    let sec_month = 0;
    let third_month = 0;
    let fourth_month = 0;
    let xAxisLabel;

    invoices.forEach((inv) => {
      const currentDate = new Date();
      const returnedDate = inv.dateReturned && new Date(inv.dateReturned);
      currentDate.setDate(currentDate.getDate() - interval * count);

      // if there is no returned date, the inv is counted
      // but if there is a returned date, the current date must be before the returned date
      // because if the current date is past the returned date, it should not be counted anymore
      if (!returnedDate || currentDate <= returnedDate) {
        const date = new Date(inv.dateReceived);
        xAxisLabel = currentDate.toLocaleString("default", dateFormat);
        const age = Math.ceil((currentDate - date) / 3600 / 24 / 1000);
        const drvOrInv = category === "drives" ? getDrv(inv.id, drives) : [inv];

        // >= 91 days
        if (age >= 91) {
          return (fourth_month += drvOrInv.length);
          // 61 - 90 days
        } else if (age >= 61) {
          return (third_month += drvOrInv.length);
          // 31 - 60 days
        } else if (age >= 31) {
          return (sec_month += drvOrInv.length);
          // <= 30 days and a positive number
        } else if (age > 0) {
          return (first_month += drvOrInv.length);
        }
      }
    });
    data[0].data.unshift({ x: xAxisLabel, y: first_month });
    data[1].data.unshift({ x: xAxisLabel, y: sec_month });
    data[2].data.unshift({ x: xAxisLabel, y: third_month });
    data[3].data.unshift({ x: xAxisLabel, y: fourth_month });
    count += 1;
  });

  const lineDataFormat = data.map((line) => {
    return {
      id: line.id,
      data: line.data,
    };
  });

  return lineDataFormat;
};

export default getAgingSumm;
