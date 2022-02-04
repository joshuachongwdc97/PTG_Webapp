const getEstTestEnd = (testStart, testDuration) => {
  const testStartDate = new Date(testStart);

  const estimateTestEnd = new Date(
    testStartDate.setHours(testStartDate.getHours() + parseInt(testDuration))
  );

  return estimateTestEnd;
};

export default getEstTestEnd;
