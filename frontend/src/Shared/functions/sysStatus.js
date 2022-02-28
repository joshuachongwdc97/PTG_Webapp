const sysStatus = (sys) => {
  const now = new Date();

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
          return "test in progress";
        } else {
          return "test completed";
        }
      }

      return "online";
    }
  } else {
    return "offline";
  }
};

export default sysStatus;
