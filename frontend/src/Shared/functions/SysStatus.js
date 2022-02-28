import getTestDuration from "./getTestDuration";
import getEstTestEnd from "./getEstTestEnd";
import getTimeRemaining from "./getTimeRemaining";

const sysStatus = (sys, test) => {
  const now = new Date();

  let testDur = 0;
  let estTestEnd = new Date();
  let timeRemMins = 0;

  if (test) {
    testDur = getTestDuration(test, sys.testMode);
    estTestEnd = getEstTestEnd(sys.testStart, testDur);
    timeRemMins =
      getTimeRemaining(estTestEnd)[0] * 60 + getTimeRemaining(estTestEnd)[1];
  }

  if (sys.status) {
    return "reserved";
  }

  if (sys.lastSeen) {
    const lastSeen = new Date(sys.lastSeen);
    const diffMin = (now - lastSeen) / 1000 / 60;

    if (diffMin > 35) {
      return "offline";
    } else {
      if (sys.testStart) {
        if (!sys.testEnd) {
          if (timeRemMins < -60) {
            return "test error";
          } else {
            return "test in progress";
          }
        } else {
          if (timeRemMins > 60) {
            return "test error";
          } else {
            return "test completed";
          }
        }
      }

      return "online";
    }
  } else {
    return "offline";
  }
};

export default sysStatus;
