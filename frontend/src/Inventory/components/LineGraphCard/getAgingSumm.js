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
  } else if (period === "past month") {
    dataPoints = 10;
    interval = 3;
    dateFormat = { day: "numeric", month: "short" };
  } else if (period === "past week") {
    dataPoints = 7;
    interval = 1;
    dateFormat = { weekday: "short" };
  }

  let data = [
    { id: "< 30 days", data: [] },
    { id: "30-60 days", data: [] },
    { id: "60-90 days", data: [] },
    { id: "> 90 days", data: [] },
  ];

  dataPoints = [...Array(dataPoints)];

  dataPoints.map(() => {
    let first_month = 0;
    let sec_month = 0;
    let third_month = 0;
    let fourth_month = 0;
    let xAxisLabel;

    invoices.map((inv) => {
      const currentDate = new Date();

      if (!inv.dateReturned || currentDate < inv.dateReturned) {
        const date = new Date(inv.dateReceived);
        currentDate.setDate(currentDate.getDate() - interval * count);
        xAxisLabel = currentDate.toLocaleString("default", dateFormat);
        const age = Math.ceil((currentDate - date) / 3600 / 24 / 1000);
        const drvOrInv = category === "drives" ? getDrv(inv.id, drives) : [inv];

        if (age > 90) {
          return (fourth_month += drvOrInv.length);
        } else if (age > 60) {
          return (third_month += drvOrInv.length);
        } else if (age > 30) {
          return (sec_month += drvOrInv.length);
        } else if (age >= 0) {
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
