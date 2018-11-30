exports.redFlagFilled = (obj) => {
  if (!obj.title || !obj.comment || !obj.location) return false;
  return true;
};

exports.validId = id => Number.isInteger(parseInt(id, 10));

exports.redFlagExists = (id, redFlags) => (!!(redFlags[id - 1]));
