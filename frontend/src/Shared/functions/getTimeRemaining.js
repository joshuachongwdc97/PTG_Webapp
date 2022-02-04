const getTimeRemaining = (endDate) => {
  const now = new Date();

  const minutesRemaining = endDate.getMinutes() - now.getMinutes;

  return minutesRemaining;
};

export default getTimeRemaining;
