const getSysSumm = (systems) => {
  const sysSummary = {
    online: 0,
    "test completed": 0,
    "test error": 0,
    "test in progress": 0,
    offline: 0,
    reserved: 0,
    "pending removal": 0,
  };

  systems.forEach((sys) => {
    sysSummary[sys.stat] += 1;
  });

  return sysSummary;
};

export default getSysSumm;
