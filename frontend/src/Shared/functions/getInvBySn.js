// Receives serial number as input and returns related invoice
const getInvBySn = (inputState, drives, invoices) => {
  let identifiedDrvs;

  // Filter out drives according to serial number
  identifiedDrvs = drives.filter((drv) => {
    return drv.sn.includes(inputState);
  });

  // Replace drive's invid (an invoice's object ID) with actual invoice's invid
  identifiedDrvs = identifiedDrvs.map((drv) => ({
    ...drv,
    invObjId: drv.invid,
    invid: invoices.find((inv) => drv.invid === inv.id).invid,
  }));

  if (identifiedDrvs.length > 0) {
    identifiedDrvs = identifiedDrvs.map((drv) => {
      return {
        id: drv.invObjId,
        invid: drv.invid,
        sn: drv.sn,
        label: drv.label,
        drvType: drv.drvType,
        capacity: drv.capacity,
        interface: drv.interface,
      };
    });
  }
  return identifiedDrvs;
};

export default getInvBySn;
