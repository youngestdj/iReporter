const redFlagFilled = (obj) => {
  if (!obj.title || !obj.comment || !obj.location) return false;
  return true;
};
export default redFlagFilled;
