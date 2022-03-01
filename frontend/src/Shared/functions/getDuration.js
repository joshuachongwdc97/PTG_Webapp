const getDuration = (startDate, endDate) => {
  const minutesRemaining = endDate - startDate;

  // Return in hours and minutes
  return [
    Math.floor(minutesRemaining / 1000 / 60 / 60),
    Math.floor((minutesRemaining / 1000 / 60) % 60),
  ];
};

export default getDuration;
