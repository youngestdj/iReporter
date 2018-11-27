export const redFlagFilled = (obj) => {
  if (!obj.title || !obj.comment || !obj.location) return false;
  return true;
};

export const validId = id => Number.isInteger(parseInt(id, 10));

export const redFlagExists = (id, redFlags) => (!!(redFlags[id - 1]));
