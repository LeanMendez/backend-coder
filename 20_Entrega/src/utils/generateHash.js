import bcrypt from 'bcrypt'

export const createHash = async(pass) => {
  const hash = await bcrypt.hash(pass, bcrypt.genSaltSync(10));
  return hash;
};
