const getDrvPrgm = (id, programs) => {
  let filteredPrgms = [];

  filteredPrgms = programs.filter((prgm) => {
    return prgm.id === id;
  });

  if (filteredPrgms.length > 0) {
    return filteredPrgms[0].alias;
  } else {
    return undefined;
  }
};

export default getDrvPrgm;
