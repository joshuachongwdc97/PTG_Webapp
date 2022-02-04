const getTimeRemaining = (endDate) => {
  const now = new Date();

  const minutesRemaining = endDate - now;

  return minutesRemaining / 1000 / 60;
};

export default getTimeRemaining;
