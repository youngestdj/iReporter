export const redFlagFilled = (obj) => {
  if (!obj.title || !obj.comment || !obj.location) return false;
  return true;
};

export const validId = id => (!(Number.isNaN(id)));

export const redFlagExists = (id, redFlags) => (!!(redFlags[id - 1]));
