const getActiveInvDrv = (invoices, drives) => {
  let activeInvs = [],
    activeDrvs = [];

  invoices &&
    (activeInvs = invoices.filter((inv) => {
      return inv.status === "Active";
    }));

  const activeInvIDs = activeInvs.map((inv) => {
    return inv.id;
  });

  activeDrvs = drives.filter((drv) => {
    return activeInvIDs.includes(drv.invid);
  });

  return [activeInvs, activeDrvs];
};

export default getActiveInvDrv;
