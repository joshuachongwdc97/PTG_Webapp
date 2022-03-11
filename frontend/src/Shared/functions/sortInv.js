const sortInv = (arr) => {
  arr = arr.sort((a, b) =>
    new Date(a.dateReceived) > new Date(b.dateReceived)
      ? -1
      : new Date(b.dateReceived) > new Date(a.dateReceived)
      ? 1
      : 0
  );
  return arr;
};

export default sortInv;
