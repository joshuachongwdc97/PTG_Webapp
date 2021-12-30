const getDays = (date) => {
  const age = Math.ceil((new Date() - new Date(date)) / 3600 / 24 / 1000);
  return age;
};

export default getDays;
