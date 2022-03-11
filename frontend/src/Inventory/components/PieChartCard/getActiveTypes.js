// FUNCTIONS
import getActiveInvDrv from "../../../Shared/functions/getActiveInvDrv";
import getDrvPrgm from "../../../Shared/functions/getDrvPrgm";

const getActiveTypes = (invoices, drives, programs, category) => {
  const activeInvDrv = getActiveInvDrv(invoices, drives);
  const activeCategory =
    category === "invoices" ? activeInvDrv[0] : activeInvDrv[1];
  let activeTypes = {};

  activeCategory.forEach((e) => {
    let type =
      category === "invoices" ? getDrvPrgm(e.drvPrgm, programs) : e.drvType;

    if (activeTypes[type] === undefined) {
      activeTypes[type] = 1;
    } else {
      activeTypes[type] += 1;
    }
  });

  const pieDataFormat = Object.entries(activeTypes).map((arr) => {
    return {
      id: arr[0],
      label: arr[0],
      value: arr[1],
    };
  });

  return pieDataFormat;
};

export default getActiveTypes;
