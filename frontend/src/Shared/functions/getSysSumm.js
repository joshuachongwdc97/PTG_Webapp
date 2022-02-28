// COMPONENTS
import sysStatus from "./sysStatus";

const getSysSumm = (systems) => {
  const sysSummary = {
    online: 0,
    "test completed": 0,
    "test in progress": 0,
    offline: 0,
    reserved: 0,
  };

  systems.forEach((sys) => {
    const SysStatus = sysStatus(sys);

    if (SysStatus === "error") {
      sysSummary["offline"] += 1;
    } else {
      sysSummary[SysStatus] += 1;
    }
  });

  return sysSummary;
};

export default getSysSumm;
