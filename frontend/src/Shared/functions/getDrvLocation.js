const getDrvLocation = (sn, systems) => {
  console.log(systems);
  const driveLocation = systems.filter((sys) => sys.drive === sn);

  if (driveLocation) {
    return driveLocation[0];
  } else {
    return undefined;
  }
};

export default getDrvLocation;
