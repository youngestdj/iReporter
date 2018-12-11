import { jwt } from 'jsonwebtoken';

const signToken = async (obj) => {
  const token = jwt.sign({
    id: obj.id,
    isadmin: obj.isadmin,
  },
  process.env.SECRET,
  {
    expiresIn: 86400000000,
  });
  return token;
};

export default signToken;
