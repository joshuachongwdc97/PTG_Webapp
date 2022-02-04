const getTestDuration = (test, currentMode) => {
  let testModeDuration;

  if (test.modes.length > 1) {
    testModeDuration = test.modes.filter((mode) => {
      return mode.mode === currentMode;
    })[0].duration;
    return testModeDuration;
  } else {
    return test.modes[0].duration;
  }
};

export default getTestDuration;
