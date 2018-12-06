exports.redFlagFilled = (obj) => {
  if (!obj.title || !obj.comment || !obj.location) return false;
  return true;
};

exports.onlySpaces = (obj) => {
  let str = obj.title.split(' ').join('');
  if (str.length < 1) {
    return true;
  }
  str = obj.comment.split(' ').join('');
  if (str.length < 1) {
    return true;
  }
  str = obj.location.split(' ').join('');
  if (str.length < 1) {
    return true;
  }
  return false;
};

exports.validId = id => Number.isInteger(parseInt(id, 10));

exports.redFlagExists = (id, redFlags) => (!!(redFlags[id - 1]));

exports.isLetter = (str) => {
  const objRegExp = /^[a-zA-Z\u00C0-\u00ff]+$/;
  return objRegExp.test(str);
};

exports.isAlphaNumeric = (str) => {
  const objRegExp = /^[a-zA-Z0-9]*$/;
  return objRegExp.test(str);
}

exports.isEmail = (email) => {
  const check = /\S+@\S+\.\S+/;
  return check.test(email);
};
