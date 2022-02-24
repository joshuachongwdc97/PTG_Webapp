const getTimeRemaining = (endDate) => {
  const now = new Date();

  const minutesRemaining = endDate - now;

  // Return in hours and minutes
  return [
    Math.floor(minutesRemaining / 1000 / 60 / 60),
    Math.floor((minutesRemaining / 1000 / 60) % 60),
  ];
};

export default getTimeRemaining;
